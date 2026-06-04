(() => {
  const bridgeInput = document.querySelector("#bridge-url");
  const statusPill = document.querySelector("#connect-status");
  const message = document.querySelector("#connect-message");
  const result = document.querySelector("#connect-result");
  const checkButton = document.querySelector("#connect-check");
  const connectButton = document.querySelector("#connect-start");
  const deviceButton = document.querySelector("#connect-device");
  const copyFallbackButton = document.querySelector("#copy-fallback");
  const fallbackPrompt = document.querySelector(".connect-fallback pre");

  if (!bridgeInput || !statusPill || !message || !result) return;

  const setStatus = (state, text, detail = "") => {
    statusPill.dataset.state = state;
    statusPill.textContent = text;
    message.textContent = detail;
  };

  const setBusy = (isBusy) => {
    [checkButton, connectButton, deviceButton].forEach((button) => {
      if (button) button.disabled = isBusy;
    });
  };

  const showResult = (html) => {
    result.hidden = false;
    result.innerHTML = html;
  };

  const clearResult = () => {
    result.hidden = true;
    result.innerHTML = "";
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const getBridgeUrl = () => {
    const raw = bridgeInput.value.trim();
    let url;

    try {
      url = new URL(raw);
    } catch {
      throw new Error("Use a local helper address, like http://127.0.0.1:8789.");
    }

    const localHost = url.hostname === "127.0.0.1" || url.hostname === "localhost";
    if (url.protocol !== "http:" || !localHost) {
      throw new Error("For safety, this page only talks to a localhost sign-in helper.");
    }

    url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString().replace(/\/$/, "");
  };

  const callBridge = async (path, options = {}) => {
    const bridgeUrl = getBridgeUrl();
    const response = await window.fetch(`${bridgeUrl}${path}`, {
      ...options,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });

    let body = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }

    if (!response.ok || body?.ok === false) {
      throw new Error(body?.message || "The local sign-in helper did not answer.");
    }

    return body;
  };

  const checkConnection = async () => {
    clearResult();
    setBusy(true);
    setStatus("checking", "Checking", "Looking for the local sign-in helper...");

    try {
      const body = await callBridge("/account");
      if (body.accountType === "chatgpt") {
        setStatus("ready", "Ready", "Codex is already signed in with ChatGPT.");
        showResult("<p><strong>Ready.</strong> Pick a helper and ask Codex to try one harmless test.</p>");
      } else {
        setStatus("available", "Helper found", "Start ChatGPT sign-in next.");
      }
    } catch (error) {
      setStatus("offline", "Not connected", error.message);
      showResult("<p>Start the Codex sign-in helper, then try again. This page never stores your login.</p>");
    } finally {
      setBusy(false);
    }
  };

  const startLogin = async (mode) => {
    clearResult();
    setBusy(true);
    setStatus("checking", "Starting", "Asking Codex to start ChatGPT sign-in...");

    try {
      const body = await callBridge("/login", {
        method: "POST",
        body: JSON.stringify({ mode }),
      });

      if (body.type === "chatgpt" && body.authUrl) {
        const authUrl = escapeHtml(body.authUrl);
        setStatus("available", "Sign in", "Open the ChatGPT sign-in link, then return here.");
        showResult(`
          <a class="connect-result-link" href="${authUrl}" target="_blank" rel="noopener">
            Open ChatGPT sign-in
          </a>
          <p>After sign-in, Codex will remember the account.</p>
        `);
      } else if (body.type === "chatgptDeviceCode") {
        const verificationUrl = escapeHtml(body.verificationUrl);
        const userCode = escapeHtml(body.userCode);
        setStatus("available", "Use code", "Open the link and enter the code.");
        showResult(`
          <a class="connect-result-link" href="${verificationUrl}" target="_blank" rel="noopener">
            Open code page
          </a>
          <p class="connect-code">${userCode}</p>
        `);
      } else {
        setStatus("ready", "Ready", "Codex says the account is already ready.");
      }
    } catch (error) {
      setStatus("offline", "Not connected", error.message);
      showResult("<p>Start the Codex sign-in helper, then try again.</p>");
    } finally {
      setBusy(false);
    }
  };

  checkButton?.addEventListener("click", checkConnection);
  connectButton?.addEventListener("click", () => startLogin("browser"));
  deviceButton?.addEventListener("click", () => startLogin("code"));
  copyFallbackButton?.addEventListener("click", async () => {
    if (!fallbackPrompt) return;
    await navigator.clipboard.writeText(fallbackPrompt.textContent.trim());
    copyFallbackButton.textContent = "Copied";
    window.setTimeout(() => {
      copyFallbackButton.textContent = "Copy prompt";
    }, 1600);
  });
})();
