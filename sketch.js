let boardWidth;
let tiles;
let size;

let mouseCollision;
let selectedTile;

function setup() {
    boardWidth = 8;
    size = 50;
    createCanvas(boardWidth * size, boardWidth * size);
    tiles = [];
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    selectedTile = null;
    reset();
}

function reset() {
    tiles = [];
    let row = [];
    let random = 0;
    for (let y = 0; y < boardWidth; y++) {
        row = [];
        for (let x = 0; x < boardWidth; x++) {
            random = 1 + floor(Math.random() * 5);
            row.push(new Tile(x, y, random));
        }
        tiles.push(row);
    }

    for (let y = 0; y < boardWidth; y++) {
        for (let x = 0; x < boardWidth; x++) {
            if (y - 1 >= 0){
                tiles[y][x].addToAdjacent(tiles[y - 1][x]);
            }
            if (y + 1 < boardWidth){
                tiles[y][x].addToAdjacent(tiles[y + 1][x]);
            }
            if (x - 1 >= 0){
                tiles[y][x].addToAdjacent(tiles[y][x - 1]);
            }
            if (x + 1 < boardWidth){
                tiles[y][x].addToAdjacent(tiles[y][x + 1]);
            }
        }
    }
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    for (let y = 0; y < boardWidth; y++) {
        for (let x = 0; x < boardWidth; x++) {
            if (this.mouseCollision.intersects(tiles[y][x].collisionRectanlge)) {
                if (selectedTile == null) {
                    selectedTile = tiles[y][x];
                    break;
                } else {
                    swap(selectedTile, tiles[y][x]);
                    selectedTile = null;
                    break;
                }
            }
        }
    }
}

function swap(selected, target) {
    if (!selected.adjacent.includes(target)){
        return;
    }
    let typeCopy = selected.type;
    selected.type = target.type;
    target.type = typeCopy;
}

function drawBoard() {
    for (let y = 0; y < boardWidth; y++) {
        for (let x = 0; x < boardWidth; x++) {
            tiles[y][x].show();
        }
    }
}

function draw() {
    background(0);
    if (selectedTile != null) {
        fill(255);
        ellipse(selectedTile.x * size + size / 2, selectedTile.y * size + size / 2, size, size);
    }
    drawBoard();

}