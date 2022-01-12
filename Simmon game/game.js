var buttonArray = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var levelup = 0;
var pressed = false;

// if(pressed){
//     $(document).keypress(function(event){

//         if(event.Key === "a" || event.Key === "A"){
//             nextSequence()
//         }

//     })

//     pressed = !pressed;
// }

$(document).keypress(function () {
  if (!pressed) {
    $("#level-title").text("Level " + levelup);
    nextSequence();
    pressed = true;
  }
});

function nextSequence() {
  //   var level = "Level";
  //   $("#level-title").text(level + " " + levelup);
  userClickedPattern = [];

  levelup++;
  $("#level-title").text("Level " + levelup);

  var randomNumber = Math.floor(Math.random() * 4);
  var selectedColor = buttonArray[randomNumber];
  gamePattern.push(selectedColor);

  $("#" + selectedColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audiofile = new Audio("sounds/" + selectedColor + ".mp3");
  audiofile.play();
}

$(".btn").click(function () {
  var useChosenColour = $(this).attr("id");
  userClickedPattern.push(useChosenColour);
  playSound(useChosenColour);
  animatePress(useChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  console.log(gamePattern);
  console.log(userClickedPattern);
});

function playSound(name) {
  var audiofile = new Audio("sounds/" + name + ".mp3");
  audiofile.play();
}

function animatePress(button) {
  $("." + button).addClass("pressed");
  setTimeout(() => {
    $("." + button).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLel) {
  //   var gamePatternVal = gamePattern.length - 1;
  //   var currentVal = userClickedPattern.length - 1;

  //   if (gamePattern[gamePatternVal] === userClickedPattern[currentVal]) {
  //     console.log("correct");

  //     setTimeout(() => {
  //       nextSequence();
  //     }, 1000);
  //   } else {
  //     console.log("wrong");
  //     pressed = false;
  //   }

  if (gamePattern[currentLel] === userClickedPattern[currentLel]) {
    console.log("C");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("w");

    var audiofile = new Audio("sounds/wrong.mp3");
    audiofile.play();
    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over😈, press any key to restart");

    restart();
  }
}

function restart() {
  pressed = false;
  gamePattern = [];
  userClickedPattern = [];
  levelup = 0;
}
