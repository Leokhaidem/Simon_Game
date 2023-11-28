var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var start = 1;

var level = 0;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").html("Level " + level);
  
}

$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animtePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  
});

$("body").keypress(function () {
  if (start === 1) {
    nextSequence();
    start = 0;
    $("h1").html("Level " + level);
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animtePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  if(userClickedPattern.length == gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
 }
 else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200)
  $("h1").html("Game-over, Press any key to restart");
  startOver();
 }
 
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = 1;
}