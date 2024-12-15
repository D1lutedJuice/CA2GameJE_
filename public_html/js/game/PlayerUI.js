import UI from "../engine/ui.js";
import GraphicalUI from "../engine/graphicalUI.js";
import GameObject from "../engine/gameObject.js"
import Player from "./player.js"

//used example from class
class PlayerUI extends GameObject
{
    constructor(x, y)
    {
        super(x,y);
        //default text
        this.ui = new UI('Lives: 3 Candy: 0', 10,10);
        this.addComponent(this.ui);
       
    }
   
    update(deltaTime)
    {
        //find player object
        const player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        //update ui
        this.ui.setText("Lives: "+player.lives+ " Candy: "+player.score);
    }
}

export default PlayerUI;