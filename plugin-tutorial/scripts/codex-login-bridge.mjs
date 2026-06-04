#!/usr/bin/env node
import { spawn } from "node:child_process";
import http from "node:http";

const HOST = process.env.CODEX_LOGIN_BRIDGE_HOST || "127.0.0.1";
const PORT = Number(process.env.CODEX_LOGIN_BRIDGE_PORT || 8789);
const CODEX_WS = process.env.CODEX_APP_SERVER_WS || "ws://127.0.0.1:8766";
const CODEX_READY = process.env.CODEX_APP_SERVER_READY || "http://127.0.0.1:8766/readyz";
const ALLOWED_ORIGINS = new Set([
  "https://daniel-p-green.github.io",
  "http://localhost:8765",
  "http://127.0.0.1:8765",
]);

let appServerProcess = null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const json = (res, status, body, origin) => {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Private-Network", "true");
  }

  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

const ready = async () => {
  try {
    const response = await fetch(CODEX_READY);
    return response.ok;
  } catch {
    return false;
  }
};

const ensureAppServer = async () => {
  if (await ready()) return;

  const url = new URL(CODEX_WS);
  if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost") {
    throw new Error("Codex app-server must be on localhost.");
  }

  appServerProcess = spawn("codex", ["app-server", "--listen", CODEX_WS], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  appServerProcess.stdout.on("data", (chunk) => process.stdout.write(chunk));
  appServerProcess.stderr.on("data", (chunk) => process.stderr.write(chunk));
  appServerProcess.on("exit", () => {
    appServerProcess = null;
  });

  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await ready()) return;
    await sleep(250);
  }

  throw new Error("Codex app-server did not start.");
};

class CodexClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.nextId = 1;
    this.pending = new Map();
    this.socket = null;
  }

  async connect() {
    await ensureAppServer();

    this.socket = await new Promise((resolve, reject) => {
      const socket = new WebSocket(this.endpoint);
      const timeout = setTimeout(() => {
        socket.close();
        reject(new Error("Codex app-server did not answer."));
      }, 3500);

      socket.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve(socket);
      }, { once: true });

      socket.addEventListener("error", () => {
        clearTimeout(timeout);
        reject(new Error("Could not reach Codex app-server."));
      }, { once: true });
    });

    this.socket.addEventListener("message", (event) => this.handleMessage(event));
    this.socket.addEventListener("close", () => {
      for (const { reject } of this.pending.values()) {
        reject(new Error("Codex app-server connection closed."));
      }
      this.pending.clear();
    });

    await this.request("initialize", {
      clientInfo: {
        name: "codex-in-plain-english-login-bridge",
        version: "1.0.0",
      },
      capabilities: null,
    });

    this.send({ method: "initialized" });
  }

  close() {
    this.socket?.close();
  }

  send(payload) {
    this.socket.send(JSON.stringify(payload));
  }

  request(method, params) {
    const id = this.nextId;
    this.nextId += 1;

    const promise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("Codex app-server did not respond in time."));
      }, 10000);

      this.pending.set(id, {
        resolve: (value) => {
          clearTimeout(timeout);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        },
      });
    });

    this.send({ id, method, params });
    return promise;
  }

  handleMessage(event) {
    const payload = JSON.parse(event.data);
    if (!payload.id || !this.pending.has(payload.id)) return;

    const pending = this.pending.get(payload.id);
    this.pending.delete(payload.id);

    if (payload.error) {
      pending.reject(new Error(payload.error.message || "Codex app-server returned an error."));
    } else {
      pending.resolve(payload.result);
    }
  }
}

const withClient = async (callback) => {
  const client = new CodexClient(CODEX_WS);
  await client.connect();
  try {
    return await callback(client);
  } finally {
    client.close();
  }
};

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;

  if (req.method === "OPTIONS") {
    json(res, 200, { ok: true }, origin);
    return;
  }

  try {
    if (req.method === "GET" && req.url === "/health") {
      json(res, 200, { ok: true }, origin);
      return;
    }

    if (req.method === "GET" && req.url === "/account") {
      const account = await withClient((client) => client.request("account/read", {}));
      json(res, 200, {
        ok: true,
        accountType: account?.account?.type || null,
        requiresOpenaiAuth: Boolean(account?.requiresOpenaiAuth),
      }, origin);
      return;
    }

    if (req.method === "POST" && req.url === "/login") {
      const body = await readBody(req);
      const response = await withClient((client) => client.request("account/login/start", {
        type: body.mode === "code" ? "chatgptDeviceCode" : "chatgpt",
        ...(body.mode === "code" ? {} : { codexStreamlinedLogin: true }),
      }));

      json(res, 200, { ok: true, ...response }, origin);
      return;
    }

    json(res, 404, { ok: false, message: "Unknown route." }, origin);
  } catch (error) {
    json(res, 500, { ok: false, message: error.message }, origin);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Codex sign-in helper listening at http://${HOST}:${PORT}`);
});

const shutdown = () => {
  server.close();
  appServerProcess?.kill();
};

process.on("SIGINT", () => {
  shutdown();
  process.exit(0);
});

process.on("SIGTERM", () => {
  shutdown();
  process.exit(0);
});
