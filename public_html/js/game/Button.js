import GameObject from '../engine/gameobject.js';
import Level from './level.js';
import { AudioFiles} from '../engine/resources.js'

//used the powerpoint from moodle "Our Game Engine Part 2" for this.
class Button extends GameObject
{
    //constructer
    constructor(x, y, w, h, color, str) {
      super(x,y);
      this.width = w;
      this.height = h;
      this.color = color;
      this.text = str;

       //event listener for mouse clicks and bind it to the click method
      document.addEventListener('click', this.click.bind(this), false);
  }
  
  //draws the button on the canvas
  draw(ctx)
  {
      super.draw(ctx);
      ctx.fillStyle=this.color;
      ctx.fillRect(this.game.camera.x + this.x,this.game.camera.y + this.y, this.width, this.height );
      //text
      ctx.textAlign = "center";
      ctx.font = "20px serif";
      ctx.fillStyle="white";
      ctx.fillText(this.text, this.game.camera.x + this.x + this.width/2, this.game.camera.y + this.y + 15);
  }

//method that handles the click
click(event)
  {
      let rect = this.game.canvas.getBoundingClientRect();
      let width = this.width;
      let height = this.height;
      
      //makes sure the mouse click is withing bounds of the button
      if (event.clientX - rect.left >= this.x && event.clientX - rect.left <= this.x + width && event.clientY - rect.top >= this.y && event.clientY - rect.top <= this.y + height) 
      {
        //if its the pause button
        if(this.text === "Pause")
        {
            //pause the game
           this.game.pauseGame();
            
           //play the audio of the button click
           if(this.game.pause)
                AudioFiles.click.play();
           else
               AudioFiles.click.play();
        }
        //if its the restart button
        if(this.text === "Restart?")
        {
            //play the audio
            AudioFiles.click.play();
            //call the reset method from game
            this.game.reset();   
        }
        if(this.text === "you WIN! Restart?")
        {
            //play the audio
            AudioFiles.click.play();
            //call the reset method from game
            this.game.reset();   
        }
      }    
  }
 


}
export default Button
