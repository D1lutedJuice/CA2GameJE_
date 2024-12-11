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
        
        
        const player = new Player(30, this.canvas.height - 50,100, 100);
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
    }

     //used this website to help with the random spawning collectable https://jsfiddle.net/m1erickson/RCLtR/
     update(deltaTime) {
       //this ensures that the it updates the logic for everything
       super.update(deltaTime);
       
        if (Math.random() < 0.01) { // 1% chance per frame to spawn a collectible
            this.spawnRandomCollectable();
        }
    }
   spawnRandomCollectable() {

     // set x randomly
     const x= Math.random() * (this.canvas.width);
     // set y to start at the top
     const y= 0;
   
     // create the new collectable did -400 because collectables would for some reason not spawn on the left
     const collectible = new Collectible(x-400, y);
    
     this.addGameObject(collectible);
  }
 }

export default Level

