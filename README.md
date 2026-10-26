# Haunted Pairs

A Halloween memory card game for M1

## Current functionality

- A deck of 16 cards containing eight creature pairs.
- Cards are shuffled each time the page loads.
- Cards start face down.
- Clicking a card reveals its creature and updates the message.
- Basic styling and keyboard-accessible card buttons.
- Players can reveal two cards at a time.
- Matching pairs stay visible and cannot be selected again.
- Mismatched cards turn face down after one second.
- Extra selections are blocked while mismatched cards are visible.

## How to run

For now, `index.html` in a browser. The project uses separate HTML, CSS, and JavaScript.

## Uso de IA

I used AI to help me create and understand some of the JS code. I also used AI to help me style in CSS since its been a while.

My CSS Prompt (it had access to my repo): I want to style my CSS halloween themed. Give me a brief refresh of CSS and the different ways I can style my game. 
Second CSS Prompt: I want you to check my CSS, find the errors, fix them, explain what needed to be fixed and if there are alternatives.

JS Prompt: When two cards don’t match, I use setTimeout() to flip them back after one second, but the player can click another card before that happens and it breaks the selection logic. How can I block card clicks during that second and allow them again afterward? explain the implementation for a beginner, step by step.

## Autopsia

## Autopsia

1. I use one click listener on the board instead of adding a listener
   to every card. The listener identifies the clicked card with
   closest(".card"). This also lets me replace the cards when restarting
   without attaching new listeners. Individual listeners would work,
   but I preferred handling card clicks in one place.

2. I store the mismatch timer so I can cancel it when restarting.
   Without clearTimeout, restarting during the one-second delay could
   let the previous game's callback hide cards or change the message
   in the new game. An alternative would be to disable restarting
   during the delay, but I preferred allowing a restart at any time.
