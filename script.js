"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceimg = document.querySelector(".dice");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const rollingmp3 = new Audio("rpg-dice-rolling-95182.mp3"); //syntaxfor adding a mp3 file to add some effect
const switchingpl = new Audio("niff01.mp3");

let activeplayer = 0;
let currentscore = 0;

btnRoll.addEventListener("click", function () {
  rollingmp3.play();

  let dice = Math.trunc(Math.random() * 6) + 1;

  diceimg.src = `dice-${dice}.png`;

  const aplayer = document.querySelector(`#current--${activeplayer}`);
  const currentEl = document.querySelector(`#current--${activeplayer}`);
  if (dice !== 1) {
    currentscore += dice;
    currentEl.textContent = currentscore;
  } else {
    document.querySelector(`#current--${activeplayer}`).textContent = 0;

    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;

    player0.classList.toggle("player--active");

    player1.classList.toggle("player--active");
    currentscore = 0;
    aplayer.textContent;
  }
});

btnHold.addEventListener("click", function () {
  switchingpl.play();

  const scoreEl = document.querySelector(`#score--${activeplayer}`);
  const currentEl = document.querySelector(`#current--${activeplayer}`);

  scoreEl.textContent =
    Number(scoreEl.textContent) + Number(currentEl.textContent);

  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  const activescore = document.querySelector(
    `#score--${activeplayer}`,
  ).textContent;

  if (activescore >= 20) {
    document.querySelector(`#name--${activeplayer}`).textContent = "winner !";

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove("player--active");
    const winns = new Audio("You-Win-Voice-Sound-Effect.mp3");
    winns.play();
    btnRoll.disabled = true;
    btnHold.disabled = true;
    btnRoll.classList.add("hidden");
    btnHold.classList.add("hidden");

    diceimg.src = `Trophypng.parspng.com-4.png`;

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  }

  activeplayer = activeplayer === 0 ? 1 : 0;
  currentscore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
});
score0.textContent = 0;
score1.textContent = 0;





btnNew.addEventListener("click", function () {
  switchingpl.play();
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.add("player--active");
  score0.textContent = 0;
  score1.textContent = 0;

  current0.textContent = 0;
  current1.textContent = 0;

  activeplayer = 0;
  currentscore = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  btnRoll.disabled = false;
  btnHold.disabled = false;
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  document.querySelector("#name--0").textContent = "player1";
  document.querySelector("#name--1").textContent = "player2";
});
