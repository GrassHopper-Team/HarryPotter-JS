window.addEventListener('load', function () {
  mainMenu();
});

var main = document.querySelector('#main');
var creditsInfo = document.querySelector('#creditsWrapper');

var playBtn = document.querySelector('#playBtn');
var scoreBtn = document.querySelector('#scoreBtn');
var creditsBtn = document.querySelector('#creditsBtn');

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

creditsBtn.addEventListener('click', function () {
  hide(main);
  show(creditsInfo);
})

window.onkeydown = function (event) {
  // Pressing ESC should hide credits/score and show the menu
  if (event.keyCode == 27) {
    hide(creditsInfo);
    show(main);
  }
}