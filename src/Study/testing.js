let test1 = null;
let test2 = undefined;
let test3 = {};
let test4 = { cards: [] };
let test5 = { cards: [1, 2, 3] };

function render(deck) {
  let shouldRenderNotEnoughCards = deck && deck.cards && deck.cards.length < 3;

  let shouldRenderCards = deck && deck.cards && deck.cards.length >= 3;

  let flipped = true;

  let cardIndex = 2;

  if (shouldRenderNotEnoughCards) {
    return "renderNotEnoughCards\n";
  } else if (shouldRenderCards) {
    if (flipped) {
      console.log("render back");

      let isLastCard = cardIndex === deck.cards.length - 1;

      if (isLastCard) {
        console.log("render special next button");
      } else {
        console.log("render normal next button");
      }
    } else {
      console.log("render front");
    }

    return "renderCards\n";
  } else {
    return "renderNothing\n";
  }
}

console.log("deck is null - ", testRender(test1));
console.log("deck is undefined - ", testRender(test2));
console.log("deck.cards does not exist - ", testRender(test3));
console.log("cards less than 3 - ", testRender(test4));
console.log("cards are 3 or more -", testRender(test5));
