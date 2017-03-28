window.addEventListener('load', function () {
    mainMenu();
});

var main = document.getElementById('main');

function hide(element) {
  element.style.display = 'none';
};

function show(element) {
  element.style.display = 'block';
} ;

function mainMenu() {
  show(main);
};

document.querySelectorAll('.play')[0].addEventListener('click', function() {
  hide(main);
  start();
});