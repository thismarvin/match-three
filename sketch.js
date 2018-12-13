
let boardWidth;
let board;
let tiles;
let size;

function setup(){
    boardWidth = 8;
    size = 50;
    createCanvas(boardWidth * size, boardWidth * size);
    board = [];
    tiles = [];
    reset();
}

function reset(){
    board = [];
    tiles = [];
    let row = [];
    let random = 0;
    for (let y = 0; y < boardWidth; y++){
        row = [];
        for (let x = 0; x < boardWidth; x++){
            random = 1 + floor(Math.random() * 5);
            row.push();
            tiles.push(new Tile(x * size, y * size, random));
        }
        board.push(row);
    }
}

function drawBoard(){
    for (let tile of tiles){
        tile.show();
    }
}

function draw(){
    background(0);
    drawBoard();
}