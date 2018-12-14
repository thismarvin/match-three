class Tile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.adjacent = [];
        this.neighbors = 0;
        this.remove = false;
        this.collisionRectanlge = new Rectangle(this.x * size, this.y * size, size, size);
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
        this.collisionRectanlge.setLocation(this.x * size, this.y * size);
    }

    resetAdjacent(){
        this.adjacent = [];
    }
    addToAdjacent(tile) {
        this.adjacent.push(tile);
    }

    show() {
        switch (this.type) {
            case 1:
                fill(225, 0, 0);
                break;
            case 2:
                fill(0, 255, 0);
                break;
            case 3:
                fill(0, 0, 255);
                break;
            case 4:
                fill(225, 0, 255);
                break;
            case 5:
                fill(0, 225, 255);
                break;
        }
        if (!this.remove){
            ellipse(this.x * size + size / 2, this.y * size + size / 2, size - 8, size - 8);
        }

        // Debug neighbors
        if (debug){
            fill (255);
            textSize(20);
            textFont('Georgia');
            textAlign(CENTER);
            text(this.neighbors, this.x * size + size / 2, this.y * size + size / 2 + 5);
        }
    }
}