import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Collectible from './collectible.js';

import PlayerUI from './PlayerUI.js';

class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        
        
        const player = new Player(10, this.canvas.height - 100,50, 50);
        
        this.camera.confiner = new Confiner(0,0,2000,this.canvas.height);
        this.camera.target = player;
        this.addGameObject(player);
        
        const platforms = [
                    new Platform(0, this.canvas.height-40, 200, 20),
                    new Platform(300, this.canvas.height-40, 200, 20),
                    new Platform(600, this.canvas.height-80, 200, 60)
        ];
        
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
        
        const Collectibles = [
            new Collectible(375,this.canvas.height-100),
            new Collectible(475,this.canvas.height-100)
           
        ];
        
        for(const coll of Collectibles)
        {
            this.addGameObject(coll);
        }
        
      
      
        
    }
}
export default Level

