function createScore(score) {
    'use strict';
    var scores = [];

    function update(score) {
        let pointsToEnter = score.points;
        let len = scores.length;

        if (len >= 10) {
            for (var i = 0; i < len; i += 1) {
                var pointsToCheck = scores[i].points;

                if (pointsToCheck < pointsToEnter) {
                    scores.splice(i, 0, score);
                    scores.pop();
                    break;
                }
            }
        }
        else {
            scores.push(score);
        }

        scores.sort(function (a, b) {
            return b.points - a.points;
        });

        updateDOM();
    }

    function updateDOM() {
        let scoreTable = document.getElementById('score-table');
        let header = scoreTable.querySelector('#header');
        var len = scores.length;
        
        while (scoreTable.firstChild) {
            scoreTable.removeChild(scoreTable.firstChild);
        }

        scoreTable.appendChild(header);
        
        for (let i = 0; i < len; i += 1) {
            let tr = document.createElement('TR');

            let tdName = document.createElement('TD');
            tdName.innerHTML = scores[i].name;

            let tdScore = document.createElement('TD');
            tdScore.innerHTML = scores[i].points;

            tr.appendChild(tdName);
            tr.appendChild(tdScore);
            scoreTable.appendChild(tr);
        }
    }

    return {
        scores: scores,
        update: update,
    };
}
