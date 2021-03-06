function start() {
    'use strict';

    const WIDTH = 900,
        HEIGHT = 600,
        BACKCANVASWIDTH = WIDTH + 65,
        BACKCANVASHEIGHT = HEIGHT + 47,
        loopsPerTick = 5,
        harrySpeed = 3,
        harrySpritePerRow = 3,
        harrySpriteRows = 4,
        totalCoins = 20,
        totalHoles = 7,
        rowWalkUp = 0,
        rowWalkDown = 1,
        rowWalkRight = 2,
        rowWalkLeft = 3;

    createBackground({ width: BACKCANVASWIDTH, height: BACKCANVASHEIGHT });
    let currentScore = scoreCounter(),
        canMove = true;

    currentScore.createDiv();

    const playerCanvas = document.getElementById('player-canvas'),
        playerContext = playerCanvas.getContext('2d'),
        playerImg = document.getElementById('harry-sprite');

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

    const harryInitialX = (WIDTH / 2) - (harrySprite.width / 2),
        harryInitialY = HEIGHT - harrySprite.height;

    var harryBody = createPhysicalBody({
        coordinates: { x: harryInitialX, y: harryInitialY },
        speed: { x: 0, y: 0 },
        width: harrySprite.width - 5,
        height: harrySprite.height
    });

    var obstacles = createObstacles({ canvasDimensions: { x: WIDTH, y: HEIGHT }, numberOfCoins: totalCoins, numberOfHoles: totalHoles, harry: harryBody });

    window.addEventListener('keydown', function (event) {
        if (!canMove) {
            harryBody.speed.x = 0;
            harryBody.speed.y = 0;
            harrySprite.numberOfFrames = 0;
            return;
        }
        switch (event.keyCode) {
            case 37:
                if (harryBody.speed.x < 0) {
                    return;
                }
                harryBody.speed.x = -harrySpeed;
                harryBody.speed.y = 0;
                harrySprite.rowNumber = rowWalkLeft;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            case 38:
                harryBody.speed.y = -harrySpeed;
                harryBody.speed.x = 0;
                harrySprite.rowNumber = rowWalkUp;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            case 39:
                harryBody.speed.x = harrySpeed;
                harryBody.speed.y = 0;
                harrySprite.rowNumber = rowWalkRight;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            case 40:
                harryBody.speed.y = harrySpeed;
                harryBody.speed.x = 0;
                harrySprite.rowNumber = rowWalkDown;
                harrySprite.numberOfFrames = harrySpritePerRow;
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function (event) {
        if (((event.keyCode < 37) && (event.keyCode > 40))) {
            return;
        }
        harryBody.speed.x = 0;
        harryBody.speed.y = 0;
        harrySprite.numberOfFrames = 0;
    });

    function gameLoop() {

        obstacles.updateAll();
        let lastHarryCoordinates = harryBody.move({ x: WIDTH, y: HEIGHT });
        harrySprite.render(lastHarryCoordinates, harryBody.coordinates).update();

        if (!harryBody.exists) {
            canMove = false;
            waitSeconds(500);
            stop(currentScore);
        }

        let allObstacles = obstacles.allObstacles;
        for (let i = 0; i < allObstacles.length; i++) {

            let currentObstacle = allObstacles[i];
            if (harryBody.collidesWith(currentObstacle)) {
                if (currentObstacle.harmful) {
                    if (!currentObstacle.bolt) {
                        let lastHarryCoordinates = harryBody.move({ x: WIDTH, y: HEIGHT });
                        harryBody.coordinates.x = currentObstacle.coordinates.x + 20;
                        harryBody.coordinates.y = currentObstacle.coordinates.y + 20;
                        harrySprite.render(lastHarryCoordinates, harryBody.coordinates).update();
                    }
                    harryBody.exists = false;
                }
                else {
                    currentScore.increaseScore();
                    currentScore.updateScore();
                    currentObstacle.exists = false;
                }
            }
        }

        if (active) {
            window.requestAnimationFrame(gameLoop);
        }
    }

    gameLoop();
}
