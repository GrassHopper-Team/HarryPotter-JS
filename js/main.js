window.addEventListener('load', function () {
  mainMenu();
});

var main = document.getElementById('main');

function hide(element) {
  element.style.display = 'none';
};

function show(element) {
  element.style.display = 'block';
};

function mainMenu() {
  show(main);
};

document.querySelectorAll('.play')[0].addEventListener('click', function () {
  hide(main);
  start();
});

document.querySelectorAll('.credits')[0].addEventListener('click', function () {
  hide(main);
  document.querySelector('#creditsWrapper').classList = "";
})

window.onkeydown = function (event) {
  // Pressing ESC should hide credits/score and show the menu
  if (event.keyCode == 27) {
    document.querySelector('#creditsWrapper').classList += ' hidden';
    show(main);
  }
}