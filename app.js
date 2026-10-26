// Stage 1: create eight buttons and connect a single board listener.
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

function createCreatureCards() {
  for (const creature of creatures) {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.textContent = creature.symbol;
    card.dataset.name = creature.name;
    card.setAttribute("aria-label", creature.name);
    board.append(card);
  }
}

function handleBoardClick(event) {
  // closest also finds the button if we later put an element inside it.
  const card = event.target.closest(".card");

  // Clicking a gap in the grid must not count as clicking a creature.
  if (card === null) {
    return;
  }

  message.textContent = `You found the ${card.dataset.name.toLowerCase()}!`;
}

board.addEventListener("click", handleBoardClick);
createCreatureCards();
