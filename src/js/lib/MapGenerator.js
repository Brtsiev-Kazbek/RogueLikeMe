import * as ROT from 'rot-js'
import options from '../options';
import Tile from './Tile';
import tiles from '../data/tiles'

export default class MapGenerator {
    constructor(options) {
        this.name = options.name;
        this.type = options.type;
        this.width = options.width;
        this.height = options.height;
        this.map = {};
    }

    generate(cycles = 1) {
        let generator = new ROT.Map.Cellular(options.WIDTH, options.HEIGHT)
        generator.randomize(0.5)

        for(let cycle = 0; cycle < cycles; cycle++) {
            generator.create((x, y, value) => {
                if(value) {
                    this.map[`${x},${y}`] = '#'
                } else {
                    this.map[`${x},${y}`] = '.'
                }
            })
       }
       generator.connect((x, y, value) => {
        if(value) {
            this.map[`${x},${y}`] = new Tile( tiles['stone wall'] )
        } else {
            this.map[`${x},${y}`] = new Tile( tiles['stone floor'] )
        }
    })
        return this.map
    }
}