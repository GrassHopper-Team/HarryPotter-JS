function createObstacles(options) {
    'use strict';

    const obstacleCanvas = document.querySelector('#obstacle-canvas'),
        obstacleContext = obstacleCanvas.getContext('2d'),
        boltCanvas = document.querySelector('#bolt-canvas'),
        boltContext = boltCanvas.getContext('2d');
        boltCanvas.style.display = 'block';

    var canvasDimensions = options.canvasDimensions;
    var numberOfCoins = options.numberOfCoins || 5;
    var numberOfHoles = options.numberOfHoles || 5;
    var harryBody = options.harry;

    obstacleCanvas.width = canvasDimensions.x;
    obstacleCanvas.height = canvasDimensions.y;
    boltCanvas.width = canvasDimensions.x;
    boltCanvas.height = canvasDimensions.y;

    const coinImg = document.querySelector('#coin-sprite'),
        holeImg = document.querySelector('#hole-sprite'),
        boltImg = document.querySelector('#bolt-sprite');

    const coinWidth = coinImg.width / 7,
        coinHeight = coinImg.height,
        boltFrames = 4,
        boltloopsPerFrame = 3,
        boltWidth = boltImg.width / boltFrames,
        holeFrames = 0,
        coinFrames = 6,
        coinLoopPerFrame = 4,
        holeLoopsPerFrame = 0,
        loopsPerTick = 50;

    let loopsCount = 0;
    obstacleCanvas.style.display = 'block'; /// TODO: MAKE through MAIN and CSS

    let allCoinsSprites = [];
    let allCoinsBodies = [];

    let allHolesSprites = [];
    let allHolesBodies = [];

    var boltSprite = createSprite({
        sprite: boltImg,
        context: boltContext,
        width: boltWidth,
        height: boltImg.height,
        rowNumber: 0,
        numberOfFrames: boltFrames,
        loopTicksPerFrame: boltloopsPerFrame
    });

    const boltInitialX = getRandomPositionInCanvas(boltSprite.width, boltSprite.height).x,
        boltInitialY = 0;

    var boltBody = createPhysicalBody({
        coordinates: { x: boltInitialX, y: boltInitialY },
        speed: { x: 0, y: 0 },
        harmful: true,
        width: boltSprite.width,
        height: boltImg.height
    });

    createCoins();
    createHoles();
    updateHoles();

    function createHoles() {
        for (let hole = 0; hole < numberOfHoles; hole++) {
            let holeSprite = createSprite({
                sprite: holeImg,
                context: obstacleContext,
                width: holeImg.width,
                height: holeImg.height,
                rowNumber: 0,
                numberOfFrames: holeFrames,
                loopTicksPerFrame: holeLoopsPerFrame
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
    }

    function createCoins() {
        for (let coin = 0; coin < numberOfCoins; coin++) {
            let coinSprite = createSprite({
                sprite: coinImg,
                context: obstacleContext,
                width: coinWidth,
                height: coinHeight,
                rowNumber: 0,
                numberOfFrames: coinFrames,
                loopTicksPerFrame: coinLoopPerFrame
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
    }

    function updateAll() {
        updateAllCoins();
        updateBolt();
    }

    function updateAllCoins() {
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

    function updateHoles() {
        for (let hole = 0; hole < allHolesBodies.length; hole++) {
            let currentHoleBody = allHolesBodies[hole];
            let lastHoleCoordinates = currentHoleBody.move(canvasDimensions);

            let currentHoleSprite = allHolesSprites[hole];
            currentHoleSprite.render(lastHoleCoordinates, currentHoleBody.coordinates).update();
        }
    }

    function updateBolt() {
        var lastBoltCoordinates = boltBody.move(canvasDimensions);

        if (loopsCount / loopsPerTick > 1) {
            let lastBoltCoordinates = boltBody.coordinates;

            if (boltBody.coordinates.x + boltWidth > canvasDimensions.x - boltWidth) {
                boltBody.coordinates.x = 0;
            }
            else {
                boltBody.coordinates.x += boltWidth;
            }
            loopsCount = 0;
        }

        boltSprite.render(lastBoltCoordinates, boltBody.coordinates).update();
        loopsCount++;
    }

    function checkIfObstacleAlreadyThere(body) {
        let allBodies = allCoinsBodies.concat(allHolesBodies);

        for (let i = 0; i < allBodies.length; i++) {
            let currentBody = allBodies[i];
            if (currentBody !== body && (currentBody.collidesWith(body) || harryBody.collidesWith(body))) {
                return true;
            }
        }

        return false;
    }

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

    // TODO: Create deep copy of the objects
    return {
        allObstacles: allCoinsBodies.concat(allHolesBodies).concat(boltBody),
        updateAll: updateAll
    }
}