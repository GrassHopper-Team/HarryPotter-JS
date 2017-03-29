window.addEventListener('load', function () {
  mainMenu();
});

var scores = createScore();
var main = document.querySelector('#main');
var highScore = document.getElementById('high-score');
var topScore = document.getElementById('top-scores');
var creditsInfo = document.querySelector('#creditsWrapper');
var endScreen = document.querySelector('.end-screen');

var playBtn = document.querySelector('#playBtn');
var scoreBtn = document.querySelector('#scoreBtn');
var creditsBtn = document.querySelector('#creditsBtn');
var backBtn = document.querySelector('.high-score .button');
var submitBtn = document.querySelectorAll('.end-screen .submit-button')[0];

function hide(element) {
  element.style.display = 'none';
};

function show(element) {
  element.style.display = 'block';
};

function mainMenu() {
  hide(creditsInfo)
  show(main);
};

playBtn.addEventListener('click', function () {
  hide(main);
  start();
});

scoreBtn.addEventListener('click', function () {
  hide(main);
  createScoreTable(scores.scores);
  show(highScore);
});

backBtn.addEventListener('click', function(){
  hide(highScore);
  show(main);
});

creditsBtn.addEventListener('click', function () {
  hide(main);
  show(creditsInfo);
});

submitBtn.addEventListener('click', function(){
  hide(endScreen);
  //Almost done!(storing the score and name)
  show(main);
});

window.onkeydown = function (event) {
  // Pressing ESC should hide credits/score and show the menu
  if (event.keyCode == 27) {
    hide(creditsInfo);
    show(main);
  }
}