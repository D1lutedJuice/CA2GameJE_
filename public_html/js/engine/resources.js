// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image, // The Image instance for the player.
  collectible: new Image(),
  harmfulCollectible: new Image
  
};

const RunImages = 
        [
            new Image(), // The Image instance for the player.
            new Image(),
            new Image(),// The Image instance for the enemy.
            new Image()
        ];

const IdleImages=
        [
           new Image(),
           new Image(),
           new Image(),
           new Image(),
           new Image(),
           new Image(),
           new Image()
        ];
        
        const HurtImages=
        [
           new Image(),
           new Image(),
           new Image(),
           new Image()
         
        ];

        
// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio('./resources/Audio/Jump.wav'), // The file path of the jump sound.
  collect: new Audio('./resources/Audio/collectable.wav'), // The file path of the collect sound.
  hurt: new Audio('./resources/Audio/Hurt.wav'),
  click: new Audio('./resources/Audio/Click.wav'),
  background: new Audio('./resources/Audio/Background.mp3')
  
};



// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path
Images.collectible.src= './resources/images/collectible/Candy.png'; 
Images.harmfulCollectible.src= './resources/images/collectible/BadCandy.png'; 


RunImages[0].src = "./resources/images/player/Run1.png";
RunImages[1].src = "./resources/images/player/Run2.png";
RunImages[2].src = "./resources/images/player/Run3.png";
RunImages[3].src = "./resources/images/player/Run4.png";

IdleImages[0].src = "./resources/images/player/Idle1.png";
IdleImages[1].src = "./resources/images/player/Idle2.png";
IdleImages[2].src = "./resources/images/player/Idle3.png";
IdleImages[3].src = "./resources/images/player/Idle4.png";
IdleImages[4].src = "./resources/images/player/Idle5.png";
IdleImages[5].src = "./resources/images/player/Idle6.png";
IdleImages[6].src = "./resources/images/player/Idle7.png";

HurtImages[0].src = "./resources/images/player/Hurt1.png";
HurtImages[1].src = "./resources/images/player/Hurt2.png";
HurtImages[2].src = "./resources/images/player/Hurt3.png";
HurtImages[3].src = "./resources/images/player/Hurt4.png";

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles, RunImages, IdleImages, HurtImages};
