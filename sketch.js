let boardWidth;
let board;
let tiles;
let size;

let mouseCollision;
let selectedTile;

function setup() {
    boardWidth = 8;
    size = 50;
    createCanvas(boardWidth * size, boardWidth * size);
    board = [];
    tiles = [];
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    selectedTile = null;
    reset();
}

function reset() {
    board = [];
    tiles = [];
    let row = [];
    let random = 0;
    for (let y = 0; y < boardWidth; y++) {
        row = [];
        for (let x = 0; x < boardWidth; x++) {
            random = 1 + floor(Math.random() * 5);
            row.push();
            tiles.push(new Tile(x, y, random));
        }
        board.push(row);
    }
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    for (let tile of tiles) {
        if (this.mouseCollision.intersects(tile.collisionRectanlge)) {
            if (selectedTile == null) {
                selectedTile = tile;
            } else {
                swap(selectedTile, tile);
                selectedTile = null;
                break;
            }
        }
    }
}

function swap(selected, target) {
    board[selected.y][selected.x] = target.type;
    board[target.y][target.x] = selected.type;
    let location = createVector(selected.x, selected.y);
    selected.setLocation(target.x, target.y);
    target.setLocation(location.x, location.y);
}

function drawBoard() {
    for (let tile of tiles) {
        tile.show();
    }
}

function draw() {
    background(0);
    drawBoard();
    if (selectedTile != null){
        fill(255);
        rect(selectedTile.x * size ,selectedTile.y * size ,size - 5, size -5);
    }
}