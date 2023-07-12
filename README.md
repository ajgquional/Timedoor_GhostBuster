# Ghost Buster

<p align='center'>
  <img src='https://github.com/ajgquional/Timedoor_GhostBuster/blob/4c89ee7b173d92f3e36aeb92cae01040fe36ff24/GhostBusterSampleOutput1.png' alt='Sample Ghost Buster game' width='400' height='400'>
</p>

<p align='center'>
  <img src='https://github.com/ajgquional/Timedoor_GhostBuster/blob/4c89ee7b173d92f3e36aeb92cae01040fe36ff24/GhostBusterSampleOutput2.png' alt='Sample Ghost Buster game game over scene' width='400' height='400'>
</p>

## Description of the game
This is the fourth Phaser game of Intermediate 2 of the Intermediate JavaScript class of Timedoor Coding Academy. This also serves an exam for the students. In this game, players have to control a hero character by pressing left and right arrow keys on the keyboard to move left and right, respectively. Additionally, the player can fire a bomb upwards by pressing the spacebar. The main objective of the player is to earn as many score as he/she can by destroying (using the player's bomb) the ghosts that would spawn from the top of the screen. When the player collides with the ghost, it would be game over but the player has a chance to play the game again by clicking the replay button in the Game Over Scene.

The codes for this game are originally created by following the exam instructions (although the codes are partly based from the Corona Buster game). The codes here (especially the scenes code) are highly annotated and documented for clarity.

## About the repository
This repository only contains the source codes as well as assets linked in the exam instructions (as a Google Drive link). Thus, this repository is mainly for reference. Should you wish to use these files, you may download them and copy them to the template folder but make sure first that a Phaser framework is installed in your local machine and necessary steps have been conducted (such as installation of node.js and Visual Studio Code). Afterwards, the public (which contains the assets) and src (which contains all the source codes) folders can be copied in the game folder. The "game" can be run by typing the command ```npm run start``` in the terminal within Visual Studio Code, then clicking on the local server link (for instance, localhost:8000) in the terminal. The game will then open in your default browser.

### Notes on the content of the repository:
* public - contains a single sub-folder containing the image assets
* src - contains the source codes mainly contained in two sub-folders, as well as ```index.html``` and ```main.js```
  * scenes - contains the main game scene (```GhostBusterScene.js```) as well as the game over scene (```GameOverScene.js```)
  * ui - contains the object classes needed for the game
    * ```Bomb.js``` - to create the player's bomb
    * ```Ghost.js``` - to create the ghosts
    * ```ScoreLabel.js``` - to create the score text in the main game scene as well as game over scene
    
## Summarized game mechanics and link to sample game
- Platforms: PC/Web browser (movement and shoot action can be done using the left/right arrow keys and the spacebar in the keyboard, respectively)
- Controls: 
  - Left arrow button/left arrow key to move left
  - Right arrow button/right arrow key to move right
  - Spacebar to fire the bomb
- Rules:
  - Destroy as many ghosts as you can while avoiding a single collision with a ghost.
  - Once the player collides with a single ghost, the game is over.
- Link to the sample game: https://td-ghostbuster-adrian.netlify.app/
  
