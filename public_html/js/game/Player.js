import GameObject from '../engine/gameobject.js'
import Animation from '../engine/Animation.js'
import Renderer from '../engine/renderer.js'
import Animator from '../engine/Animator.js'
//import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import Input from "../engine/input.js"
import {Images} from '../engine/resources.js'
import Platform from './platform.js'
import Collectible from './collectible.js'
import HarmfulCollectible from './HarmfulCollectible.js'
import ParticleSystem from '../engine/particleSystem.js'
import Button from './Button.js';


import {RunImages} from '../engine/resources.js'
import {IdleImages} from '../engine/resources.js'
import {HurtImages} from '../engine/resources.js'

class Player extends GameObject
{
    constructor(x, y, w, h)
    {
        super(x, y);
       // this.addComponent(new Renderer('red', w, h, Images.player));
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        let run = new Animation('red',w,h, RunImages, 10);
        let idle = new Animation('red', w, h, IdleImages, 10);
        let hurt = new Animation('red', w, h, HurtImages, 10);
        
        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("hurt", hurt);
        this.animator.setAnimation("idle");
        this.hurt= false;
        this.hurtTime= 0.0;
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.score = 0;
        this.defaultSpeed=100;
        this.speed = 400;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 300;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
        this.lives = 3;
        this.dead=false;
        this.startPoint = {x: x, y:y};
       
        
    }
    
    update(deltaTime)
    {
        
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const renderer = this.getComponent(Renderer);
        
        //as long as player is not hurt
        if (!this.hurt) {     
    
        if(input.isKeyDown("ArrowRight"))
        {
            
            physics.velocity.x = this.speed;
            this.direction = 1;
            console.log("in");
            this.animator.setAnimation("run");
        }
        else if(input.isKeyDown("ArrowLeft"))
        {
            physics.velocity.x = -this.speed;
            this.direction = -1;
            this.animator.setAnimation("run");
        }
        else
        {
            physics.velocity.x = 0;
            this.animator.setAnimation("idle");
        }
        
        if(input.isKeyDown("ArrowUp") && this.isOnPlatform)
        {
            this.startJump();
        }
       
        if(this.isJumping)
        {
            this.updateJump(deltaTime);
        }
    }
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for(const platform of platforms)
        {
          
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                if (!this.isJumping) 
                {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            }
            
        }
    
        
        const collectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof Collectible);
        for(const coll of collectibles)
        {
            if(physics.isColliding(coll.getComponent(Physics)))
            {
                this.collect(coll);
            }
        }
        if(this.y > this.game.canvas.height)
        {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
        }
        
         const harmfulCollectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof HarmfulCollectible);
        for(const hColl of harmfulCollectibles)
        {
            if(physics.isColliding(hColl.getComponent(Physics)))
            {
                this.collectHarmful(hColl);
             
            }
        } 
    
         //if player is hurt
         if (this.hurt) {
            //will start the hurt timer till it reaches 0 or below
           this.hurtTime -= deltaTime;
           if (this.hurtTime <= 0) {
               //after timer player no longer hurt 
               this.hurt = false; 
               //this.animator.setAnimation("idle");
             }
}
        super.update(deltaTime);
     
        
    }
    
     collectHarmful(harmfulCollectible)
    {
        this.game.removeGameObject(harmfulCollectible);
        this.lives--;
        if(this.lives === 0 || this.lives <0)
        {
            this.lives=0;
            this.dead=true;
            
        }
          this.hurt=true;
          this.hurtTime=0.3;//timer of hurt state 
          this.animator.setAnimation("hurt");           
    }
    
    collect(collectible)
    {
        this.game.removeGameObject(collectible);
        this.emitParticles(collectible);
        this.score++;
       
    }
    
    emitParticles(collectible)
    {
        let renderer = collectible.getComponent(Renderer);
        const particleSystem = new ParticleSystem(collectible.x + (renderer.width/2),
        collectible.y+ (renderer.height/2),
        'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);

    }
    
    startJump()
    {
        if(this.isOnPlatform)
        {
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
        }
    }
    
    updateJump(deltaTime)
    {
        this.jumpTimer -= deltaTime;
        if(this.jumpTimer <=0 || this.getComponent(Physics).velocity.y > 0)
        {
            this.isJumping = false;
        }
    }
}

export default Player
