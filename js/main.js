window.addEventListener('load', function () {
  mainMenu();
});

let scores = createScore();
let gameCanvas = document.querySelector('#gameWrapper');
let main = document.querySelector('#mainMenu');
let highScore = document.querySelector('#high-score');
let creditsInfo = document.querySelector('#creditsWrapper');
let endScreen = document.querySelector('#end-screen');

let currScore = 0;
let active = true;

let playBtn = document.querySelector('#playBtn');
let scoreBtn = document.querySelector('#scoreBtn');
let creditsBtn = document.querySelector('#creditsBtn');
let backBtn = document.querySelector('#high-score-button');
let submitBtn = document.querySelector('#submit-button');
let inputField = document.getElementById("nameInput");

function mainMenu() {
  hide(gameCanvas);
  hide(highScore);
  hide(creditsInfo);
  hide(endScreen);
  show(main);
};

function createHighScore(){
  var input = document.getElementById("name").value;
  scores.update({name: input, points: currScore});
  input.value = '';
  createScoreTable(scores);
}

playBtn.addEventListener('click', function () {
  hide(main);
  active = true; ///TODO: WHAT IS DOING
  show(gameCanvas);
  start();
});

scoreBtn.addEventListener('click', function () {
  hide(main);
  show(highScore);
});

backBtn.addEventListener('click', function () {
  hide(highScore);
  show(main);
});

creditsBtn.addEventListener('click', function () {
  hide(main);
  show(creditsInfo);
});

submitBtn.addEventListener('click', function () {
  var input = inputField.value;
  inputField.value = '';

  scores.update({ name: input, points: currScore });
  hide(endScreen);
  show(highScore);
});

window.onkeydown = function (event) {
  // Pressing ESC should hide credits/score and show the menu
  if (event.keyCode == 27  && creditsInfo.style.display !== 'none') {
    mainMenu();
  }
}

function hide(element) {
  element.style.display = 'none';
};

function show(element) {
  element.style.display = 'block';
};