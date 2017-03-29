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

    let currentScore = scoreCounter();
    currentScore.createDiv();

    createBackground({ width: BACKCANVASWIDTH, height: BACKCANVASHEIGHT });
    const playerCanvas = document.getElementById('player-canvas'),
        playerContext = playerCanvas.getContext('2d'),
        playerImg = document.getElementById('harry-sprite'),
        boltImg = document.getElementById('bolt-sprite');

    playerCanvas.width = WIDTH;
    playerCanvas.height = HEIGHT;


    // TODO: Add function to create array of elements

    var obstacles = createObstacles({ x: WIDTH, y: HEIGHT }, totalCoins, totalHoles);


    var otherBody = createPhysicalBody({
        coordinates: { x: WIDTH / 2, y: HEIGHT / 2 },
        speed: { x: 0, y: 0 },
        width: 500,
        height: 300
    });

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
        width: harrySprite.width,
        height: harrySprite.height
    });

    var holeBody = createPhysicalBody({
        coordinates: { x: (Math.random()*1000) % (WIDTH - 100), y: (Math.random()*1000) % (HEIGHT - 100) },
        speed: { x: 0, y: 0 },
        width: 50,
        height: 50
    });

    var boltSprite = createSprite({
        sprite:boltImg,
        context: playerContext,
        width: boltImg.width/4,
        height: boltImg.height ,
        rowNumber: 0,
        numberOfFrames:80,
        loopTicksPerFrame:4
    })

    const boltInitialX = (Math.random()*1000) % (WIDTH - 100),
        boltInitialY = 0;

    var boltBody = createPhysicalBody({
        coordinates: { x: boltInitialX, y: boltInitialY },
        speed: { x: 0, y: 0 },
        width: boltSprite.width,
        height: boltImg.height
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

        obstacles.updateAll();

        var lastHarryCoordinates = harryBody.move({ x: WIDTH, y: HEIGHT });
        harrySprite.render(lastHarryCoordinates, harryBody.coordinates).update();
        boltSprite.render(boltBody.coordinates, boltBody.coordinates).update();

        let allObstacles = obstacles.allObstacles;
        for (let i = 0; i < allObstacles.length; i++) {

            let currentObstacle = allObstacles[i];
            if (harryBody.collidesWith(currentObstacle)) {
                if (currentObstacle.harmful) {
                    harryBody.exists = false;
                }
                else {
                    currentScore.increaseScore();
                    currentScore.updateScore();
                    currentObstacle.exists = false;
                }
            }
        }

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
}