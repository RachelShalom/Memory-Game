// array of cards images
let images = ["https://source.unsplash.com/rqABly7c9j0", "https://source.unsplash.com/3QK6nwhoJGM", "https://source.unsplash.com/wfBvWR3dCqw",
    "https://source.unsplash.com/DoSDQvzjeH0", "https://source.unsplash.com/xaxIzsDQUJM", "https://source.unsplash.com/lElegSg89Ds",
    "https://source.unsplash.com/DwhK2zGMdy0", "https://source.unsplash.com/A3ZOLkgomZE", "https://source.unsplash.com/rqABly7c9j0", "https://source.unsplash.com/3QK6nwhoJGM", "https://source.unsplash.com/wfBvWR3dCqw",
    "https://source.unsplash.com/DoSDQvzjeH0", "https://source.unsplash.com/xaxIzsDQUJM", "https://source.unsplash.com/lElegSg89Ds",
    "https://source.unsplash.com/DwhK2zGMdy0", "https://source.unsplash.com/A3ZOLkgomZE"
];
// a variable to count the number of opened cards
var numOpened = 0;
//a node list of all cards that are opened
var openedCards;
//  a nodeList of all cards
var cards = $(".card");
//shuffle all images 
shuffle(images);
//distribute images on the board
for (var i = 0; i < cards.length; i++) {
    $(cards[i]).find("img").attr("src", images[i]);
}

$(".card").on("click", function() {
    //open a card when user clicks
    if (!$(this).find("img").hasClass("matched-card")) {
        openCard($(this).find("img"));
        if (numOpened === 2) {
            //get all opened card
            openedCards = $(".card-opened");
            //if there is a match between the two cards ...... otherwise
            if (hasMatch(openedCards[0], openedCards[1])) {
                match(openedCards[0], openedCards[1]);
            } else {
                openedCards.addClass("animated bounce");
                openedCards.fadeOut("slow", function() {
                    closeCards(openedCards[0], openedCards[1]);
                });

            }
            //initialize number of opened cards to be 0
            numOpened = 0;
        }
    }
});



//open a card
function openCard(card) {
    if (numOpened <= 1) {
        $(card).fadeIn("slow", function(event) {
            $(this).removeClass("card-closed");
        });
        $(card).addClass("card-opened");
        numOpened++;
    }
}

//close two cards
function closeCards(card0, card1) {
    if (!$(card0).hasClass("matched-card") && !$(card1).hasClass("matched-card")) {
        $(card0).addClass("card-closed");
        $(card1).addClass("card-closed");
        $(card1).removeClass("card-opened");
        $(card0).removeClass("card-opened");
    }
}

//Match cards and leave it open, blurry and not click-able
function match(card0, card1) {
    $(card1).removeClass("card-opened");
    $(card0).removeClass("card-opened");
    $(card0).addClass("matched-card");
    $(card1).addClass("matched-card");
}


//check if two opened cards are matched, return true if there a match. Return false if there is no Match.
function hasMatch(card1, card2) {
    image1 = $(card1).attr("src");
    image2 = $(card2).attr("src");
    if (image1 === image2) {
        return true;
    }
    return false;
}










// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}