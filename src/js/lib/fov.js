import * as ROT from 'rot-js';

let fovMap = [];
let fovComputer;

export const initFovComputer = (level) => {
    const lightPasses = (x, y) => level.tiles[`${x},${y}`] && level.tiles[`${x},${y}`]['blocksSight'] === false;
  
    fovComputer = new ROT.FOV.PreciseShadowcasting(lightPasses);
};

export const computeFov = (x, y, radius) => {
    fovMap = [];
    fovComputer.compute(x, y, radius, function(x, y, r, visibility) {
      fovMap.push(`${x},${y}`);
    });
    return fovMap;
};