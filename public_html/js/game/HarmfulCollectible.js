import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import {Images} from "../engine/resources.js"

class HarmfullCollectible extends GameObject
{
    constructor(x, y)
    {
        super(x, y);
        this.addComponent(new Renderer("red",30,30, Images.Harmfullcollectible));
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        
        this.tag = "hCandy";
        
        this.floatTime = 1.0;
        this.timeFloating = this.floatTime;
        this.vDirection = 1;
        
        this.maxWidth = 30;
        this.hDirection = 1;
        
    }
    
    update(deltaTime)
    {
        let physics = this.getComponent(Physics);
        let renderer = this.getComponent(Renderer);
        
          //objects will fall at this speed
          physics.velocity.y = 100;
       
        //removes gameobject wthen it hits the ground
        if (this.y > (this.game.canvas.height-70) - renderer.height) {
            this.game.removeGameObject(this); 
        }
    
        super.update(deltaTime);
    }
    
  
}

export default HarmfullCollectible

