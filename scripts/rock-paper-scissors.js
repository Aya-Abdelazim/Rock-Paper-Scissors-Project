// to get score
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

//confirmation message
function confirmationMessage() {
  document.querySelector(
    '.js-confirmation-message'
  ).innerHTML = `Are you sure you want to reset the score?
  <button class='message-button js-confirm-button'>Yes</button>
  <button class='message-button js-denied-button'>No</button>`;
  const confirm = document.querySelector('.js-confirm-button');

  const denied = document.querySelector('.js-denied-button');

  if (confirm) {
    confirm.addEventListener('click', () => {
      resetScore();
      updateScoreElement();
      hideConfirmationMessage();
    });
  }

  if (denied) {
    denied.addEventListener('click', () => {
      document.querySelector('.js-confirmation-message').innerHTML =
        'Cancelled the action.';
      hideConfirmationMessage();
    });
  }
}

// to hide ConfirmationMessage
function hideConfirmationMessage() {
  setTimeout(() => {
    document.querySelector('.js-confirmation-message').innerHTML = '';
  }, 1000);
}

//instead using onclick && display confirmation message
document.querySelector('.js-reset-button').addEventListener('click', () => {
  confirmationMessage();
});

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  localStorage.removeItem('score');
}
/*  let score = {
        wins: 0,
        losses: 0,
        ties: 0
      }; */

//instead using onclick
document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoplay();
});

let isAutoPlaying = false;
let intervalId;
//auto play
function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      //a variable to give random move
      const playerMove = pickComputerMove();
      //run the function play game and take the variable player move as parameter
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    //to stop setinterval
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

//instead using onclick use addEventListener
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

//play the game with keyboard
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoplay();
  } else if (event.key === 'Backspace') {
    confirmationMessage();
  }
});

//use function with parameter to make code simple and easy to update
function playGame(playerMove) {
  //executing the function.
  /*  pickComputerMove(); */
  //make the function as variable to fix scope with use return.
  const computerMove = pickComputerMove();

  let result = '';

  //variable outside the function to solution the scope (can use it anywhere else in the code) global variables.
  /*  let computerMove = '';
   */
  //use function to reuse the code and make code easier to update.
  //use if inside if to make sure this code will running in this case
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    } else if (computerMove === 'rock') {
      result = 'You win.';
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'scissors') {
      result = 'Tie.';
    } else if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    }
  }
  //update the score
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }
  //save update into localstorage
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `you 
<img src="image/${playerMove}-emoji.png" alt="" class="move-icon">
<img src="image/${computerMove}-emoji.png" alt="" class="move-icon">
computer`;

  /*alert(
          `You picked ${playerMove} Computer picked ${computerMove}. ${result}
Wins: ${score.wins} , Losses ${score.losses} , Ties: ${score.ties}.`
        );*/
}

function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins} , Losses ${score.losses} , Ties: ${score.ties}.`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  //to get a value out of a function.
  return computerMove;
}
