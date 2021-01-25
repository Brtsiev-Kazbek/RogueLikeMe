import colors from '../ui/colors';
import Entity from '../lib/Entity';
import Tile, {tileDict} from './Tile';
import * as ROT from 'rot-js';

const MAX_ENEMIES_PER_ROOM = 3;

export default class Level {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = this.initTiles();
      }

    initTiles() {
        let tiles = {};
        // for( let x = 0; x < this.width; x++ ) {
        //     for( let y = 0; y < this.height; y++ ) {
        //         tiles[`${x},${y}`] = new Tile( tileDict['dungeon wall'] );
        //     }
        // }

        
        let gen = new ROT.Map.Cellular(this.width, this.height)
        gen.randomize(.53)
        for(let i = 0; i < 3; i++) {
            gen.create((x, y, v) => {
                if(v) {
                    tiles[`${x},${y}`] = new Tile( tileDict['forest grass'] );
                } else {
                    tiles[`${x},${y}`] = new Tile( tileDict['forest tree'] );
                }
            })
        }
        gen.connect((x, y, v) => {
            if(!v) {
                tiles[`${x},${y}`] = new Tile( tileDict['forest grass'] );
                // this.addEnemiesToRoom(entities);
            } else {
                tiles[`${x},${y}`] = new Tile( tileDict['forest tree'] );
            }
            // console.log(`from ${x} to ${y}`)
        })

        // console.log(tiles)
        
    
        return tiles;
      }

      blocksMoveAt(x, y) {
        return this.tiles[`${x},${y}`].blocksMove;
    }

    addEnemiesToRoom(room, entities) {
        const numOfEnemies = randInt(0, MAX_ENEMIES_PER_ROOM);
      
        for( let i = 0; i < numOfEnemies; i++ ) {
          const x = randInt(room.x1 + 1, room.x2 - 1);
          const y = randInt(room.y1 + 1, room.y2 - 1);
          
          if(! entities.some( e => e.x === x && e.y === y ) ) {
            let enemy;
            if( randInt(1, 100) <= 80 ) {
              enemy = new Entity('orc', x, y, 'o', colors.DESATURATED_GREEN, true);
            } else {
              enemy = new Entity('troll', x, y, 'T', colors.DARKER_GREEN, true);
            }
            entities.push(enemy);
          }
        }
      }
}