function stop(score){
    var background = document.getElementById('background-canvas');
    var obstacle = document.getElementById('obstacle-canvas');
    var player = document.getElementById('player-canvas');
    var bolt = document.getElementById('bolt-canvas');

    background.style.display = 'none';
    obstacle.style.display = 'none';
    player.style.display = 'none';
    bolt.style.display = 'none';
    active = false;
    currScore = score.getScore();
    score.resetScore();
    score.removeDiv();
    show(endScreen);
}