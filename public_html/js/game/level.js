import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Collectible from './collectible.js';
import HarmfulCollectible from './HarmfulCollectible.js';
import PlayerUI from './PlayerUI.js';
import Button from './Button.js';


class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        
        //initialized the collectable spawn chance, and max chance, etc.
        this.spawnChance= 0.002;
        this.max= 0.01;
        this.increase= 0.000001;
        
        this.paused = false;//check if game paused
        
        //created player
        const player = new Player(30, this.canvas.height - 50,100, 100);
        const playerUI = new PlayerUI(10, 10); //create UI
        this.addGameObject(playerUI);//add UI to game
        //camera boundries
        this.camera.confiner = new Confiner(0,0,1000,this.canvas.height);
        this.camera.target = player;//follows the player
        this.addGameObject(player);//add player to gane
        
        //create platform, array if i decide to add more
        const platforms = [
                    new Platform(-500, this.canvas.height -70, 1600, 200)              
                   
        ];
        
        //add the platforms to the game 
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }   
        //add pause button to ui in the top right
        this.addGameObject(new Button(this.canvas.width-110,10,100,40,"#131f26", "Pause")); 
        this.player = player;//reference to player
        
    }

     //used this website to help with the random spawning collectable https://jsfiddle.net/m1erickson/RCLtR/
     update(deltaTime) {
         
         if (this.paused) {
            //if the game is in a paused state don't update game objects
            return;
        }
        
       //this ensures that the it updates the logic for everything
       super.update(deltaTime);
       
       
        //spawning collectable at random
        if (Math.random() < 0.01) { // 1% chance per frame to spawn a collectible
            this.spawnRandomCollectable();
        }
        
        //spawning a harmful collectable at random 
        //increase the spawn chance till it reaches the max spawn chance
        if(this.spawnChance < this.max)
        {
            this.spawnChance= this.spawnChance+this.increase;
        }
        
        if (Math.random() < this.spawnChance) { // up to 1% chance per frame to spawn a harmful collectible
            this.spawnRandomHarmfulCollectable();
        }
        
        //if the player dead boolean is true 
        //(from player object hence why i had a player reference)
        if(this.player.dead)
        { 
            this.paused = true; //freeze the game since the player lost 
            //prompt for restart by adding new button
             this.addGameObject(new Button(670,300, 150, 60,"#131f26", "Restart?")); 
        }
        //once player collects 100 candies
        if(this.player.score === 80)
        {
            this.paused = true; //freeze the game since the player won 
            //prompt for restart by adding new button
             this.addGameObject(new Button(670,300, 180, 60,"#131f26", "you WIN! Restart?")); 
        }
       

    }
    
    //again used this website to help with the random spawning collectable https://jsfiddle.net/m1erickson/RCLtR/
   spawnRandomCollectable() {

     // set x randomly
     const x= Math.random() * (this.canvas.width);
     // set y to start at the top
     const y= 0;
   
     // create the new collectable did -500 because its the canvas size
     const collectible = new Collectible(x-500, y);
    
    //adds collectable object to array of objects
     this.addGameObject(collectible);
  }
  
   spawnRandomHarmfulCollectable() {

     // set x randomly
     const x= Math.random() * (this.canvas.width);
     // set y to start at the top
     const y= 0;
   
     // create the new collectable 
     const harmfulCollectible = new HarmfulCollectible(x-500, y);
    
    //adds collectable object to array of objects
     this.addGameObject(harmfulCollectible);
  }
 }
 
 
 

export default Level

