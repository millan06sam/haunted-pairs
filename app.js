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
const deck = shuffleDeck([...creatures, ...creatures]);
let selectedCards = [];
const matchedCards = [];
let isBoardLocked = false;

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
    card.textContent = "?";
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

  checkPair();
}

function setCardFace(index, isFaceUp) {
  const card = board.children[index];
  const creature = deck[index];
  card.textContent = isFaceUp ? creature.symbol : "?";
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
    return;
  }

  isBoardLocked = true;
  message.textContent = "Not a match. Try to remember these creatures!";

  setTimeout(() => {
    setCardFace(firstIndex, false);
    setCardFace(secondIndex, false);
    selectedCards = [];
    isBoardLocked = false;
    message.textContent = "Choose a card to try again.";
  }, 1000);
}

board.addEventListener("click", handleBoardClick);
createCreatureCards();
