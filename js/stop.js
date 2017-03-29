function stop(score) {
    const gameCanvas = document.querySelector('#gameWrapper');
    const currentScore = document.querySelector('#currentScore');

    hide(gameCanvas);
    hide(currentScore);

    active = false;
    currScore = score.getScore();
    score.resetScore();
    
    show(endScreen);
}