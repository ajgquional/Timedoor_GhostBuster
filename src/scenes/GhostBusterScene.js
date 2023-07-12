import Phaser from "phaser";

// importing classes from the "ui" folder
import Bomb from "../ui/Bomb.js";
import Ghost from "../ui/Ghost.js";
import ScoreLabel from "../ui/ScoreLabel.js";

export default class GhostBusterScene extends Phaser.Scene {
	constructor() {
		super("ghost-buster-scene");
	}

	init() {
		// global variables for game objects and values
		this.ground = undefined; // ground object
		this.player = undefined; // player object
		this.cursors = undefined; // keyboard object
		this.speed = 100; // player speed
		this.bomb = undefined; // projectile of the player
		this.lastFired = 0; // time delay in firing the bomb
		this.ghost = undefined; // ghost/enemy object
		this.ghostSpeed = 40; // ghost/enemy speed
	}

	preload() {
		// loding image assets
		this.load.image("background", "images/background.png");
		this.load.image("bomb", "images/bomb.png");
		this.load.image("ghost", "images/ghost.png");
		this.load.image("ground", "images/ground.png");
		this.load.spritesheet("player", "images/player.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
	}

	create() {
		// =============== OBJECT CREATION ===============

		// creating the background
		const gameWidth = this.scale.width * 0.5;
		const gameHeight = this.scale.height * 0.5;
		this.add.image(gameWidth, gameHeight, "background");

		// creating one long ground platform and specifying that it has physics (i.e., it can be stepped upon)
		this.ground = this.physics.add.staticGroup();
		this.ground.create(100, 490, "ground").setScale(2).refreshBody();

		// creating the player and bounding it to the game screen
		this.player = this.physics.add.sprite(
			this.scale.width * 0.5,
			450,
			"player"
		);
		this.player.setCollideWorldBounds(true);

		// ===============================================
		// creating the player animations (note that these can instead be placed in a separate method)
		// walk left animation
		this.anims.create({
			key: "left", // animation name
			frames: this.anims.generateFrameNumbers("player", {
				start: 3,
				end: 5,
			}), // frames used in the spritesheet
			frameRate: 10,
			repeat: -1, // looping the animation
		});

		// front-facing animation
		this.anims.create({
			key: "front", // animation name
			frames: this.anims.generateFrameNumbers("player", {
				start: 0,
				end: 2,
			}), // frames used in the spritesheet
			frameRate: 10,
			repeat: -1, // looping the animation
		});

		// walk right animation
		this.anims.create({
			key: "right", // animation name
			frames: this.anims.generateFrameNumbers("player", {
				start: 6,
				end: 8,
			}), // frames used in the spritesheet
			frameRate: 10,
			repeat: -1, // looping the animation
		});

		// if back-facing animation is needed, uncomment the codes below
		/*
		this.anims.create({
			key: "back", // animation name
			frames: this.anims.generateFrameNumbers("player", {
				start: 9,
				end: 11,
			}), // frames used in the spritesheet
			frameRate: 10,
			repeat: -1, // looping the animation
		});
        */
		// ===============================================

		// creating the keyboard object
		this.cursors = this.input.keyboard.createCursorKeys();

		// adding bomb (with physics) to the game
		this.bomb = this.physics.add.group({
			classType: Bomb,
			runChildUpdate: true,
		});

		// adding ghosts
		this.ghost = this.physics.add.group({
			classType: Ghost,
			maxSize: 10, // number of enemy in one group
			runChildUpdate: true,
		});

		// delay in spawning the enemy (units are milliseconds)
		// calls the spawnGhost method every 2s (2000ms = 2s)
		this.time.addEvent({
			delay: 2000,
			callback: this.spawnGhost,
			callbackScope: this,
			loop: true,
		});

		// creating the score label
		this.scoreLabel = this.createScoreLabel(320, 16, 0);

		// =============== COLLISIONS AND OVERLAPS ===============

		// making the player collide with the platform
		this.physics.add.collider(this.player, this.ground);

		// checking the overlap between bomb and ghost
		this.physics.add.overlap(
			this.bomb,
			this.ghost,
			this.hitGhost,
			null,
			this
		);

		// checking the overlap between player and ghost
		this.physics.add.overlap(
			this.player,
			this.ghost,
			this.touchGhost,
			null,
			this
		);
	}

	update(time) {
		// specifying keyboard controls (note that these can be placed in a separate method)
		// if left arrow key is pressed, player walks to the left
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(this.speed * -1);
			this.player.anims.play("left", true);
		}

		// if right arrow key is pressed, player walks to the right
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(this.speed);
			this.player.anims.play("right", true);
		}

		// if neither of the left or right keys are pressed, player stops and plays front-facing animation
		else {
			this.player.setVelocityX(0); //stop
			this.player.anims.play("front");
		}

		// if spacebar is pressed, bomb will be fired
		if (this.cursors.space.isDown && time > this.lastFired) {
			const bomb = this.bomb.get(0, 0, "bomb");

			if (bomb) {
				bomb.fire(this.player.x, this.player.y);
				this.lastFired = time + 150;
			}
		}
	}

	// method to spawn the ghosts
	spawnGhost() {
		// specifying ghost properties
		// if rotation is desired, uncomment the rotation property
		// positive rotation is clockwise, negative rotation is counter-clockwise
		// you may try these values for rotation: 0, -1, 0.1
		const config = {
			speed: this.ghostSpeed,
			//rotation : 0.06
		};

		const ghost = this.ghost.get(0, 0, "ghost", config);
		const ghostWidth = ghost.displayWidth;
		const positionX = Phaser.Math.Between(
			ghostWidth,
			this.scale.width - ghostWidth
		);

		if (ghost) {
			ghost.spawn(positionX); // spawns the ghost (spawn method is included in the class)
		}
	}

	// method to call when bomb and ghost collide
	hitGhost(bomb, ghost) {
		// both bomb and ghost are removed from the game when they collide
		bomb.erase();
		ghost.die();

		// increments the score
		this.scoreLabel.add(1);
	}

	// method to create the score label
	createScoreLabel(x, y, score) {
		const style = {
			fontSize: "32px",
			fill: "#00ff22",
			fontStyle: "bold",
		};
		const label = new ScoreLabel(this, x, y, score, style).setDepth(1);
		this.add.existing(label);
		return label;
	}

	// method to call when player touches the ghost
	touchGhost() {
		// automatically switch to the game over scene when player is touched by the ghost
		this.scene.start("game-over-scene", {
			score: this.scoreLabel.getScore(),
		});
	}
}
