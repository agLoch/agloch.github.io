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
      <br/>Sem café, sem compilação. Sem compilação, sem mestrado. Logo: <b>CAFÉ</b>.
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
    <p style="margin:0 0 10px;">
      Dica: procure um gif tosco e coloque em <code>assets/cards.gif</code>.
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
    <p style="margin:0 0 10px;">
      Substitua <code>assets/banana-pajamas.gif</code> quando achar a imagem perfeita.
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
