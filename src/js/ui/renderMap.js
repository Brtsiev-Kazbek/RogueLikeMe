import colors from './colors';

const EXPLORED_TILE_COLOR = colors.DARKER_BLUE;

const renderMap = (mapDisplay, level, entities, fovMap) => {
    mapDisplay.clear();

    for( let x = 0; x < level.width; x++ ) {
        for( let y = 0; y < level.height; y++ ) {
        const tile = level.tiles[`${x},${y}`];
        const isVisible = fovMap.indexOf(`${x},${y}`) !== -1;
        if( isVisible ) {
            mapDisplay.draw(x, y, tile.char, tile.color);
            tile.explored = true;
        } else {
            if( tile.explored ) {
            mapDisplay.draw(x, y, tile.char, EXPLORED_TILE_COLOR);
            }
        }
        }
    }

    for( const entity of entities ) {
        const isVisible = fovMap.indexOf(`${entity.x},${entity.y}`) !== -1;
        if( isVisible ) {
            mapDisplay.draw(entity.x, entity.y, entity.char, entity.color);
        }
    }
}

export default renderMap;