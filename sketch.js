
let boardWidth;
let board;
let size;

function setup(){
    boardWidth = 10;
    size = 50;
    createCanvas(boardWidth * size, boardWidth * size);
    board = [];
    reset();
}

function reset(){
    board = [];
    for (let y = 0; y < boardWidth; y++){
        let row = [];
        for (let x = 0; x < boardWidth; x++){
            row.push(1 + floor(Math.random() * 5));
        }
        board.push(row);
    }
}

function drawBoard(){
    for (let y = 0; y < boardWidth; y++){
        for (let x = 0; x < boardWidth; x++){
            switch (board[y][x]){
                case 1:
                fill(225,0,0);
                break;
                case 2:
                fill(0,255,0);
                break;
                case 3:
                fill(0,0,255);
                break;
                case 4:
                fill(225,0,255);
                break;
                case 5:
                fill(0,225,255);
                break;
            }
            rect(x * size, y * size, size - 2, size - 2);
        }
    }
}

function draw(){
    background(0);
    drawBoard();
}