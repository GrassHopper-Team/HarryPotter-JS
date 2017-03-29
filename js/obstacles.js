function createObstacles(canvasDimensions, numberOfCoins, numberOfHoles) {
    'use strict';

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomPositionInCanvas(width, height) {
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

    const obstacleCanvas = document.getElementById('obstacle-canvas'),
        obstacleContext = obstacleCanvas.getContext('2d'),
        coinImg = document.getElementById('coin-sprite'),
        holeImg = document.getElementById('hole-sprite'),
        coinWidth = coinImg.width / 7,
        coinHeight = coinImg.height;

    obstacleCanvas.width = canvasDimensions.x;
    obstacleCanvas.height = canvasDimensions.y;

    numberOfCoins = numberOfCoins || 5;
    numberOfHoles = numberOfHoles || 5;

    let allCoinsSprites = [];
    let allCoinsBodies = [];

    let allHolesSprites = [];
    let allHolesBodies = [];

    for (let coin = 0; coin < numberOfCoins; coin++) {
        let coinSprite = createSprite({
            sprite: coinImg,
            context: obstacleContext,
            width: coinWidth,
            height: coinHeight,
            rowNumber: 0,
            numberOfFrames: 6,
            loopTicksPerFrame: 8
        });

        let position = getRandomPositionInCanvas(coinSprite.width, coinSprite.height);

        let coinBody = createPhysicalBody({
            coordinates: { x: position.x, y: position.y },
            speed: { x: 0, y: 0 },
            harmful: false,
            width: coinWidth,
            height: coinHeight
        });

        while (checkIfObstacleAlreadyThere(coinBody)) {
            position = getRandomPositionInCanvas(coinSprite.width, coinSprite.height)
            coinBody.coordinates.x = position.x;
            coinBody.coordinates.y = position.y;
        }

        allCoinsSprites.push(coinSprite);
        allCoinsBodies.push(coinBody);
    }

    for (let hole = 0; hole < numberOfHoles; hole++) {
        let holeSprite = createSprite({
            sprite: holeImg,
            context: obstacleContext,
            width: holeImg.width,
            height: holeImg.height,
            rowNumber: 0,
            numberOfFrames: 1,
            loopTicksPerFrame: 1
        });

        let position = getRandomPositionInCanvas(holeSprite.width, holeSprite.height);

        let holeBody = createPhysicalBody({
            coordinates: { x: position.x, y: position.y },
            speed: { x: 0, y: 0 },
            harmful: true,
            width: holeSprite.width,
            height: holeSprite.height
        });

        while (checkIfObstacleAlreadyThere(holeBody)) {
            position = getRandomPositionInCanvas(holeSprite.width, holeSprite.height)
            holeBody.coordinates.x = position.x;
            holeBody.coordinates.y = position.y;
        }

        allHolesSprites.push(holeSprite);
        allHolesBodies.push(holeBody);
    }


    for (let hole = 0; hole < allHolesBodies.length; hole++) {
        let currentHoleBody = allHolesBodies[hole];
        let lastHoleCoordinates = currentHoleBody.move(canvasDimensions);

        let currentHoleSprite = allHolesSprites[hole];
        currentHoleSprite.render(lastHoleCoordinates, currentHoleBody.coordinates).update();
    }

    function updateAll() {
        for (let coin = 0; coin < allCoinsBodies.length; coin++) {
            let currentCoinBody = allCoinsBodies[coin];
            let lastCoinCoordinates = currentCoinBody.move(canvasDimensions);

            if (!currentCoinBody.exists) {
                lastCoinCoordinates = { x: currentCoinBody.coordinates.x, y: currentCoinBody.coordinates.y };
                currentCoinBody.exists = true;

                let position = getRandomPositionInCanvas(coinWidth, coinHeight);
                currentCoinBody.coordinates.x = position.x;
                currentCoinBody.coordinates.y = position.y;

                while (checkIfObstacleAlreadyThere(currentCoinBody)) {
                    position = getRandomPositionInCanvas(coinWidth, coinHeight);
                    currentCoinBody.coordinates.x = position.x;
                    currentCoinBody.coordinates.y = position.y;
                }
            }

            let currentCoinSprite = allCoinsSprites[coin];
            currentCoinSprite.render(lastCoinCoordinates, currentCoinBody.coordinates).update();
        }
    }

    function checkIfObstacleAlreadyThere(body) {
        let allBodies = allCoinsBodies.concat(allHolesBodies);

        for (let i = 0; i < allBodies.length; i++) {
            let currentBody = allBodies[i];
            if (currentBody !== body && currentBody.collidesWith(body)) {
                return true;
            }
        }

        return false;
    }

    // TODO: Create deep copy of the objects
    return {
        allObstacles: allCoinsBodies.concat(allHolesBodies),
        updateAll: updateAll
    }
}