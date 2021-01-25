import Entity from "./Entity";

export default class Player extends Entity {
    constructor(update, name, x, y, char, color) {
        super(name, x, y, char, color);
        this.updateEngine = update
        this.initMovement(update)
    }

    initMovement() {
        window.addEventListener('keydown', (e) => {
            const action = this.$handleKeyDown(e.code);
            if( action ) {
              this.updateEngine(action);
            }
        })
    }

    $handleKeyDown(code) {
        const directions = [ [-1,-1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0] ];


        const vim = [ 'KeyY', 'KeyK', 'KeyU', 'KeyL', 'KeyN', 'KeyJ', 'KeyB', 'KeyH' ];
        const numPad = [ 'Numpad7', 'Numpad8', 'Numpad9', 'Numpad6', 'Numpad3', 'Numpad2', 'Numpad1', 'Numpad4' ];
        const arrows = [ null, 'ArrowUp', null, 'ArrowRight', null, 'ArrowDown', null, 'ArrowLeft' ];

        if( numPad.indexOf(code) !== -1 ) {
            const direction = directions[ numPad.indexOf(code) ];
            return { PLAYER_MOVE: direction };

        } else if( arrows.indexOf(code) !== -1 ) {
            const direction = directions[ arrows.indexOf(code) ];
            return { PLAYER_MOVE: direction };
        
        } else if(  vim.indexOf(code) !== -1  ) {
            const direction = directions[ vim.indexOf(code) ];
            return { PLAYER_MOVE: direction };
        
        } else {
            return false;
        }
    }
}