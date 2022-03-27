const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const canvasW = 1080;
const canvasH = 800;

let speed = 120;

let p1X = 80;
let p1Y = canvasH / 2;
let p2X = 1000;
let p2Y = canvasH / 2;

let ballX = canvasW / 2;
let ballY = canvasH / 2;
let ballXVel = 3;
let ballYVel = 3;

let p1score = 0;
let p2score = 0;

// game loop
function drawGame() {
    clearScreen();
    drawPlayerOne();
    drawPlayerTwo();
    movePlayer();
    checkCollision();
    moveBall();
    drawBall();
    scoreCounter(p1score, p2score);
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasW, canvasH);
}

function drawPlayerOne() {
    ctx.fillStyle = 'white';
    ctx.fillRect(p1X, p1Y, 10, 100);
}

function drawPlayerTwo() {
    ctx.fillStyle = 'white';
    ctx.fillRect(p2X, p2Y, 10, 100);
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, 15, 15);
}

function moveBall() {
    ballX += ballXVel;
    ballY += ballYVel;
}

function scoreCounter(p1score, p2score) {
    ctx.fillStyle = 'white';
    ctx.font = '50px san-serif';
    ctx.fillText(p1score, 20, 50)
    ctx.fillText(p2score, 1025, 50)
}

function movePlayer() {
    if (handler.keys.indexOf('ArrowUp') > -1) {
        p2Y -= 6;
    } else {
        p2Y += 0;
    }

    if (handler.keys.indexOf('ArrowDown') > -1) {
        p2Y += 6;
    } else {
        p2Y += 0;
    }
    
    if (handler.keys.indexOf('w') > -1) {
        p1Y -= 6;
    } else {
        p1Y += 0;
    }
    
    if (handler.keys.indexOf('s') > -1) {
        p1Y += 6;
    } else {
        p1Y += 0;
    }
}

function checkCollision() {
    // ball/paddle collision
    if (((p1Y + 100) < (ballY)) || (p1Y > (ballY + 15)) || ((p1X + 10) < ballX) || (p1X > (ballX + 15))){
    } else {
        ballXVel *= -1.1
    }
    if (((p2Y + 100) < (ballY)) || (p2Y > (ballY + 15)) || ((p2X + 10) < ballX) || (p2X > (ballX + 15))){
    } else {
        ballXVel *= -1.1
    }

    // bounds collision
    if (ballX >= canvasW) {
        ballX = 500;
        ballY = 500;
        ballXVel = 3;
        ballYVel = 3;
        p1score += 1;
    } else if (ballY >= canvasH - 15) {
        ballYVel *= -1
    } else if (ballX <= 0) {
        ballX = 500;
        ballY = 500;
        ballXVel = 3;
        ballYVel = 3;
        p2score += 1;
    } else if (ballY <= 0) {
        ballYVel *= -1
    }

    // paddle/wall collision
    if (p1Y <= 0) {
        p1Y = 0;
        p1Y += 0;
    } else if (p1Y >= canvasH - 100) {
        p1Y = canvasH - 100;
        p1Y += 0;
    }
    if (p2Y <= 0) {
        p2Y = 0;
        p2Y += 0;
    } else if (p2Y >= canvasH - 100) {
        p2Y = canvasH - 100;
        p2Y += 0;
    }
}

class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'w' ||
                    e.key === 's')
                    && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', e => {
            if (   e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'w' ||
                    e.key === 's'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
                }
        });
    }
}

const handler = new InputHandler();
drawGame();