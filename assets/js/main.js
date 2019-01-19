/*------- Global Variables -------*/
userSeq = [];
gameSeq = [];

var id, color, level = 0;

/*------- Start board sequence ------*/
$(document).ready(function() {
    $(".start").click(function() {
        startSequence();
    })

    /*------- Reset Button -------*/
    $(".reset").click(function() {
        resetGame();
    })

    /*------ User button listener -------*/
    $(".button").click(function() {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        userSeq.push(id);
        console.log(id + " " + color);
        addClassSound(id, color);

        /*------ Check user sequence ------*/
        if (!checkUserSeq()) {
            displayError();
            userSeq = [];
        }

        /*------ Check for end of sequence ------*/
        const NUM_OF_LEVELS = 6;
        if (userSeq.length == gameSeq.length && userSeq.length < NUM_OF_LEVELS) {
            level++;
            userSeq = [];
            startSequence();
        }

        /*------ Check for winners -------*/

        if (userSeq.length == NUM_OF_LEVELS) {
            $(".display").text("WIN");
            winnerSound();
            level = 0;
            gameSeq = [];
            userSeq = [];
        }
    });
});

/*------ Check user sequence against game sequence --------*/
function checkUserSeq() {
    for (var i = 0; i < userSeq.length; i++) {
        if (userSeq[i] != gameSeq[i]) {
            return false;
        }
    }
    return true;
}

/*------- Display error message -------*/
function displayError() {
    console.log("error");
    var counter = 0;
    var myError = setInterval(function() {
        $(".display").text("XX");
        counter++;
        level = 0;

        if (counter == 6) {
            $(".display").text(level);
            clearInterval(myError);
            errSound();
            level = 0;
            gameSeq = [];
            userSeq = [];
        }
    }, 500);
}

/*------- Game Sequence --------*/
function startSequence() {
    console.log(level);
    $(".display").text(level);
    getRandomNum();
    var i = 0;
    var myInterval = setInterval(function() {
        id = gameSeq[i];
        color = $("#" + id).attr("class").split(" ")[1];
        console.log(id + " " + color);
        addClassSound(id, color);
        i++;
        if (i == gameSeq.length) {
            clearInterval(myInterval);
        }
    }, 1500)
}

/*-------- Generate random number -------*/
function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    gameSeq.push(random);
}

/*-------- Add temporary class and sound -------*/
function addClassSound(id, color) {
    $("#" + id).addClass(color + "-active");
    playSound(id);
    setTimeout(function() {
        $("#" + id).removeClass(color + "-active");
    }, 500);
}

/*------- Play board sound --------*/
function playSound(id) {
    var boardSound = [
        "assets/sounds/dog.mp3",
        "assets/sounds/cat.mp3",
        "assets/sounds/cow.mp3",
        "assets/sounds/pig.mp3"
    ];
    var sound = new Audio(boardSound[id]);
    sound.play();
}

/*-------- Play error sound -------*/
function errSound() {
    const errorSound = "assets/sounds/end.mp3";
    var wrong = new Audio(errorSound);
    wrong.play();
}

/*------- Play winner sound -------*/
function winnerSound() {
    const winSound = "assets/sounds/win.mp3";
    var win = new Audio(winSound);
    win.play();
}

/*------- Reset Button -------*/

function resetGame() {
    console.log("reset game");
    level = 0;
    gameSeq = [];
    userSeq = [];
}
