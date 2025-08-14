let userScore = 0;
let compScore = 0;
const winningScore = 3;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

// New elements for displaying choices
const resultsDisplay = document.querySelector(".results-display");
const userChoiceImg = document.querySelector("#user-choice-img");
const compChoiceImg = document.querySelector("#comp-choice-img");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was a Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    updateScoreGlow(true);
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    updateScoreGlow(false);
  }
  checkGameEnd();
};

const updateScoreGlow = (userWon) => {
  userScorePara.classList.remove("win-glow", "lose-glow");
  compScorePara.classList.remove("win-glow", "lose-glow");

  if (userWon) {
    userScorePara.classList.add("win-glow");
    compScorePara.classList.add("lose-glow");
  } else {
    userScorePara.classList.add("lose-glow");
    compScorePara.classList.add("win-glow");
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  // Show the results display and set the images
  resultsDisplay.classList.remove("hidden");
  userChoiceImg.src = `./images/${userChoice}.png`;
  compChoiceImg.src = `./images/${compChoice}.png`;

  if (userChoice === compChoice) {
    drawGame();
    updateScoreGlow(); // No winner
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const checkGameEnd = () => {
  if (userScore === winningScore || compScore === winningScore) {
    const winner = userScore === winningScore ? "You" : "The Computer";
    msg.innerText = `${winner} won the game!`;
    msg.style.backgroundColor = winner === "You" ? "blue" : "purple";
    choices.forEach((choice) => (choice.style.pointerEvents = "none"));
    resetBtn.classList.remove("hidden");
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  choices.forEach((choice) => (choice.style.pointerEvents = "auto"));
  resetBtn.classList.add("hidden");
  userScorePara.classList.remove("win-glow", "lose-glow");
  compScorePara.classList.remove("win-glow", "lose-glow");

  // Hide the results display on reset
  resultsDisplay.classList.add("hidden");
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", resetGame);