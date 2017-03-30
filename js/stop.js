function stop(score) {
    const gameCanvas = document.querySelector('#gameWrapper');
    const curScore = document.querySelector('#currentScore');
    
    hide(gameCanvas);
    curScore.parentNode.removeChild(curScore);

    active = false;
    currScore = score.getScore();
    score.resetScore();

    show(endScreen);
}