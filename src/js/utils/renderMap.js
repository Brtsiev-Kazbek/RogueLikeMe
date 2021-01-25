import options from "../options"

const renderMap = (mapDisplay, map, entities) => {
    for(let x = 0; x < options.WIDTH; x++) {
        for(let y = 0; y < options.HEIGHT; y++) {
            let item = map[`${x},${y}`];
            mapDisplay.draw(x, y, item.char, item.color);
        }
    }

    for(let entity of entities) {
        mapDisplay.draw(entity.x, entity.y, entity.char, entity.color);
    }
}

export default renderMap;