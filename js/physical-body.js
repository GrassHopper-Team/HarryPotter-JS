function createPhysicalBody(options) {
    'use strict';

    function move(canvasDimensions) {
        let lastCoordinates = { x: this.coordinates.x, y: this.coordinates.y };

        let newX = this.coordinates.x + this.speed.x,
            newY = this.coordinates.y + this.speed.y;

        let maxX = canvasDimensions.x - this.width;
        let maxY = canvasDimensions.y - this.height;

        if (newX < 0 || newX > maxX ||
            newY < 0 || newY > maxY) {
            return lastCoordinates;
        }

        this.coordinates.x += this.speed.x;
        this.coordinates.y += this.speed.y;

        return lastCoordinates;
    }

    function collidesWith(otherPhysicalBody) {
        let x1 = this.coordinates.x + this.width / 2,
            y1 = this.coordinates.y + this.height / 2,
            x2 = otherPhysicalBody.coordinates.x + otherPhysicalBody.width / 2,
            y2 = otherPhysicalBody.coordinates.y + otherPhysicalBody.height / 2,
            distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        return distance <= (this.radius + otherPhysicalBody.radius);
    }

    let physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed || { x: 0, y: 0 },
        bolt: options.bolt || false,
        exists: true,
        harmful: options.harmful || false,
        height: options.height,
        width: options.width,
        radius: (options.width + options.height) / 4,
        move: move,
        collidesWith: collidesWith
    };

    return physicalBody;
}