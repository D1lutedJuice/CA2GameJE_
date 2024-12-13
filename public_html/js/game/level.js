import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Collectible from './collectible.js';
import HarmfulCollectible from './HarmfulCollectible.js';
import PlayerUI from './PlayerUI.js';


class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        
        this.spawnChance= 0.002;
        this.max= 0.01;
        this.increase= 0.000001;
        
        const player = new Player(30, this.canvas.height - 50,100, 100);
        const playerUI = new PlayerUI(10, 10); 
        this.addGameObject(playerUI);
        
        this.camera.confiner = new Confiner(0,0,1000,this.canvas.height);
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
       
        //spawning collectable at random
        if (Math.random() < 0.01) { // 1% chance per frame to spawn a collectible
            this.spawnRandomCollectable();
        }
        //spawning a harmful collectable at random
     
     
        
        if(this.spawnChance < this.max)
        {
            this.spawnChance= this.spawnChance+this.increase;
        }
        
        if (Math.random() < this.spawnChance) { // 1% chance per frame to spawn a collectible
            this.spawnRandomHarmfulCollectable();
        }
    }
    
   spawnRandomCollectable() {

     // set x randomly
     const x= Math.random() * (this.canvas.width);
     // set y to start at the top
     const y= 0;
   
     // create the new collectable did -400 because collectables would for some reason not spawn on the left
     const collectible = new Collectible(x-400, y);
    
    //adds collectable object to array of objects
     this.addGameObject(collectible);
  }
  
   spawnRandomHarmfulCollectable() {

     // set x randomly
     const x= Math.random() * (this.canvas.width);
     // set y to start at the top
     const y= 0;
   
     // create the new collectable did -400 because collectables would for some reason not spawn on the left
     const harmfulCollectible = new HarmfulCollectible(x-400, y);
    
    //adds collectable object to array of objects
     this.addGameObject(harmfulCollectible);
  }
 }
 
 
 

export default Level

