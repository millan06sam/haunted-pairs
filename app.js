const creatures = [
  { name: "Pumpkin", symbol: "🎃" },
  { name: "Ghost", symbol: "👻" },
  { name: "Bat", symbol: "🦇" },
  { name: "Spider", symbol: "🕷️" },
  { name: "Skull", symbol: "💀" },
  { name: "Cat", symbol: "🐈‍⬛" },
  { name: "Witch", symbol: "🧙" },
  { name: "Zombie", symbol: "🧟" },
];

const board = document.querySelector("#board");
const message = document.querySelector("#message");
const movesDisplay = document.querySelector("#moves");
const pairsDisplay = document.querySelector("#pairs");
const restartButton = document.querySelector("#restart");
const themeButton = document.querySelector("#theme-toggle");
const themeMoon = document.querySelector("#theme-moon");
const themeLabel = document.querySelector("#theme-label");
let deck = [];
let selectedCards = [];
let matchedCards = [];
let isBoardLocked = false;
let moves = 0;
let mismatchTimer = null;

function toggleTheme() {
  const isMidnight = document.body.classList.toggle("midnight");
  themeButton.setAttribute("aria-pressed", String(isMidnight));
  themeMoon.src = isMidnight ? "assets/midnight-moon.png" : "assets/dusk-moon.png";
  themeLabel.textContent = isMidnight ? "Midnight edition" : "Dusk edition";
}

function handleThemeKey(event) {
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (event.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) {
    return;
  }

  if (event.key.toLowerCase() === "n") {
    toggleTheme();
  }
}

function startGame() {
  clearTimeout(mismatchTimer);
  mismatchTimer = null;
  deck = shuffleDeck([...creatures, ...creatures]);
  selectedCards = [];
  matchedCards = [];
  isBoardLocked = false;
  moves = 0;
  board.replaceChildren();
  createCreatureCards();
  updateScore();
  message.textContent = "Choose a card to find its pair.";
}

function updateScore() {
  movesDisplay.textContent = moves;
  pairsDisplay.textContent = `${matchedCards.length / 2} / ${creatures.length}`;
}

function shuffleDeck(cards) {
  for (let index = cards.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const savedCard = cards[index];
    cards[index] = cards[randomIndex];
    cards[randomIndex] = savedCard;
  }

  return cards;
}

function createCreatureCards() {
  for (let index = 0; index < deck.length; index++) {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.textContent = "";
    card.dataset.index = index;
    card.setAttribute("aria-label", `Card ${index + 1}, face down`);
    board.append(card);
  }
}

function handleBoardClick(event) {
  const card = event.target.closest(".card");

  if (card === null || isBoardLocked) {
    return;
  }

  const index = Number(card.dataset.index);

  if (selectedCards.includes(index) || matchedCards.includes(index)) {
    return;
  }

  setCardFace(index, true);
  selectedCards.push(index);

  if (selectedCards.length === 1) {
    message.textContent = "Choose another card to find its pair.";
    return;
  }

  moves++;
  updateScore();
  checkPair();
}

function setCardFace(index, isFaceUp) {
  const card = board.children[index];
  const creature = deck[index];
  card.textContent = isFaceUp ? creature.symbol : "";
  card.classList.toggle("revealed", isFaceUp);
  const label = isFaceUp ? creature.name : "face down";
  card.setAttribute("aria-label", `Card ${index + 1}, ${label}`);
}

function checkPair() {
  const firstIndex = selectedCards[0];
  const secondIndex = selectedCards[1];

  if (deck[firstIndex].name === deck[secondIndex].name) {
    for (const index of selectedCards) {
      matchedCards.push(index);
      const card = board.children[index];
      card.disabled = true;
      card.classList.add("matched");
      card.setAttribute("aria-label", `Card ${index + 1}, ${deck[index].name}, matched`);
    }

    message.textContent = `You matched the ${deck[firstIndex].name.toLowerCase()} pair!`;
    selectedCards = [];
    updateScore();

    if (matchedCards.length === deck.length) {
      message.textContent = `You found all ${creatures.length} pairs in ${moves} moves!`;
    }

    return;
  }

  isBoardLocked = true;
  message.textContent = "Not a match. Try to remember these creatures!";

  mismatchTimer = setTimeout(() => {
    setCardFace(firstIndex, false);
    setCardFace(secondIndex, false);
    selectedCards = [];
    isBoardLocked = false;
    mismatchTimer = null;
    message.textContent = "Choose a card to try again.";
  }, 1000);
}

board.addEventListener("click", handleBoardClick);
restartButton.addEventListener("click", startGame);
themeButton.addEventListener("click", toggleTheme);
document.addEventListener("keydown", handleThemeKey);
startGame();
