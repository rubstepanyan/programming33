class boomb extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 10;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell && this.multiply >= 15) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;

        var newGr = new  boomb(newX, newY);
        grassBoomb.push(newGr);
        this.multiply = 0;
    }
}

move() {
    this.energy--
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);
    if (newCell && this.energy >= 0) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    } else {
        if (this.energy < 0) {
            this.die()
        }
    }
}

eat() {
    var emptyCells = this.chooseCell(6);
    var newCell = random(emptyCells);
    if (newCell) {
        this.energy--
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in grassWall) {
            if (newX ==  grassWall[i].x && newY == grassWall[i].y) {
                grassWall.splice(i, 1);
                break;
            }
        }

    } else {
        this.move()
    }
}

die() {
    matrix[this.y][this.x] = 0
    for (var i in grassBoomb) {
        if (this.x == grassBoomb[i].x && this.y == grassBoomb[i].y) {
            grassBoomb.splice(i, 1);
            break;
        }
    }
}
}