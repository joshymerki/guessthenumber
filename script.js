'use strict';

//Initial all HTML Elements
const message = document.querySelector('.message');
const numberHTML = document.querySelector('.number');
const scoreHTML = document.querySelector('.score');
const highScoreHTML = document.querySelector('.highscore');

// Our Seacret Number
let randomNumber = Math.trunc(Math.random() * 21);

// Score Variable
let scoreNumber = 20;
let highScoreNumber = 0;

//Function if you WON
const wonTheGame = function () {
  message.textContent = 'Right Number';
  document.querySelector('body').classList.add('won');
  numberHTML.textContent = randomNumber;
};

//Function if you lost
const loseTheGame = function () {
  message.textContent = 'You Lost the Game!';
  scoreHTML.textContent = 0;
};

//Function if you input the Wrong number
const wrongNumberInput = function (text) {
  message.textContent = `The Number is to ${text}.`;
  scoreNumber--;
  scoreHTML.textContent = scoreNumber;
};

const restartTheGame = function () {
  scoreNumber = 20;
  scoreHTML.textContent = scoreNumber;
  numberHTML.textContent = '?';
  document.querySelector('.guess').value = '';
  randomNumber = Math.trunc(Math.random() * 21);
  message.textContent = 'Start guessing...';
};

document.querySelector('.btn.check').addEventListener('click', function () {
  //Get the Input Value and Convert it to a Number.
  const numberGuessString = document.querySelector('.guess').value;
  const numberGuess = Number(numberGuessString);
  //Check if the Input was a Number
  if (numberGuessString !== numberGuess.toString()) {
    message.textContent = 'No Number!';
  }
  //Check if the Input Was the Random number
  else if (numberGuess === randomNumber) {
    wonTheGame();
  }
  //Check if the Input was hihger then the Random Number
  else if (numberGuess > randomNumber && numberGuess <= 20) {
    if (scoreNumber > 1) {
      wrongNumberInput('high');
    } else {
      loseTheGame();
    }
  }
  //Check if the Input was Lower then the Random Number
  else if (numberGuess < randomNumber && numberGuess >= 0) {
    if (scoreNumber > 1) {
      wrongNumberInput('low');
    } else {
      loseTheGame();
    }
  } else {
    message.textContent = 'The Number is out of Scope';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  if (document.querySelector('body').classList.contains('won')) {
    document.querySelector('body').classList.remove('won');
    if (scoreNumber > highScoreNumber) {
      highScoreNumber = scoreNumber;
      highScoreHTML.textContent = highScoreNumber;
    }
    restartTheGame();
  } else {
    document.querySelector('body').classList.add('not-finished');
  }
});

document.querySelector('.btn.restart').addEventListener('click', function () {
  restartTheGame();
  document.querySelector('body').classList.remove('not-finished');
});
document.querySelector('.btn.c-overlay').addEventListener('click', function () {
  document.querySelector('body').classList.remove('not-finished');
});
