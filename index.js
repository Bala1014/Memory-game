
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        // $("h1").text("Level " + level);
        started = true;
        nextSequence();
    }

});

function nextSequence(){

    userClickedPattern = [];

    var colors = ["red","blue","green","yellow"];
    var randomNo = Math.floor(Math.random()*4);
    var nextSeleted = colors[randomNo];
    $("#"+colors[randomNo]).fadeOut(100).fadeIn(100);

    gamePattern.push(colors[randomNo]);

    level++;
    $("h1").text("level " + level);
    playSound(nextSeleted);
}

$(".btn").click(function(){
    var userClickedColor = $(this).attr("id");
    
    userClickedPattern.push(userClickedColor);

    animateWhenClicked(userClickedColor);
    playSound(userClickedColor);

    checker(userClickedPattern.length - 1);

    

});

function checker(idx){
    if(gamePattern[idx] === userClickedPattern[idx]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },500);
        }
    }
    else{
        $("h1").text("Incorrect, Press any key to play AGAIN");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        playSound("wrong")
        level = 0;
        started = false;
        gamePattern = [];
    }
}

function animateWhenClicked(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100)
}

function playSound(color){
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}