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

  if (card === null) {
    return;
  }

  const index = Number(card.dataset.index);
  const creature = deck[index];
  card.textContent = creature.symbol;
  card.setAttribute("aria-label", `Card ${index + 1}, ${creature.name}`);
  message.textContent = `You revealed the ${creature.name.toLowerCase()}!`;
}

board.addEventListener("click", handleBoardClick);
createCreatureCards();
