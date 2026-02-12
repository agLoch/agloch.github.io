// =============================
// CONFIGURAÇÃO RÁPIDA
// =============================
// Cole aqui o link real do Teams:
const TEAMS_URL = "https://teams.microsoft.com/l/meetup-join/SEU-LINK-AQUI";

// Asset mp4 anexado (usei o nome sugerido na estrutura)
const EGG_VIDEO_SRC = "assets/skull-shield-sword-meme-3.mp4";

const qs = (s) => document.querySelector(s);

function openModal(title, bodyEl) {
  const modal = qs("#modal");
  qs("#modalTitle").textContent = title;
  const body = qs("#modalBody");
  body.innerHTML = "";
  body.appendChild(bodyEl);
  modal.classList.add("open");
}

function closeModal() {
  qs("#modal").classList.remove("open");
}

// =============================
// Hover nos memes: vira cartas
// =============================
(function setupMemeHoverSwap(){
  const CARD_SRC = "assets/cards.gif";
  const imgs = document.querySelectorAll(".meme-row img");
  if (!imgs.length) return;

  imgs.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      if (!img.dataset.originalSrc) img.dataset.originalSrc = img.getAttribute("src") || "";
      img.setAttribute("src", CARD_SRC);
    });

    img.addEventListener("mouseleave", () => {
      if (img.dataset.originalSrc) img.setAttribute("src", img.dataset.originalSrc);
    });
  });
})();

// =============================
// Unicórnio esqueleto no fundo (múltiplas cópias)
// =============================
(function setupUnicornBackground(){
  const container = document.querySelector("#unicornBg");
  if (!container) return;

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const count = 9;
  const baseSrc = "assets/unicorn-skeleton.png";

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = baseSrc;
    img.alt = "";
    img.decoding = "async";
    img.loading = "eager";
    img.className = "unicorn-sprite";

    const y = rand(6, 92);
    const x = rand(-12, 92);

    const size = rand(70, 190);
    const duration = rand(10, 28);
    const delay = -rand(0, duration);

    const range = rand(18, 85) * (Math.random() < 0.5 ? -1 : 1);
    const opacity = rand(0.08, 0.20);

    const rot1 = pick(["-6deg", "-4deg", "-2deg", "-1deg"]);
    const rot2 = pick(["1deg", "2deg", "4deg", "6deg"]);

    img.style.setProperty("--y", `${y}vh`);
    img.style.setProperty("--x", `${x}vw`);
    img.style.setProperty("--size", `${size}px`);
    img.style.setProperty("--dur", `${duration}s`);
    img.style.setProperty("--delay", `${delay}s`);
    img.style.setProperty("--range", `${range}vw`);
    img.style.setProperty("--op", opacity.toFixed(3));
    img.style.setProperty("--rot1", rot1);
    img.style.setProperty("--rot2", rot2);

    container.appendChild(img);
  }
})();

// =============================
// Bananas de Pijama: aparece no load
// =============================
(function setupBananaIntro(){
  window.addEventListener("load", () => {
    showBananaIntro();
  }, { once: true });
})();

function showBananaIntro(){
  const modal = qs("#modal");
  if (!modal) return;

  modal.classList.add("banana-intro");

  const wrap = document.createElement("div");
  wrap.className = "banana-intro-wrap";
  wrap.innerHTML = `
    <p style="margin:0 0 10px;">
      ☠️💀 🎉 <b>Chegou a hora de prestigiar o resultado dos meus 2 anos de tortura! 🎉 💀☠️</b>
      <br>
      <br/>Clique/toca pra continuar.
    </p>
  `;

  const img = document.createElement("img");
  img.src = "assets/banana-pajamas.gif";
  img.alt = "Bananas de pijama";
  img.className = "banana-intro-img";
  img.loading = "eager";
  wrap.appendChild(img);

  // openModal("🍌🛌 Bananas de Pijama", wrap);
  openModal("🎉 Você está convidado!! 🎉", wrap);

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    modal.classList.remove("banana-intro");
    modal.removeEventListener("click", onClickCapture, true);
    document.removeEventListener("keydown", onKeydown);
  };

  const closeIntro = () => {
    cleanup();
    closeModal();
  };

  const onClickCapture = () => {
    if (!modal.classList.contains("open")) return;
    closeIntro();
  };

  const onKeydown = (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") closeIntro();
  };

  // Qualquer clique/tap no modal fecha (inclusive no GIF)
  modal.addEventListener("click", onClickCapture, true);
  document.addEventListener("keydown", onKeydown);
}

// =============================
// Hover: Gustavo -> Augusto
// =============================
(function setupNameSwap(){
  const el = qs("#nameSwap");
  const primary = el.dataset.primary;
  const alt = el.dataset.alt;

  el.addEventListener("mouseenter", () => { el.textContent = alt; });
  el.addEventListener("mouseleave", () => { el.textContent = primary; });

  // também troca no clique (meme extra)
  el.addEventListener("click", () => {
    el.textContent = (el.textContent === primary) ? alt : primary;
  });
})();

// =============================
// Link do Teams
// =============================
(function setupTeams(){
  const a = qs("#teamsLink");
  a.href = TEAMS_URL;
  a.addEventListener("click", () => {
    // easter egg: se o link estiver default, zoa
    if (TEAMS_URL.includes("SEU-LINK-AQUI")) {
      alert("⚠️ Cole o link do Teams no script.js (TEAMS_URL) ou edite o href no HTML!");
    }
  });
})();

