let boardWidth;
let tiles;
let size;

let mouseCollision;
let selectedTile;

let debug;

function setup() {
    boardWidth = 8;
    size = 50;
    createCanvas(boardWidth * size, boardWidth * size);
    tiles = [];
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    selectedTile = null;
    debug = false;
    reset();
}

function reset() {
    createNewBoard();
    setupAdjacentTiles();
    setupNeighborCount();
}

function createNewBoard() {
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
}

function setupAdjacentTiles() {
    for (let y = 0; y < boardWidth; y++) {
        for (let x = 0; x < boardWidth; x++) {
            tiles[y][x].resetAdjacent();
            if (y - 1 >= 0) {
                tiles[y][x].addToAdjacent(tiles[y - 1][x]);
            }
            if (y + 1 < boardWidth) {
                tiles[y][x].addToAdjacent(tiles[y + 1][x]);
            }
            if (x - 1 >= 0) {
                tiles[y][x].addToAdjacent(tiles[y][x - 1]);
            }
            if (x + 1 < boardWidth) {
                tiles[y][x].addToAdjacent(tiles[y][x + 1]);
            }
        }
    }
}

function setupNeighborCount() {
    for (let y = 0; y < boardWidth; y++) {
        for (let x = 0; x < boardWidth; x++) {
            tiles[y][x].neighbors = calculateNeighborsOf(tiles[y][x]);
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
                    swapTileTypesOf(selectedTile, tiles[y][x]);
                    checkBoardAt(tiles[y][x]);
                    checkBoardAt(selectedTile); // ?
                    selectedTile = null;
                    break;
                }
            }
        }
    }
}

function swapTileTypesOf(selected, target) {
    if (!selected.adjacent.includes(target)) {
        return;
    }
    let typeCopy = selected.type;
    selected.type = target.type;
    target.type = typeCopy;
}

function checkBoardAt(target) {
    setupAdjacentTiles();
    setupNeighborCount();

    if (target.neighbors >= 3) {
        removeNeighborsOf(target);
    }

    shiftTilesDown();
    replaceRemovedTiles();

    setupAdjacentTiles();
    setupNeighborCount();
}


function calculateNeighborsOf(tile) {
    let total = 0;
    let stack = [];
    let visited = [];
    let current = null;
    stack.push(tile);
    visited.push(tile);
    while (stack.length > 0) {
        current = stack.pop();
        total++;
        for (let neighbor of current.adjacent) {
            if (!neighbor.remove && neighbor.type === current.type && !visited.includes(neighbor)) {
                stack.push(neighbor);
                visited.push(neighbor);
            }
        }
    }
    return total;
}

function removeNeighborsOf(tile) {
    let stack = [];
    let visited = [];
    let current = null;
    stack.push(tile);
    visited.push(tile);
    while (stack.length > 0) {
        current = stack.pop();
        current.remove = true;
        for (let neighbor of current.adjacent) {
            if (neighbor.type === current.type && !visited.includes(neighbor)) {
                stack.push(neighbor);
                visited.push(neighbor);
            }
        }
    }
}

function shiftTilesDown() {
    for (let x = 0; x < boardWidth; x++) {
        for (let y = boardWidth - 1; y >= 1; y--) {
            if (tiles[y][x].remove) {
                let target = tiles[y][x];
                let pivot = lowestValidTileInColumn(x, y);
                if (pivot != null) {
                    tiles[y][x] = new Tile(x, y, pivot.type);
                    tiles[y][x].remove = false;
                    tiles[y][x].neighbors = -1;
                    tiles[pivot.y][pivot.x] = new Tile(pivot.x, pivot.y, target.type);
                    tiles[pivot.y][pivot.x].remove = true;
                    tiles[pivot.y][pivot.x].neighbors = -1;
                }
            }
        }
    }
}

function replaceRemovedTiles() {
    for (let y = 0; y < boardWidth; y++) {
        for (let x = 0; x < boardWidth; x++) {
            if (tiles[y][x].remove) {
                tiles[y][x] = new Tile(x, y, 1 + floor(Math.random() * 5));
                tiles[y][x].remove = false;
            }
        }
    }
}

function lowestValidTileInColumn(x, y) {
    for (let i = y; i >= 0; i--) {
        if (!tiles[i][x].remove) {
            return tiles[i][x];
        }
    }
    return null;
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