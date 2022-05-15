// alert("Connected...");

const buttonColours = ["darkgreen", "darkred", "orange", "darkblue"];
let gamePattern = [];
let userClickedPattern = [];
let playGame = false;
let level = 0;
let indexOrder = 0;
let randomNumber = 4;
let points = 0;

// waiting for player press any key in the board to play
$(document).keypress(function (event) {
  if (!playGame) {
    if (event.key === "s" || event.key === "S") {
      console.log("-------------------------");
      console.log("------NEXT SEQUENCE------");
      playGame = true;
      // play game
      $("h2").text("Level " + (level + 1));
      // start random sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
});

// track button chosen by player and save game sequence
$(".btn").click(function () {
  if (playGame) {
    let buttonChosen = $(this).attr("id");
    // console.log(`Button Clicked -> ${buttonChosen}`);
    // add color button clicked to array userClickedPattern
    userClickedPattern.push(buttonChosen);
    console.log(`userClickedPattern -> ${userClickedPattern}`);
    // animate button for visualization by player
    // check player sequence
    let classChosen = "pressed-" + buttonChosen;
    animateButton(buttonChosen, classChosen, "green.mp3", 150);

    // pass the gamePattern length and userClickedPattern array
    let check = checkSequence(indexOrder);
    // console.log("check " + check);
    if (!check) {
      gameOver(gamePattern[indexOrder]);
    } else {
      if (gamePattern.length - 1 !== indexOrder) {
        indexOrder++;
        console.log(`gamePattern.length <-> indexOrder`);
        console.log(`         ${gamePattern.length}         <->      ${indexOrder + 1}`);
      } else {
        console.log("-------------------------");
        console.log("------NEXT SEQUENCE------");
        nextLevel();
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
  }
});

// functions--------------------------------------------------------------

// checkSequence - compare index colour of user sequence clicked
let checkSequence = (indexOrd) => {
  if (gamePattern[indexOrd] == userClickedPattern[indexOrd]) {
    console.log(` >>>> CHECKPOINT ${indexOrd + 1} -> TRUE`);
    return true;
  } else {
    console.log(` >>>> CHECKPOINT ${indexOrd + 1} -> FALSE`);
    return false;
  }
};

// nextSequence: make a random number between 0 and 3 choose a colour
let nextSequence = () => {
  // it's possible that 4 appear in random process, we need delete this possibility
  while (randomNumber >= 4) {
    randomNumber = Math.floor(Math.random(3).toFixed(2) * 4);
  }
  // console.log(`Random Number -> ${randomNumber}`);
  let randomChosenColour = buttonColours[randomNumber];
  // add random colour to array game pattern
  gamePattern.push(randomChosenColour);
  console.log(`gamePattern -> ${gamePattern}`);
  randomNumber = 4;
  // console.log(`Colour pattern -> ${gamePattern}`);

  // animate button for visualization by player
  let classChosen = "pressed";
  animateButton(randomChosenColour, classChosen, "green.mp3", 400);
  console.log(`gamePattern.length <-> indexOrder`);
  console.log(`         ${gamePattern.length}         <->      ${indexOrder + 1}`);
};

let nextLevel = () => {
  level++;
  userClickedPattern = [];
  playGame = true;
  points++;
  indexOrder = 0;
  $("h2").text("Level " + (level + 1));
  $("h3").text("RECORD: " + points);
  animateButton("plate", "nextlevel", "success.mp3", 250);
  // setTimeout(function () {
  //   nextSequence();
  // }, 1000);
};

let gameOver = (lastcolour) => {
  $("h2").text("GAME OVER, S TO RESTART");
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  points = 0;
  playGame = false;
  indexOrder = 0;
  setTimeout(() => {}, 1000);
  animateButton("plate", "gameover", "wrong.mp3", 1500);
  blinkColor(lastcolour);
};

// animateButton - show animation
let animateButton = (idBtn, newclass, audio, timee) => {
  // animate button
  $("#" + idBtn).addClass(newclass);
  setTimeout(function () {
    $("#" + idBtn).removeClass(newclass);
  }, timee);
  // play audio
  playAudio(audio);
};

// playAudio - interactive sound
let playAudio = (audio) => {
  // play interactive audio
  var audio = new Audio(audio);
  audio.play();
};

// blink the last correct colour
let blinkColor = (color) => {
  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      $("#" + color)
        .fadeIn(150)
        .fadeOut(150)
        .fadeIn(150);
    }, 100);
  }
};

// var buttonColours = ["red", "blue", "green", "yellow"];

// var gamePattern = [];
// var userClickedPattern = [];

// var started = false;
// var level = 0;

// $(document).keypress(function () {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

// $(".btn").click(function () {
//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);

//   playSound(userChosenColour);
//   animatePress(userChosenColour);

//   checkAnswer(userClickedPattern.length - 1);
// });

// function checkAnswer(currentLevel) {
//   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//     if (userClickedPattern.length === gamePattern.length) {
//       setTimeout(function () {
//         nextSequence();
//       }, 1000);
//     }
//   } else {
//     playSound("wrong");
//     $("body").addClass("game-over");
//     $("#level-title").text("Game Over, Press Any Key to Restart");

//     setTimeout(function () {
//       $("body").removeClass("game-over");
//     }, 200);

//     startOver();
//   }
// }

// function nextSequence() {
//   userClickedPattern = [];
//   level++;
//   $("#level-title").text("Level " + level);
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);

//   $("#" + randomChosenColour)
//     .fadeIn(100)
//     .fadeOut(100)
//     .fadeIn(100);
//   playSound(randomChosenColour);
// }
