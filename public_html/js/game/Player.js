import GameObject from '../engine/gameobject.js'
import Animation from '../engine/Animation.js'
import Renderer from '../engine/renderer.js'
import Animator from '../engine/Animator.js'
//import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import Input from "../engine/input.js"
import {Images, AudioFiles} from '../engine/resources.js'
import Platform from './platform.js'
import Collectible from './collectible.js'
import HarmfulCollectible from './HarmfulCollectible.js'
import ParticleSystem from '../engine/particleSystem.js'
import Button from './Button.js';


import {RunImages} from '../engine/resources.js'
import {IdleImages} from '../engine/resources.js'
import {HurtImages} from '../engine/resources.js'

//used class example for help
class Player extends GameObject
{
    constructor(x, y, w, h)
    {
        super(x, y);
        //add components 
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        //initialise animatior
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        
        let run = new Animation('red',w,h, RunImages, 10);
        let idle = new Animation('red', w, h, IdleImages, 10);
        let hurt = new Animation('red', w, h, HurtImages, 10);
        
        //add animations to animator set default animation to idle
        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("hurt", hurt);
        this.animator.setAnimation("idle");
        
        //variables
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
            //move right and play run animation
            physics.velocity.x = this.speed;
            this.direction = 1;
            console.log("in");
            this.animator.setAnimation("run");
        }
        else if(input.isKeyDown("ArrowLeft"))
        {
            //move left and play animation
            physics.velocity.x = -this.speed;
            this.direction = -1;
            this.animator.setAnimation("run");
        }
        else
        {
            //no movement so play idle
            physics.velocity.x = 0;
            this.animator.setAnimation("idle");
        }
        
        if(input.isKeyDown("ArrowUp") && this.isOnPlatform)
        {
            //jump & jump sound
            this.startJump();
            AudioFiles.jump.play();
        }
       
       //if player is jumping update jump timer
        if(this.isJumping)
        {
            this.updateJump(deltaTime);
        }
    }
    
        //collision with platforms (mainly same as class example)
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for(const platform of platforms)
        {
          
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                //if player is not jumping set the player to be on top of platform
                if (!this.isJumping ) 
                {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            }
            
        }
    
        //collision with collectables
        const collectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof Collectible);
        for(const coll of collectibles)
        {
            if(physics.isColliding(coll.getComponent(Physics)))
            {
                //on collision play collect sound anf collect item
                AudioFiles.collect.play();
                this.collect(coll);
            }
        }
        
        //resets player position if they fall off the screen
        //kept this because i had no time to add walls unfortunatley
        if(this.y > this.game.canvas.height)
        {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
        }
        
        // Collision detection with harmful collectibles
         const harmfulCollectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof HarmfulCollectible);
        for(const hColl of harmfulCollectibles)
        {
            if(physics.isColliding(hColl.getComponent(Physics)))
            {
                //on collision play hurt sound and call collect harmful object
                AudioFiles.hurt.play();
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
             }
}
        super.update(deltaTime);
     
        
    }
    
    //collect harmful object (losing a life)
     collectHarmful(harmfulCollectible)
    {
        //removes the object
        this.game.removeGameObject(harmfulCollectible);
        this.lives--;//decrease the life
        //once player runs out of lives
        if(this.lives === 0 || this.lives <0)
        {
            this.lives=0;//just so it doesnt go below 0 in the UI
            this.dead=true;//set that the player died is true
        }
          this.hurt=true;//player is hurt
          this.hurtTime=0.3;//timer of hurt state 
          this.animator.setAnimation("hurt"); //play animation timer will allow this         
    }
    
    //collecting candy collectables
    collect(collectible)
    {
        this.game.removeGameObject(collectible);//remove object
        this.emitParticles(collectible);//emit the particles
        this.score++;//increases "score" (num of candies collected)
       
    }
    
    //used class example
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
        //set velocity wont allow for another jump until landed
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
        //stop jumping when the timer ends or velocity goes positive
        this.jumpTimer -= deltaTime;
        if(this.jumpTimer <=0 || this.getComponent(Physics).velocity.y > 0)
        {
            this.isJumping = false;
        }
    }
}

export default Player
