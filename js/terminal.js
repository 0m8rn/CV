/* terminal.js */
window.LosiosTerminal = (() => {
  let modal;
  let output;
  let input;
  let open = false;

  const bootText = [
    "Losios OS v2.0.4 - Unauthorized access is futile.",
    "Loading identity matrix...",
    "",
    "name:     Omar Nawasrah",
    "alias:    Losios",
    "location: Amman, Jordan [31.9539 N, 35.9106 E]",
    "role:     Systems Builder · Dev · Entrepreneur",
    "status:   All systems operational.",
    "Type 'help' for available commands.",
    ""
  ].join("\n");

  const commands = {
    help: () => "Commands: help, about, skills, projects, contact, clear, exit, matrix, whoami, hack, losios",
    about: () => "Omar Nawasrah, known as Losios, builds practical systems with IT, development, and automation at the center.",
    skills: () => "- Linux (Arch)\n- Shell/Bash\n- Networking\n- HTML/CSS/JS\n- Python\n- Ollama/LangChain\n- Blockchain/Cryptography",
    projects: () => "01 IT Support Platform [LIVE]\n02 SoftStore [LIVE]\n03 Void OS [LIVE]\n04 AI Agents [IN PROGRESS]\n05 Losios Coin [COMING SOON]",
    contact: () => "location: Amman, Jordan\nemail: omarn35str@gmail.com\nwhatsapp: wa.me/962780959008",
    clear: () => {
      output.textContent = "";
      return "";
    },
    exit: () => {
      closeTerminal();
      return "";
    },
    whoami: () => "You are a visitor. Omar is the builder.",
    losios: () => "No feature without purpose. No time wasted. Ever.\nAutomate everything possible. Build for revenue.\nShip. Improve. Repeat."
  };

  function print(text = "") {
    output.textContent += `${text}\n`;
    output.scrollTop = output.scrollHeight;
  }

  function typeText(text, speed = 40) {
    return new Promise((resolve) => {
      let idx = 0;
      output.textContent = "";
      const timer = setInterval(() => {
        output.textContent += text[idx] || "";
        output.scrollTop = output.scrollHeight;
        idx += 1;
        if (idx >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  function matrixEffect() {
    const chars = "01LOSIOS#$%&*".split("");
    const lines = [];
    for (let i = 0; i < 12; i += 1) {
      let line = "";
      for (let j = 0; j < 50; j += 1) line += chars[Math.floor(Math.random() * chars.length)];
      lines.push(line);
    }
    const block = document.createElement("div");
    block.className = "terminal-rain";
    block.textContent = lines.join("\n");
    output.appendChild(block);
    output.scrollTop = output.scrollHeight;
    setTimeout(() => block.remove(), 3000);
  }

  function hackEffect() {
    const seq = [
      "Initializing exploit...",
      "Bypassing firewall...",
      "Injecting payload...",
      "Escalating privileges...",
      "Access denied. Nice try."
    ];
    let i = 0;
    const timer = setInterval(() => {
      print(seq[i]);
      i += 1;
      if (i >= seq.length) clearInterval(timer);
    }, 280);
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    print(`> ${cmd}`);
    if (!cmd) return;
    if (cmd === "matrix") return matrixEffect();
    if (cmd === "hack") return hackEffect();
    if (!commands[cmd]) return print("Command not found. Type 'help'.");
    const res = commands[cmd]();
    if (res) print(res);
  }

  async function openTerminal() {
    open = true;
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
    await typeText(bootText, 20);
    input.focus();
  }

  function closeTerminal() {
    open = false;
    modal.classList.remove("visible");
    document.body.style.overflow = "";
    input.blur();
  }

  function toggleTerminal() {
    if (open) closeTerminal();
    else openTerminal();
  }

  function initTerminal() {
    modal = document.getElementById("terminal-modal");
    output = document.getElementById("terminal-output");
    input = document.getElementById("terminal-input");
    if (!modal || !output || !input) return;

    // Prevent body scroll when terminal is open
    function lockScroll() { document.body.style.overflow = "hidden"; }
    function unlockScroll() { document.body.style.overflow = ""; }

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
      if (open && e.key === "Escape") closeTerminal();
    });

    // Long-press on footer for touch devices (replaces Ctrl+`)
    const footer = document.querySelector("footer");
    if (footer && window._losiosIsTouch) {
      let pressTimer = null;
      footer.addEventListener("touchstart", () => {
        pressTimer = setTimeout(() => {
          navigator.vibrate && navigator.vibrate(30);
          toggleTerminal();
        }, 500);
      }, { passive: true });
      footer.addEventListener("touchend", () => clearTimeout(pressTimer));
      footer.addEventListener("touchmove", () => clearTimeout(pressTimer));
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeTerminal();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      runCommand(input.value);
      input.value = "";
    });
  }

  return { initTerminal };
})();
