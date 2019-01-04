/* Variables */
userSeq = [];
gameSeq = [0, 2, 1];
var id, color, level = 0;
var boardSound = [
    "sounds/pig.mp3",
    "sounds/cat.mp3",
    "sounds/cow.mp3",
    "sounds/dog.mp3"
]

/* Start board sequence */
$(document).ready(function() {
    $(".start").click(function() {
        level++;
        startSequence();
    })
    
    /* User pad listener */
    $(".pad").click(function() {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        addClassSound(id, color);
    })
})

/* Simon Sequence*/
function startSequence() {
    console.log(level);
    $(".display").text(level);
   // getRandomNum();
    var i = 0
    var myInterval = setInterval(function() {
            id = gameSeq[i];
            color = $("#" + id).attr("class").split(" ")[1];
            console.log(id+" "+color)
            addClassSound(id, color);
            i++
            if (i == gameSeq.length) {
                clearInterval(myInterval);
            }
        },
        1000)
}

/* Generate random number */
function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    gameSeq.push(random);
}

/* Add temporary class and sound */
function addClassSound(id, color) {
    $("#" + id).addClass(color + "-active");
    // playSound(id);
    setTimeout(function() {
        $("#" + id).removeClass(color + "-active");
    }, 500);
}

/* Play board sound */
function playSound(id) {

}