// =============================
// Easter Eggs (botões)
// =============================
(function setupButtons(){
  qs("#btnCoffee").addEventListener("click", () => coffeeEgg());
  qs("#btnCards").addEventListener("click", () => cardsEgg());
  qs("#btnBanana").addEventListener("click", () => bananaEgg());
  qs("#btnTime").addEventListener("click", () => timeEgg());

  qs("#modalClose").addEventListener("click", closeModal);
  qs("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();

// =============================
// Konami-like / palavras secretas
// =============================
(function setupSecretTyping(){
  let buffer = "";
  const maxLen = 24;

  document.addEventListener("keydown", (e) => {
    // ignora teclas de controle
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;

    buffer += e.key.toLowerCase();
    if (buffer.length > maxLen) buffer = buffer.slice(-maxLen);

    if (buffer.endsWith("cafe")) coffeeEgg(true);
    if (buffer.endsWith("as")) cardsEgg(true);          // “ás” (sem acento)
    if (buffer.endsWith("banana")) bananaEgg(true);
    if (buffer.endsWith("hora")) timeEgg(true);

    // ultra secreto e bem idiota:
    if (buffer.endsWith("rock")) megaRockEgg();
  });
})();

// =============================
// EGGS
// =============================
function coffeeEgg(fromTyping=false){
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p style="margin:0 0 10px;">
      ☕ <b>CAFÉ DETECTADO</b> ${fromTyping ? "(digitado no teclado 😈)" : "(clicado)"}
      <br/>Sem café, sem química. Sem química, sem mestrado. Logo: <b>CAFÉ</b>.
    </p>
  `;

  const video = document.createElement("video");
  video.src = EGG_VIDEO_SRC;
  video.controls = true;
  video.autoplay = true;
  video.loop = true;
  video.muted = false;
  video.style.width = "100%";
  video.style.borderRadius = "10px";
  video.style.border = "2px ridge rgba(255,255,255,0.25)";
  wrap.appendChild(video);

  openModal("☕ Coffee Break Ritual", wrap);
  zapScreen(2);
}

function cardsEgg(fromTyping=false){
  const wrap = document.createElement("div");
  const card = randomCard();

  wrap.innerHTML = `
    <p style="margin:0 0 10px;">
      🃏 <b>O BARALHO FALOU</b> ${fromTyping ? "(digitado)" : "(clicado)"}
      <br/>Carta tirada: <b>${card}</b>
      <br/><i>Interpretação:</i> se for Ás, você vai apresentar lindo. Se não for, também vai. 🤘
    </p>
  `;

  openModal("🃏 Sorte do Rock", wrap);
  zapScreen(1);
}

function bananaEgg(fromTyping=false){
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p style="margin:0 0 10px;">
      🍌🛌 <b>BANANAS DE PIJAMA APROVAM ESTA DEFESA</b> ${fromTyping ? "(digitado)" : "(clicado)"}
      <br/>Se você leu isso, você já está oficialmente convidado(a).
    </p>
  `;

  openModal("🍌 Pijama Protocol", wrap);
  zapScreen(3);
}

function timeEgg(fromTyping=false){
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p style="margin:0 0 10px;">
      ⏰ <b>ATENÇÃO:</b> O HORÁRIO É IMPORTANTE ${fromTyping ? "(digitado)" : "(clicado)"}!
      <br/>Se você chegar atrasado(a), uma caveira faz um <i>power chord</i> de desaprovação.
    </p>
    <ul style="margin:0 0 10px;">
      <li>Chegue 5 min antes</li>
      <li>Teste áudio/vídeo no Teams</li>
      <li>Não confie no “eu sei que horas são”</li>
    </ul>
  `;

  openModal("⏰ Horário Sagrado", wrap);
  zapScreen(4);
}

// Egg extra
function megaRockEgg(){
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <p style="margin:0 0 10px;">
      🤘 <b>ROCK MODE: ON</b>
      <br/>Você desbloqueou o modo “aplausos em forma de riff”.
    </p>
    <p style="margin:0 0 10px;">
      Agora: finja que tem uma guitarra invisível por 3 segundos.
    </p>
  `;
  openModal("🤘 Riff Unlocked", wrap);
  zapScreen(6);
}

// =============================
// UTILITÁRIOS
// =============================
function randomCard(){
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  const s = suits[Math.floor(Math.random() * suits.length)];
  const r = ranks[Math.floor(Math.random() * ranks.length)];
  return `${r}${s}`;
}

// Um “zap” visual: pisca o fundo e acelera os raios por alguns instantes
function zapScreen(intensity=2){
  const overlay = document.querySelector(".lightning-overlay");
  overlay.style.filter = `drop-shadow(0 0 ${10 + intensity*6}px rgba(255,255,255,0.35))`;
  document.body.style.transition = "filter 120ms ease";
  document.body.style.filter = `contrast(${1 + intensity*0.05}) saturate(${1 + intensity*0.05})`;

  setTimeout(() => {
    overlay.style.filter = "";
    document.body.style.filter = "";
  }, 600);
}
