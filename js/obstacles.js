function createObstacles(canvasDimensions, numberOfCoins, numberOfHoles) {
    'use strict';

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomPositionInCanvas(width, height) {
        var x = getRandomInRange(0, canvasDimensions.x) - width;
        var y = getRandomInRange(0, canvasDimensions.y) - height;

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

    const obstacleCanvas = document.getElementById('obstacle-canvas'),
        obstacleContext = obstacleCanvas.getContext('2d'),
        coinImg = document.getElementById('coin-sprite'),
        holeImg = document.getElementById('hole-sprite');

    obstacleCanvas.width = canvasDimensions.x;
    obstacleCanvas.height = canvasDimensions.y;

    numberOfCoins = numberOfCoins || 5;
    numberOfHoles = numberOfHoles || 5;

    var allCoinsSprites = [];
    var allCoinsBodies = [];

    for (var coin = 0; coin < numberOfCoins; coin++) {
        var coinSprite = createSprite({
            sprite: coinImg,
            context: obstacleContext,
            width: coinImg.width / 7,
            height: coinImg.height,
            rowNumber: 0,
            numberOfFrames: 6,
            loopTicksPerFrame: 8
        });

        var position = getRandomPositionInCanvas(coinSprite.width, coinSprite.height);

        var coinBody = createPhysicalBody({
            coordinates: { x: position.x, y: position.y },
            speed: { x: 0, y: 0 },
            harmful: false,
            width: coinSprite.width,
            height: coinSprite.height
        });

        allCoinsSprites.push(coinSprite);
        allCoinsBodies.push(coinBody);
    }

    var allHolesSprites = [];
    var allHolesBodies = [];

    for (var hole = 0; hole < numberOfHoles; hole++) {
        var holeSprite = createSprite({
            sprite: holeImg,
            context: obstacleContext,
            width: holeImg.width,
            height: holeImg.height,
            rowNumber: 0,
            numberOfFrames: 1,
            loopTicksPerFrame: 1
        });

        position = getRandomPositionInCanvas(holeSprite.width, holeSprite.height);
    
        var holeBody = createPhysicalBody({
            coordinates: { x: position.x, y: position.y },
            speed: { x: 0, y: 0 },
            harmful: true,
            width: holeSprite.width,
            height: holeSprite.height
        });

        allHolesSprites.push(holeSprite);
        allHolesBodies.push(holeBody);
    }

    function updateCoin() {
        for (coin = 0; coin < allCoinsBodies.length; coin++) {
            var currentCoin = allCoinsBodies[coin];
            if (!currentCoin.exists) {
                position = getRandomPositionInCanvas();
                currentCoin.exists = true;
                currentCoin.coordinates.x = position.x;
                currentCoin.coordinates.y = position.y;
            }
        }
    }

    function updateAll() {

        for (coin = 0; coin < allCoinsBodies.length; coin++) {
            var currentCoinBody = allCoinsBodies[coin];
            var lastCoinCoordinates = currentCoinBody.move(canvasDimensions);

            var currentCoinSprite = allCoinsSprites[coin];
            currentCoinSprite.render(lastCoinCoordinates, currentCoinBody.coordinates).update();
        }


        for (hole = 0; hole < allHolesBodies.length; hole++) {
            var currentHoleBody = allHolesBodies[hole];
            var lastHoleCoordinates = currentHoleBody.move(canvasDimensions);

            var currentHoleSprite = allHolesSprites[hole];
            currentHoleSprite.render(lastHoleCoordinates, currentHoleBody.coordinates).update();
        }

    }

    // TODO: Create deep copy of the objects
    return {
        allObstacles: allCoinsBodies.concat(allHolesBodies),
        updateCoin: updateCoin,
        updateAll: updateAll
    }
}