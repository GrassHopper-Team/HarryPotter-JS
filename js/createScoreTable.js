function createScoreTable(scores){
    var len = scores.scores.length;
    var table = document.querySelector('.top-scores tbody');
    var trHeader = document.createElement('tr');
    var thName = document.createElement('th');
    thName.innerHTML = 'Name';
    var thScore = document.createElement('th');
    thScore.innerHTML = 'Score';   

    while (table.firstChild) {
     table.removeChild(table.firstChild);
    }
    
    trHeader.appendChild(thName);
    trHeader.appendChild(thScore);
    table.appendChild(trHeader);
    for(var i = 0; i < len; i += 1){
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdScore = document.createElement('td');

        tdName.innerHTML = scores.scores[i].name;
        tdScore.innerHTML = scores.scores[i].points;

        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        table.appendChild(tr);
    }
}