function createBackground(dimensions) {

    let canvas = document.getElementById('background-canvas'),
        context = canvas.getContext('2d'),
        backgroundIMG = document.getElementById('canvas-background-img'),
        frameIMG = document.getElementById('canvas-background-frame');
        canvas.style.display = 'block';
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let pattern = context.createPattern(backgroundIMG, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(frameIMG, 0, 0, canvas.width, canvas.height);

    
}
