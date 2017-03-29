function scoreCounter() {
    const scoreIncreasement = 5;
    var currentScore = 0;

    function createCurrentScoreDiv() {
        var scoreHolder = document.createElement('DIV');
        scoreHolder.id = 'currentScore';
        scoreHolder.innerHTML = 'Score ' + currentScore;
        document.body.appendChild(scoreHolder);
    }

    function increaseScore() {
        currentScore += scoreIncreasement
        return currentScore ;
    }

    function getScore(){
        return this.currentScore;
    }

    function updateScore(){
        var div = document.getElementById('currentScore');
        div.innerHTML = 'Score ' + currentScore;
    }

    return {
        increaseScore: increaseScore,
        createDiv: createCurrentScoreDiv,
        getScore: getScore,
        updateScore: updateScore
    }
}