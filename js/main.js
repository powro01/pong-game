const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 400;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ballSize = 20;

let ballX = canvasWidth / 2 - ballSize / 2;
let ballY = canvasHeight / 2 - ballSize / 2;

const paddelWidth = 20;
const paddelHeight = 100;

const playerX = 70;
const aiX = canvasWidth - 70 + paddelWidth;

let playerPosition = canvasHeight / 2 - paddelHeight / 2;
let aiPosition = canvasHeight / 2 - paddelHeight / 2;

let ballSpeedX = 4;
let ballSpeedY = 4;

let playerGateHeight = 100;
const playerGateWidth = 15;
const playerGateY = canvasHeight / 2 - playerGateHeight / 2;

const playerPoints = document.getElementById('playerPoints');
const aiPoints = document.getElementById('aiPoints');

let playerScore = 0;
let aiScore = 0;


function player() {
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(playerX, playerPosition, paddelWidth, paddelHeight);
}

function ai() {
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(aiX, aiPosition, paddelWidth, paddelHeight);
}

function table() {
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#95a5a6';
    let centerLineWidth = 5;
    let centerLineHeigth = 35;

    for (let i = 0; i < canvasHeight; i += 50) {
        ctx.fillRect(canvasWidth / 2 - centerLineWidth / 2, i + 7.5, centerLineWidth, centerLineHeigth);
    }
}

function gates() {
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(0, 0, playerGateWidth, canvasHeight);
    ctx.fillRect(canvasWidth - playerGateWidth, 0, playerGateWidth, canvasHeight)
}

function ball() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvasHeight - ballSize) {
        ballSpeedY *= -1;
    }

    if (ballX <= 0 || ballX >= canvasWidth - ballSize) {
        ballSpeedX *= -1;
    }

    if (ballX <= playerX + paddelWidth && ballX > playerX - paddelWidth && ballY > playerPosition && ballY < playerPosition + paddelHeight) {
        ballSpeedX *= -1;
    }

    if (ballX <= 0) {
        aiScore++;
        aiPoints.innerText = aiScore;
    }

    if (ballX + ballSize >= canvasWidth) {
        playerScore++;
        playerPoints.innerText = playerScore;
    }

}



canvas.addEventListener('mousemove', function(e) {

    playerPosition = e.clientY - canvas.offsetTop - (paddelHeight / 2);

});


function init() {
    table();
    ball();
    gates();
    player();
    ai();
}

setInterval(init, 1000 / 60);