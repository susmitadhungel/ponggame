const gameBoard = document.querySelector("#gameBoard");
const conText = gameBoard.getContext("2d");
const scoreText = document.querySelector(".scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

// requarment to make pong game 

const boardBackground = "black";
const player1Color = "red";
const player2Color = "blue";
const playerBorder = "black";
const ballColor = "yellow";
const ballBoderColor = "black";
const ballRadius = 12.5;
const playerSpeed = 50;
let pause = false;
let intervalID;
let ballSpeed = 0;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let player1Score = 0;
let player2Score = 0;

let player1 = {

    width: 20,
    height: 105,
    x: 0,
    y: 0
};

let player2 = {

    width: 20, 
    height: 105,
    x: gameWidth - 20,
    y: gameHeight - 105
}

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
updateScore();

function gameStart() {

    nextTick();
    createBall();
};

function nextTick() {

        intervalID = setTimeout(() => {

            clearBoard();
            drawPlayer();
            moveBall();
            drawBall(ballX, ballY);
            cleckCollision();
            nextTick();
            displayGameWinner();
            drawNet();
        }, 10)
};

function clearBoard() {

    conText.fillStyle = boardBackground;
    conText.fillRect(0, 0, gameWidth, gameHeight);
};

function drawPlayer() {

    conText.strokeStyle = playerBorder;

    conText.fillStyle = player1Color;
    conText.fillRect(player1.x, player1.y, player1.width, player1.height);
    conText.strokeRect(player1.x, player1.y, player1.width, player1.height);

    conText.fillStyle = player2Color;
    conText.fillRect(player2.x, player2.y, player2.width, player2.height);
    conText.strokeRect(player2.x, player2.y, player2.width, player2.height);
};

function createBall() {
    ballSpeed = 5;

    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1;
    }

    else {
        ballXDirection = -1;
    }

    if (Math.round(Math.random()) == 1) {
        ballYDirection = 1;
    }

    else {
        ballYDirection = -1;
    }

    ballX = gameWidth / 2;
    ballY = gameHeight / 2;

    drawBall(ballX, ballY);
};

function moveBall() {

    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};

function drawBall(ballX, ballY) {
    conText.fillStyle = ballColor;
    conText.strokeStyle = ballBoderColor;
    conText.lineWidth = 2;
    conText.beginPath();
    conText.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    conText.stroke();
    conText.fill();
};

function cleckCollision() {

    if (ballY <= 0 + ballRadius) {     //yes le chai top kati samma lane vane ra define garxa
        ballYDirection *= -1;
    }

    if (ballY >= gameHeight - ballRadius) {   //yes le chai bottom kati samma lane vane ra define garxa
        ballYDirection *= -1;
    }

    if (ballX <= 0) {       //yes ma chai right gayo vane score 1 le update garxa ani new ball create garxa
        player2Score += 1;
        updateScore();
        createBall();
        return;
    }

    if (ballX >= gameWidth) {    // yes ma chai left gayo vane score 1 le update garxa ani new ball create garxa
        player1Score += 1;
        updateScore();
        createBall();
        return;
    }

    if (ballX <= (player1.x + player1.width + ballRadius)) {      // yo chai lai baus garna lai use hunxa player1 one bata
        if (ballY > player1.y && ballY < player1.y + player1.height) {
            ballX = (player1.x + player1.width) + ballRadius; // if ball gets stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }

    if (ballX >= (player2.x - ballRadius)) {     // yo chai lai baus garna lai use hunxa player2 one bata
        if (ballY > player2.y && ballY < player2.y + player2.height) {
            ballX = player2.x - ballRadius; // if ball gets stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
};

function clikcWinner() {

    if (player1Score >= 10) {
        resetGame();
        return `player1 You win!`; 
    }

    else if (player2Score >= 10) {
        resetGame();
        return `player2 You win!`;
    }
    
    return ""; // No winner yet
};

function displayGameWinner() {

    const winnerMessage = clikcWinner();
    if(winnerMessage !== ""){
    conText.font = "50px MV Boli";
    conText.textAlign = "center";
    conText.fillStyle = "white";
    conText.fillText(winnerMessage, gameWidth / 2, gameHeight / 2);
    }
};

function changeDirection(event) {

    const keyPressed = event.keyCode;
    const player1Up = 87;
    const player1Down = 83;
    const player2Up = 38;
    const player2Down = 40;

    switch (keyPressed) {

        case (player1Up):
            if (player1.y > 0) {
                player1.y -= playerSpeed;
            }
            break;

        case (player1Down):
            if (player1.y < gameHeight - player1.height) {
                player1.y += playerSpeed;
            }
            break;

        case (player2Up):
            if (player2.y > 0) {
                player2.y -= playerSpeed;
            }
            break;

        case (player2Down):
            if (player2.y < gameHeight - player2.height) {
                player2.y += playerSpeed;
            }
            break;
    }
};

function updateScore() {

    scoreText.textContent = `${player1Score} : ${player2Score}`;
    // displayGameWinner();
};

function resetGame() {
    
    player1Score = 0;
    player2Score = 0;

    player1 = {

        width: 20,
        height: 105,
        marginTop: 10,
        x: 0,
        y: 0
    };

    player2 = {

        width: 20,
        height: 105,
        x: gameWidth - 20,
        y: gameHeight - 105
    }

    updateScore();

};