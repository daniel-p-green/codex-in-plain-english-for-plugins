(() => {
  const BRIDGE_URL = "http://127.0.0.1:8789";
  const openButtons = [...document.querySelectorAll("[data-login-open]")];
  const shouldOpen = new URLSearchParams(window.location.search).get("login") === "chatgpt";

  if (openButtons.length === 0 && !shouldOpen) return;

  const modal = document.createElement("div");
  modal.className = "login-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="login-modal-backdrop" data-login-close></div>
    <section class="login-dialog" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <header class="login-dialog-header">
        <div>
          <p class="section-kicker">ChatGPT sign-in</p>
          <h2 id="login-title">Sign in to use AI</h2>
        </div>
        <button class="login-close" type="button" aria-label="Close login" data-login-close>×</button>
      </header>

      <p class="login-copy">
        Use your ChatGPT account for AI features. No API key required.
      </p>

      <div class="login-status-row">
        <span class="connect-status" id="connect-status" data-state="idle">Not signed in</span>
        <span class="connect-message" id="connect-message" aria-live="polite">Choose a sign-in option to continue.</span>
      </div>

      <div class="connect-actions" aria-label="ChatGPT login actions">
        <button class="connect-button connect-button-primary" id="connect-start" type="button">
          Continue with ChatGPT
        </button>
        <button class="connect-button connect-button-secondary" id="connect-device" type="button">
          Use a code
        </button>
      </div>

      <div class="connect-result" id="connect-result" hidden></div>
    </section>
  `;

  document.body.append(modal);

  const statusPill = modal.querySelector("#connect-status");
  const message = modal.querySelector("#connect-message");
  const result = modal.querySelector("#connect-result");
  const connectButton = modal.querySelector("#connect-start");
  const deviceButton = modal.querySelector("#connect-device");
  const closeButtons = [...modal.querySelectorAll("[data-login-close]")];

  const setStatus = (state, text, detail = "") => {
    statusPill.dataset.state = state;
    statusPill.textContent = text;
    message.textContent = detail;
  };

  const setBusy = (isBusy) => {
    [connectButton, deviceButton].forEach((button) => {
      button.disabled = isBusy;
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

  const callBridge = async (path, options = {}) => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);

    try {
      const response = await window.fetch(`${BRIDGE_URL}${path}`, {
        ...options,
        signal: controller.signal,
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
        throw new Error("This browser could not start ChatGPT sign-in.");
      }

      return body;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("This browser could not start ChatGPT sign-in.");
      }
      throw new Error("This browser could not start ChatGPT sign-in.");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("login-modal-open");
    connectButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("login-modal-open");
  };

  const startLogin = async (mode) => {
    clearResult();
    setBusy(true);
    setStatus("checking", "Starting", "Starting ChatGPT sign-in...");

    try {
      const body = await callBridge("/login", {
        method: "POST",
        body: JSON.stringify({ mode }),
      });

      if (body.type === "chatgpt" && body.authUrl) {
        setStatus("available", "Continue", "Open ChatGPT, then return here.");
        showResult(`
          <a class="connect-result-link" href="${escapeHtml(body.authUrl)}" target="_blank" rel="noopener">
            Open ChatGPT
          </a>
          <p>Return to this course after signing in.</p>
        `);
      } else if (body.type === "chatgptDeviceCode") {
        setStatus("available", "Use code", "Open the link and enter the code.");
        showResult(`
          <a class="connect-result-link" href="${escapeHtml(body.verificationUrl)}" target="_blank" rel="noopener">
            Open code page
          </a>
          <p class="connect-code">${escapeHtml(body.userCode)}</p>
          <p>Enter this code on the ChatGPT page.</p>
        `);
      } else {
        setStatus("ready", "Signed in", "ChatGPT is connected.");
      }
    } catch (error) {
      setStatus("offline", "Unavailable", error.message);
      showResult("<p>Open this course in Codex, then try again.</p>");
    } finally {
      setBusy(false);
    }
  };

  window.CodexLogin = { open: openModal, close: closeModal };

  openButtons.forEach((button) => button.addEventListener("click", openModal));
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-login-open]");
    if (!trigger) return;
    event.preventDefault();
    openModal();
  });
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  connectButton.addEventListener("click", () => startLogin("browser"));
  deviceButton.addEventListener("click", () => startLogin("code"));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  if (shouldOpen) {
    window.history.replaceState({}, "", window.location.pathname);
    openModal();
  }
})();
