function createSprite(options) {

    'use strict';

    function render(clearCoordinates, drawCoordinates) {

        this.context.clearRect(
            clearCoordinates.x,
            clearCoordinates.y,
            this.width,
            this.height
        );


        this.context.drawImage(
            this.sprite,
            this.frameIndex * this.width,
            this.rowNumber * this.height,
            this.width,
            this.height,
            drawCoordinates.x,
            drawCoordinates.y,
            this.width,
            this.height
        );

        return this;
    }

    function update() {

        this.loopTicksCount += 1;

        if (this.loopTicksCount >= this.loopTicksPerFrame) {
            this.loopTicksCount = 0;

            this.frameIndex += 1;
            if (this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
        }

        return this;
    }

    var sprite = {
        sprite: options.sprite,
        context: options.context,
        width: options.width,
        height: options.height,
        rowNumber: options.rowNumber,
        numberOfFrames: options.numberOfFrames,
        loopTicksPerFrame: options.loopTicksPerFrame,
        frameIndex: 0,
        loopTicksCount: 0,
        render: render,
        update: update
    };

    return sprite;
}