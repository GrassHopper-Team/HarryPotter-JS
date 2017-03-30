function scoreCounter() {
    const scoreIncreasement = 5;
    const scoreHolder = document.createElement('DIV');
    let currentScore = 0;
    
    scoreHolder.id = 'currentScore';
    scoreHolder.innerHTML = 'Score ' + currentScore;
    scoreHolder.style.display = 'block';
    document.body.appendChild(scoreHolder);

    function createCurrentScoreDiv() {
        show(scoreHolder);
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

    function removeDiv(){
        hide(scoreHolder);
    }

    return {
        increaseScore: increaseScore,
        createDiv: createCurrentScoreDiv,
        getScore: getScore,
        updateScore: updateScore,
        resetScore: resetScore,
        removeDiv: removeDiv
    }
}