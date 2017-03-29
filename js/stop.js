function stop(score){
    var background = document.getElementById('background-canvas');
    var obstacle = document.getElementById('obstacle-canvas');
    var player = document.getElementById('player-canvas');

    background.style.display = 'none';
    obstacle.style.display = 'none';
    player.style.display = 'none';
    active = false;
    currScore = score; 
    show(endScreen);
}