// a wrapped set of all cards:
let cards = $(".card");
// array of cards images
let images = ["https://source.unsplash.com/rqABly7c9j0", "https://source.unsplash.com/3QK6nwhoJGM", "https://source.unsplash.com/wfBvWR3dCqw",
    "https://source.unsplash.com/DoSDQvzjeH0", "https://source.unsplash.com/xaxIzsDQUJM", "https://source.unsplash.com/lElegSg89Ds",
    "https://source.unsplash.com/DwhK2zGMdy0", "https://source.unsplash.com/A3ZOLkgomZE"
];
let openedCards = [];
let id0,
    id1;

shuffleImg();
// creat an array of card objects
let cardObjects = [];
cards.each(function(index, card) {
    card.id = index;
    cardObjects.push({ image: card.children[0].getAttribute("src"), opened: false, id: index });
});

// Mark cards that are clicked(opened)
$(".card").click(function() {
    // the card is"clickable" only if it does not have a match
    if (!$(this).children("img").hasClass("matched-image")) {
        //open the clicked card
        $(this).children("img").toggleClass("random-image");
        // save the clicked card's src and id
        var clickedImg = $(this).children("img").attr("src");
        var imgID = $(this).attr("id");
        console.log(clickedImg + " " + imgID);
        //find this card in the array and change the "opened" status from false to true and vise versa
        for (var i = 0; i < cardObjects.length; i++) {
            if (cardObjects[i].id == imgID) {
                cardObjects[i].opened = !cardObjects[i].opened;
            }
            // return;
        }
        //return an array of oepened cards
        openedCards = cardObjects.filter(function(card) {
            return card.opened === true;
        });

        //check if the opened cards match
        if (openedCards.length > 1) {
            //get cards id  
            id0 = openedCards[0].id;
            id1 = openedCards[1].id;
            $("#" + id0).addClass("animate");
            $("#" + id1).addClass("animate");
            if (hasMatch(openedCards[0], openedCards[1])) {
                //if there is a match: 
                //change the opcaity of cards by adding a class
                $("#" + id0).children("img").addClass("matched-image");
                $("#" + id1).children("img").addClass("matched-image");
                cardObjects[id0].opened = false;
                cardObjects[id1].opened = false;
                //TODO: remove this cards from the array of card objects 

                //if there is no much change the opened status to false and hide the image
            } else {
                cardObjects[id0].opened = false;
                cardObjects[id1].opened = false;
                $(".animate").animate({ height: "200px" }, 5000, function() {
                    $(this).children("img").toggleClass("random-image");
                    // $("#" + id0).children("img").toggleClass("random-image");
                    //$("#" + id1).children("img").toggleClass("random-image");
                });
            }
            $("#" + id0).removeClass("animate");
            $("#" + id1).removeClass("animate");
        }
    }
});

// check if two opened cards are matched: have the same image
function hasMatch(card1, card2) {
    if (card1.opened && card2.opened) {
        if (card1.image === card2.image) {
            return true;
        }
        return false;
    }
}
//function to randomly scatter the images in the cards
function shuffleImg() {
    ranNums = shuffleArray();
    cards.each(function(index) {
        $(this).children("img").attr("src", images[ranNums[index]]);
    })
}

// this function returns a shuffled array of the nums array
function shuffleArray() {
    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
        ranNums = [],
        i = nums.length,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }
    return ranNums;
}