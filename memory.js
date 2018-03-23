// a wrapped set of all cards:
let cards = $(".card");
// array of cards images
let images = ["https://source.unsplash.com/rqABly7c9j0", "https://source.unsplash.com/3QK6nwhoJGM", "https://source.unsplash.com/wfBvWR3dCqw",
    "https://source.unsplash.com/DoSDQvzjeH0", "https://source.unsplash.com/xaxIzsDQUJM", "https://source.unsplash.com/lElegSg89Ds",
    "https://source.unsplash.com/DwhK2zGMdy0", "https://source.unsplash.com/A3ZOLkgomZE"
];

shuffleImg();

// check if two cards that are clicked have the same image

$(".card").click(function() {
    //open a card
    $(this).children("img").toggleClass("random-image");
    //check 
});

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