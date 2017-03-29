function start() {

    'use strict';
    const WIDTH = 800,
        HEIGHT = 500,
        loopsPerTick = 7, //7
        harrySpritePerRow = 3,
        harrySpriteRows = 4,
        rowWalkUp = 0,
        rowWalkDown = 1,
        rowWalkRight = 2,
        rowWalkLeft = 3;



    createBackground({ width: WIDTH + 60, height: HEIGHT + 40 });

    const playerCanvas = document.getElementById('player-canvas'),
        playerContext = playerCanvas.getContext('2d'),
        playerImg = document.getElementById('harry-sprite'),
        coinImg = document.getElementById('coin-sprite'),
        holeImg = document.getElementById('hole-sprite');


    playerCanvas.width = WIDTH;
    playerCanvas.height = HEIGHT;



    var harrySprite = createSprite({
        sprite: playerImg,
        context: playerContext,
        width: playerImg.width / harrySpritePerRow,
        height: playerImg.height / harrySpriteRows,
        rowNumber: 0,
        numberOfFrames: 0,
        loopTicksPerFrame: loopsPerTick
    });

    const harrySpeed = 2,
        harryInitialX = (WIDTH / 2) - (harrySprite.width / 2),
        harryInitialY = HEIGHT - harrySprite.height;

    var harryBody = createPhysicalBody({
        coordinates: { x: harryInitialX, y: harryInitialY },
        speed: { x: 0, y: 0 },
        width: harrySprite.width,
        height: harrySprite.height
    });


    var otherBody = createPhysicalBody({
        coordinates: { x: WIDTH / 2, y: HEIGHT / 2 },
        speed: { x: 0, y: 0 },
        width: 500,
        height: 300
    });

    var coinSprite = createSprite({
        sprite: coinImg,
        context: playerContext,
        width: coinImg.width / 7,
        height: coinImg.height,
        rowNumber: 0,
        numberOfFrames: 6,
        loopTicksPerFrame: 8
    });

    var coinBody = createPhysicalBody({
        coordinates: { x: (Math.random() * 1000) % (WIDTH - 100), y: (Math.random() * 1000) % (HEIGHT - 100) },
        speed: { x: 0, y: 0 },
        width: 10,
        height: 10
    });

    var holeSprite = createSprite({
        sprite: holeImg,
        context: playerContext,
        width: holeImg.width,
        height: holeImg.height,
        rowNumber: 0,
        numberOfFrames: 1,
        loopTicksPerFrame: 1
    });

    var holeBody = createPhysicalBody({
        coordinates: { x: (Math.random() * 1000) % (WIDTH - 100), y: (Math.random() * 1000) % (HEIGHT - 100) },
        speed: { x: 0, y: 0 },
        width: 50,
        height: 50
    });

    window.addEventListener('keydown', function (event) {

        switch (event.keyCode) {
            case 37:
                if (harryBody.speed.x < 0) {
                    return;
                }
                harryBody.speed.x = -harrySpeed;
                harrySprite.rowNumber = rowWalkLeft;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            case 38:
                harryBody.speed.y = -harrySpeed;
                harrySprite.rowNumber = rowWalkUp;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            case 39:
                harryBody.speed.x = harrySpeed;
                harrySprite.rowNumber = rowWalkRight;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            case 40:
                harryBody.speed.y = harrySpeed;
                harrySprite.rowNumber = rowWalkDown;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function (event) {
        if ((event.keyCode < 37) && (event.keyCode > 40)) {
            return;
        }

        harryBody.speed.x = 0;
        harryBody.speed.y = 0;
        harrySprite.numberOfFrames = 0;
    });

    function gameLoop() {

        var lastHarryCoordinates = harryBody.move({ x: WIDTH - harrySprite.width, y: HEIGHT - harrySprite.height });


        if (harryBody.collidesWith(otherBody) === true) {
            alert('umre');
            return;
        };

        harrySprite.render(lastHarryCoordinates, harryBody.coordinates).update();
        coinSprite.render(coinBody.coordinates, coinBody.coordinates).update();
        holeSprite.render(holeBody.coordinates, holeBody.coordinates).update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
