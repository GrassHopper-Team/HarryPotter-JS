function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPositionInCanvas(width, height, canvasDimensions) {
    let x = getRandomInRange(0, canvasDimensions.x) - width;
    let y = getRandomInRange(0, canvasDimensions.y) - height;

    if (x < 0) {
        x = 0;
    }

    if (y < 0) {
        y = 0;
    }

    return {
        x: x,
        y: y
    }
}

function waitSeconds(iMilliSeconds) {
    let counter = 0
        , start = new Date().getTime()
        , end = 0;
    while (counter < iMilliSeconds) {
        end = new Date().getTime();
        counter = end - start;
    }
}