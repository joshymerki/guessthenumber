'use strict';

//Initial all HTML Elements into var
const message = document.querySelector('.message');
const numberHTML = document.querySelector('.number');
const scoreHTML = document.querySelector('.score');
const highScoreHTML = document.querySelector('.highscore');
const buttonCheck = document.querySelector('.btn.check');
const bodyHTML = document.querySelector('body');
const highScoreText = document.querySelector('.highscore-menu-text');
const guessHTML = document.querySelector('.guess');

// Creating Sectret Number from 1 to 20
let randomNumber = Math.trunc(Math.random() * 21);

// Some Variable
let scoreNumber = 20;
let highScoreNumber = 0;
let lastGuess;
let won = false;

//Function to Open the Menu
const openMenu = function () {
  bodyHTML.classList.add('open-menu');
  highScoreText.textContent = highScoreNumber;
};

//Function to close the Menu
const closeMenu = function () {
  bodyHTML.classList.remove('open-menu');
};

//Function if you WON
const wonGame = function () {
  won = true;
  message.textContent = 'Right Number';
  bodyHTML.classList.add('won');
  numberHTML.textContent = randomNumber;
};

//Function if you LOST
const loseGame = function () {
  message.textContent = 'You Lost the Game!';
  scoreHTML.textContent = 0;
};

//Function if you input the Wrong number
const wrongNumberInput = function (text) {
  message.textContent = `The Number is to ${text}.`;
  scoreNumber--;
  scoreHTML.textContent = scoreNumber;
};

//Function for Reseting all the Game stats
const resetVar = function () {
  lastGuess = '';
  scoreNumber = 20;
  scoreHTML.textContent = scoreNumber;
  numberHTML.textContent = '?';
  guessHTML.value = '';
  randomNumber = Math.trunc(Math.random() * 21);
  message.textContent = 'Start guessing...';
};

//Function for Restarting the Game
const restartTheGame = function (restartArt) {
  //Check if you had won
  if (won) {
    bodyHTML.classList.remove('won');
    won = false;
    //Check if newHighscore is Higher han OLD
    if (scoreNumber > highScoreNumber) {
      highScoreNumber = scoreNumber;
      highScoreHTML.textContent = highScoreNumber;
    }
  }
  //Check if it is a Hard reset
  if (restartArt === `hardReset`) {
    highScoreNumber = 0;
    highScoreHTML.textContent = highScoreNumber;
  }

  //Reset all Var to Default
  resetVar();
};

//Function for Cheking the Input Value
const checkTheInput = function () {
  //Get the Input Value and Convert it to a Number.
  const numberGuessString = guessHTML.value;
  const numberGuess = Number(numberGuessString);

  //Check if the Input was a Number
  if (numberGuessString !== numberGuess.toString()) {
    message.textContent = 'No Number!';
  }

  //Check if the Number is not the Same Number again
  else if (lastGuess != numberGuess) {
    //Check if the Input Was the Random number
    if (numberGuess === randomNumber) {
      lastGuess = numberGuess;
      wonGame();
    }

    //Check if the Input was hihger then the Random Number
    else if (numberGuess > randomNumber && numberGuess <= 20) {
      lastGuess = numberGuess;
      if (scoreNumber > 1) {
        wrongNumberInput('high');
      } else {
        loseGame();
      }
    }

    //Check if the Input was Lower then the Random Number
    else if (numberGuess < randomNumber && numberGuess >= 0) {
      lastGuess = numberGuess;
      if (scoreNumber > 1) {
        wrongNumberInput('low');
      } else {
        loseGame();
      }
    }
    //Default Anwser
    else {
      message.textContent = 'The Number is out of Scope';
    }
  }

  //Check if it is the Same number
  else if (lastGuess === numberGuess) {
    message.textContent = 'Dont input the same Number Again';
  }
};

//Chek Button Listener
buttonCheck.addEventListener('click', checkTheInput);

//Restart button
document
  .querySelector('.normal-game .btn.restart-soft')
  .addEventListener('click', function () {
    restartTheGame(`softReset`);
  });

//Open Menu Button
document.querySelector('.menu-btn').addEventListener('click', openMenu);

//Menu Buttons

//Button for Soft Reset
document
  .querySelector('.menu .btn.restart-soft')
  .addEventListener('click', function () {
    restartTheGame(`softReset`);
    closeMenu();
  });

//Button for hard Reset
document
  .querySelector('.btn.restart-hard')
  .addEventListener('click', function () {
    restartTheGame(`hardReset`);
    closeMenu();
  });

//Button for Menu Close
document.querySelector('.btn.c-menu').addEventListener('click', closeMenu);

//Add Key Support
window.addEventListener(
  'keydown',
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      //Key Support Esc
      case 'Escape':
        closeMenu();
        break;
      //Key Support Enter
      case 'Enter':
        if (!bodyHTML.classList.contains(`open-menu`)) {
          checkTheInput();
        }
        break;
      case ' ':
        if (!bodyHTML.classList.contains(`open-menu`)) {
          restartTheGame(`softReset`);
        }
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);
