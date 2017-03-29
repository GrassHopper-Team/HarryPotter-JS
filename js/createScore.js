function createScore() {

    var scores = [];

    function update(obj) {
        var len = scores.length;
        var pointsToEnter = obj.points;

        scores.sort(function (a, b) {
                return b.points - a.points;
            });


        if (len < 10 && len !== 0) {
            for (var i = 0; i < len; i += 1) {
                var pointsToCheck = scores[i].points;

                if (pointsToCheck < pointsToEnter) {
                    scores.splice(i, 0, obj);
                    break;
                }
                else if(i === len - 1){
                    scores.push(obj);
                }
            }
        }
        else if (len >= 10){
             for (var i = 0; i < len; i += 1) {
                var pointsToCheck = scores[i].points;

                if (pointsToCheck < pointsToEnter) {
                    scores.splice(i, 0, obj);
                    scores.pop();
                    break;
                }
            }
        }
        else{
            scores.push(obj);
        }
    }

    return {
        scores: scores,
        update: update
    };
}
