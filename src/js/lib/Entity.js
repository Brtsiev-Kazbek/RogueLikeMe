export default class Entity {
    constructor(options) {
        this.name = options.name;
        this.char = options.char;
        this.color = options.color;
        this.x = options.x;
        this.y = options.y;

    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    isSolid(x, y, map) {
        return map[`${x},${y}`].solid;
    }
}