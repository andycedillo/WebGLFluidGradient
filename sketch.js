//p5.js shader basic structure ref from https://www.openprocessing.org/sketch/920144

let theShader;
let c
let X = 1;
let Y = 2;
let b1, b2, c1, c2;


function preload() {
    theShader = new p5.Shader(this.renderer, vert, frag)
    newFont = loadFont('fonts/Robot_Font.otf');

}

function setup() {
    c = createCanvas(1920, 1080, WEBGL);
    //c = createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke()
    background(0);
    //Colors 

}

function draw() {

    // resize();

    textStyle(BOLD);
    textFont(newFont);
    textSize(150);
    fill(0);
    //stroke(255);
    text('Hello World', -300, 0);


    shader(theShader)
    theShader.setUniform('u_resolution', [width / 1920, height / 1080])
    theShader.setUniform('u_time', millis() / 1080)
    theShader.setUniform('u_pmouse', [pmouseX / width, pmouseY / height])
    theShader.setUniform('u_mouse', [mouseX / width, mouseY / height])
    theShader.setUniform('tex0', c)
        // rotateY(frameCount/100)
    rect(-width / 2, -height / 2, width, height)
        // ellipse(mouseX, mouseY, 20, 20);

}

function resize() {
    if (width != windowWidth || height != windowHeight) {
        resizeCanvas(windowWidth, windowHeight);
        //canvas.width = canvas.clientWidth;
        //canvas.height = canvas.clientHeight;
        //initFramebuffers(); //console.log("resize");
    }
}