function stop(score) {
    const gameCanvas = document.querySelector('#gameWrapper');
    const curScore = document.querySelector('#currentScore');
    
    hide(gameCanvas);
    hide(curScore);

    active = false;
    currScore = score.getScore();
    score.resetScore();

    show(endScreen);
}