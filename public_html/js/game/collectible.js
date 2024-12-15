import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import {Images} from "../engine/resources.js"
import Player from "./player.js"

//used code from class example & changed so collectable falls
class Collectible extends GameObject
{
    constructor(x, y)
    {
        super(x, y);
         //render the image of the object and set size
        this.addComponent(new Renderer("yellow",30,30, Images.collectible));
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        
        //give it a tag so it can be identified
        this.tag = "candy";
      
    }
    //update method to get the state of onject every frame
    update(deltaTime)
    {
        //find player object
        const player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        
        //get physics and renderer component
        let physics = this.getComponent(Physics);
        let renderer = this.getComponent(Renderer);
        
          //objects will fall at this speed
          //speed will increase after 30 candies collected to make it harder
          if(player.score < 30)
          {
              physics.velocity.y = 100;
          }
          else
          {
              physics.velocity.y = 150;
          }
       
       
        //removes gameobject wthen it hits the ground
        // canvas height where platform is -object height
        if (this.y > (this.game.canvas.height-70) - renderer.height) {
            this.game.removeGameObject(this); 
        }
    
        super.update(deltaTime);
    }
    
  
}

export default Collectible

