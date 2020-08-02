var buttonColor = ["darkgreen","blue","orangered","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (){
    if(!started)
    {
        $(".game-start").text("Level-" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function (){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1)

})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Success!!");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence()
            },1000);
        }
    }else {
        console.log("Wrong!!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $(".game-start").text("Game-Over , Press any Key to Restart Game!!!");
        startOver();

    }
}

function nextSequence() 
{
    userClickedPattern = [];
    level++;
    $(".game-start").text("Level" + level)
    var randomNumber = Math.floor(Math.random() *4)
    var randomChosenColor =  buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    if(!gamePattern)
    {
        $(".game-start").text("wrong!!")
    }
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress (currentColor) {
        $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}









// $("button").click(function () {
//     $("button").css("opacity","0.5")
// })
