function scoreCounter() {
    const scoreIncreasement = 5;
    const scoreHolder = document.createElement('DIV');
    let currentScore = 0;
    
    scoreHolder.id = 'currentScore';
    scoreHolder.innerHTML = 'Score ' + currentScore;
    scoreHolder.style.display = 'block';


    function createCurrentScoreDiv() {
        document.body.appendChild(scoreHolder);
    }

    function increaseScore() {
        currentScore += scoreIncreasement;
        return currentScore;
    }

    function getScore() {
        return currentScore;
    }

    function updateScore() {
        scoreHolder.innerHTML = 'Score ' + currentScore;
    }

    function resetScore() {
        currentScore = 0;
        return this;
    }

    return {
        increaseScore: increaseScore,
        createDiv: createCurrentScoreDiv,
        getScore: getScore,
        updateScore: updateScore,
        resetScore: resetScore
    }
}