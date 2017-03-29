window.addEventListener('load', function () {
  mainMenu();
});

let scores = createScore();
let main = document.querySelector('#main');
let highScore = document.getElementById('high-score');
let topScore = document.getElementById('top-scores');
let creditsInfo = document.querySelector('#creditsWrapper');
let endScreen = document.querySelector('.end-screen');

var currScore = 0;
var active = true;
let playBtn = document.querySelector('#playBtn');
let scoreBtn = document.querySelector('#scoreBtn');
let creditsBtn = document.querySelector('#creditsBtn');
let backBtn = document.querySelector('.high-score .button');
let submitBtn = document.querySelectorAll('.end-screen .submit-button')[0];

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
  active = true;
  start();
});

scoreBtn.addEventListener('click', function () {
  hide(main);
  createScoreTable(scores);
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
  var input = document.getElementById("name").value;
  scores.update({name: input, points: currScore});
  debugger;
  hide(endScreen);
  show(main);
});

window.onkeydown = function (event) {
  // Pressing ESC should hide credits/score and show the menu
  if (event.keyCode == 27) {
    hide(creditsInfo);
    show(main);
  }
}