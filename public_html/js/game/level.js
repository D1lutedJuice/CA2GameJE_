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
        
        
        const player = new Player(10, this.canvas.height - 50,100, 100);
        const playerUI = new PlayerUI(10, 10); 
        this.addGameObject(playerUI);
        
        this.camera.confiner = new Confiner(0,0,1200,this.canvas.height);
        this.camera.target = player;
        this.addGameObject(player);
        
        const platforms = [
                    new Platform(-400, this.canvas.height -70, 1600, 200)
                   
        ];
        
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
        
        const Collectibles = [
            new Collectible(375,this.canvas.height-800),
            new Collectible(475,this.canvas.height-800)
           
        ];
        
        for(const coll of Collectibles)
        {
            this.addGameObject(coll);
        }
        
      
      
        
    }
}
export default Level

