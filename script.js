'use strict';
/*
document.addEventListener()

const numberGuess = document.querySelector('.guess').value;

console.log(message, score, numberHTML, numberGuess);
*/
//Initial all HTML Elements
const message = document.querySelector('.message');
const numberHTML = document.querySelector('.number');
const scoreHTML = document.querySelector('.score');

// Our Seacret Number
let randomNumber = Math.trunc(Math.random() * 21);
numberHTML.textContent = randomNumber;

// Score Variable
let scoreNumber = 20;

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
    message.textContent = 'Right Number';
  }
  //Check if the Input was hihger then the Random Number
  else if (numberGuess > randomNumber) {
    if (scoreNumber > 1) {
      wrongNumberInput('high');
    } else {
      loseTheGame();
    }
  }
  //Check if the Input was Lower then the Random Number
  else if (numberGuess < randomNumber) {
    if (scoreNumber > 1) {
      wrongNumberInput('low');
    } else {
      loseTheGame();
    }
  }
});
