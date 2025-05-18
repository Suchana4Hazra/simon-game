const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let score = 0;
let started = false;

// Start the game
document.getElementById("start-btn").addEventListener("click", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
    this.style.display = "none";
  }
});

// Handle button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (!started) return;

    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate next color in sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  document.getElementById("score").textContent = "Score: " + (score+(level == 0)? 0:level-1);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Flash the selected button
  animateFlash(randomChosenColor);
}

// Animate button flash
function animateFlash(color) {
  const button = document.getElementById(color);
  setTimeout(() => {
    button.classList.add("flash");
  },100);
  setTimeout(() => {
    button.classList.remove("flash");
  }, 300);
}

// Animate user click
function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

// Check if user's input is correct
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Wrong! Press Start to Restart";
    document.getElementById("score").textContent = "Final Score: " + (level - 1);
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    document.getElementById("start-btn").style.display = "inline-block";
    // setTimeout(() => {startOver}, 1000);
    startOver();
  }
}

// Reset game
function startOver() {
  level = 0;
  score = 0;
  gamePattern = [];
  started = false;
  // document.getElementById("score").textContent = "Score: 0";
}
