import colors from '../ui/colors'

export default class Tile {
    constructor(props) {
        const {name, char, color, blocksMove, blocksSight} = {...props};

        this.name = name;
        this.char = char;
        this.color = color;
        this.blocksMove = blocksMove;
        this.blocksSight = blocksSight;
        this.explored = false;
    }
}

export const tileDict = {
    'dungeon floor': {
      name: 'dungeon floor',
      char: '.',
      color: colors.SEPIA,
      blocksMove: false,
      blocksSight: false,
    },
    'dungeon wall': {
      name: 'dungeon wall',
      char: '#',
      color: colors.DARK_SEPIA, 
      blocksMove: true,
      blocksSight: true,
    },
    'forest tree': {
      name: 'forest tree',
      char: 'O',
      color: colors.DARKER_GREEN, 
      blocksMove: true,
      blocksSight: true,
    },
    'forest grass': {
        name: 'forest grass',
        char: '^',
        color: colors.DARKER_AMBER, 
        blocksMove: false,
        blocksSight: false,
      }
  };