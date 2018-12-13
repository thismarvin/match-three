class Tile {
    constructor(x,y, type){
        this.x = x; 
        this.y = y;
        this.type =type;
        this.neighbors =  0;
        this.remove = false;
    }

    show(){
        switch (this.type){
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
        rect(this.x, this.y, size - 2, size - 2);
    }
}