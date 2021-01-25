import * as ROT from 'rot-js';
import colors from '../data/colors';
import options from '../options'
import renderMap from '../utils/renderMap';
import Entity from './Entity';
import MapGenerator from './MapGenerator'
import Player from './Player';

export default class Engine {
    constructor() {

        this.mapDisplay = new ROT.Display({
            width: options.WIDTH,
            height: options.HEIGHT,
            fontFamily: options.FONT,
            fontSize: 18
        })

        document.querySelector('.canvas-wrapper').appendChild(this.mapDisplay.getContainer())
        const generator = new MapGenerator({
            name: 'Some Forest',
            type: 'Forest',
            width: options.WIDTH,
            height: options.HEIGHT
        })
        this.map = generator.generate(2)
        this.player = new Player({name: 'Player', char: '@', color: colors.WHITE, x: 0, y: 0}, this.update)
        this.entities = [this.player,
                        new Entity({name: 'Orc', char: 'r', color: colors.GREEN, x: 21, y: 11})]
        this.update()

    }

    update = (action = {}) => {

        if( 'PLAYER_MOVE' in action ) {
            const dx = action.PLAYER_MOVE[0];
            const dy = action.PLAYER_MOVE[1];

            if(!this.player.isSolid(dx + this.player.x, dy+this.player.y, this.map)) {
                this.player.move(dx, dy)
            }

            
          }
        
        renderMap(this.mapDisplay, this.map, this.entities)
    }

}