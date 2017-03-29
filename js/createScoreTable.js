function createScoreTable(scores){
    var len = scores.length;
    var table = document.querySelector('.top-scores tbody');
    debugger;
    for(var i = 0; i < len; i += 1){
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdScore = document.createElement('td');

        tdName.innerHTML = scores[i].name;
        tdScore.innerHTML = scores[i].points;

        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        table.appendChild(tr);
    }
}