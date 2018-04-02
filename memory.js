// array of cards images
let images = ["https://source.unsplash.com/rqABly7c9j0", "https://source.unsplash.com/3QK6nwhoJGM", "https://source.unsplash.com/wfBvWR3dCqw",
    "https://source.unsplash.com/DoSDQvzjeH0", "https://source.unsplash.com/xaxIzsDQUJM", "https://source.unsplash.com/lElegSg89Ds",
    "https://source.unsplash.com/DwhK2zGMdy0", "https://source.unsplash.com/A3ZOLkgomZE", "https://source.unsplash.com/rqABly7c9j0", "https://source.unsplash.com/3QK6nwhoJGM", "https://source.unsplash.com/wfBvWR3dCqw",
    "https://source.unsplash.com/DoSDQvzjeH0", "https://source.unsplash.com/xaxIzsDQUJM", "https://source.unsplash.com/lElegSg89Ds",
    "https://source.unsplash.com/DwhK2zGMdy0", "https://source.unsplash.com/A3ZOLkgomZE"
];
// a varuable to count the number of moves
var moves = 0;
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
// when user click a card:
$(".card").on("click", function() {
    //open the card 
    if (!$(this).find("img").hasClass("matched-card")) {
        openCard($(this).find("img"));
        if (numOpened === 2) {
            moves++;
            //get all opened card
            openedCards = $(".card-opened");
            //if there is a match between the two cards, the cards are in a "match" stae: opened and unclickable
            if (hasMatch(openedCards[0], openedCards[1])) {
                openedCards.animateCss("bounceIn", function() {
                    match(openedCards[0], openedCards[1]);
                    displayMoves();
                    displayStars();
                });
                //otherwise cards are closed
            } else {
                openedCards.animateCss('jello', function() {
                    openedCards.fadeOut(function() {
                        closeCards(openedCards[0], openedCards[1]);
                        displayMoves();
                        displayStars();
                    });
                });

            }
            //initialize number of opened cards to be 0
            numOpened = 0;
        }
    }
});




// restart the game when user click the restart button
$(".restart").on("click", function() {
    //close all cards
    $(".card").find("img").fadeOut(function() {
        $(".card").find("img").removeClass("matched-card card-opened");
        $(".card").find("img").addClass("card-closed");
        //initiate the number of moves
        moves = 0;
        displayMoves();
        // initiate the number of stars to be 3
        $("ul li").css("display", "inline-block");
    });
});

//open a card
function openCard(card) {
    if (numOpened <= 1) {
        $(card).fadeIn(function(event) {
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
//display number of moves:
function displayMoves() {
    $("span").text(moves);
}

//display stars: the game starts with 3 stars and after 10 moves the user loses a star and after 6  more the
//user loses one  more.  one star is the lowest rating.
function displayStars() {
    if (moves === 2) {
        $(" ul li:last-child").css("display", "none");
    } else if (moves === 16) {
        $(" ul li:nth-child(2)").css("display", "none");
    }
}

//an animation function with callback to use a list of animations from this library:
// A cross-browser library of CSS animations. As easy to use as an easy thing. http://daneden.github.io/animate.css
$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});