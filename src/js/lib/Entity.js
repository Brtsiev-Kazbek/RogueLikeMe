export default class Entity {
    constructor(name, x, y, char, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.char = char; 
        this.color = color;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}