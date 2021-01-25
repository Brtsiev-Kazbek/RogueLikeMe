import * as ROT from 'rot-js'
import options from './options'
import colors from '../ui/colors'
import renderMap from '../ui/renderMap'
import Entity from './Entity'
import Player from './Player'
import Level from '../level/Level';
import {initFovComputer, computeFov} from '../lib/fov';


export default class Engine {
    constructor() {
        // Инициализация дисплея
        this.mapDisplay = new ROT.Display({
            width: options.MAP_WIDTH,
            height: options.MAP_HEIGHT,
            fontFamily: options.fontFamily,
        });

        // Монтирование дисплея
        document.querySelector('.canvas-wrapper').appendChild(this.mapDisplay.getContainer());

        // Hello World!
        // this.mapDisplay.drawText(0, 0, "Добро пожаловать в RogueLikeMe!####...")

        // Инициализация Игрока
        const playerX = Math.floor(options.MAP_WIDTH / 2) - 1;
        const playerY = Math.floor(options.MAP_HEIGHT / 2) - 1;

        this.player = new Player(this.update, 'Player', playerX, playerY, '@', colors.WHITE);

        this.entities = [this.player];
        this.level = new Level(options.MAP_WIDTH, options.MAP_HEIGHT);
        this.fov = {};
        this.fov.radius = 8;
        initFovComputer(this.level);
        this.fov.map = computeFov(this.player.x, this.player.y, this.fov.radius);
        this.fov.needsRecompute = true;
        this.update();
    }

    update = (action = {}) => {
        if('PLAYER_MOVE' in action) {
            
            const dx = action.PLAYER_MOVE[0];
            const dy = action.PLAYER_MOVE[1];
            const destinationX = this.player.x + dx;
            const destinationY = this.player.y + dy;

            if(! this.level.blocksMoveAt(destinationX, destinationY) ) {
                this.player.move(dx, dy);
                this.fov.needsRecompute = true;
            }

            if( this.fov.needsRecompute ) {
                this.fov.map = computeFov(this.player.x, this.player.y, this.fov.radius);
            }
        }

        renderMap( this.mapDisplay, this.level, this.entities, this.fov.map );
    }

}
