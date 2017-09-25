var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
	type = "canvas"
}

// ----- VARIABLES -----

// aliases
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	TextureCache = PIXI.utils.TextureCache,
	Texture = PIXI.Texture,
	Sprite = PIXI.Sprite,
	Rectangle = PIXI.Rectangle,
	ParticleContainer = PIXI.particles.ParticleContainer;
	Graphics = PIXI.Graphics;
	Text = PIXI.Text;

// change the texture a sprite is displaying
// use this to interactively change a sprite's appearance
	// anySprite.texture = TextureCache["anyTexture.png"];


// ----- SET UP THE CANVAS ----- 

// create a pixi stage and renderer
// add renderer.view to the DOM
var stage = new Container();
var renderer = autoDetectRenderer(1000, 61000, {transparent: true});
document.getElementById("canvas").appendChild(renderer.view);

// renderer/canvas styles
renderer.view.style.border = "none";

// resize renderer to fill window
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", function(event){ 
	scaleToWindow(renderer.view);
});


// ----- OPTIONAL ELEMENTS -----
// to find out if the mouse is touching something
// convert pixel positions to scaled element coordinates
	// pointer.x = pointer.x / scale;
	// pointer.y = pointer.y / scale;

// find the scale value the element is scaled to
	// var scale = scaleToWindow(renderer.view);
	// console.log(scale);


// ----- CREATE SPRITES -----
// load textures
// run setup function when loaded
loader
	.add("images/film_texture_blue.png")
	.on("progress", loadProgressHandler)
	.load(setup);
	
// log the progress of images loading
function loadProgressHandler(loader, resource) {
	
	// log the file url currently being loaded
	console.log("loading: " + resource.url);
	
	// log the percentage of files currently loaded
	console.log("progress: " + loader.progress + "%");
}

// define global variables
var bg, id, car, hedgehog, tiger;


// ----- FUNCTION SET UP ----- 

function setup() {
	
	// create an alias for the texture atlas frame ids
// 	id = loader.resources["images/animals.json"].textures;
	
	// create sprites
	var yrMarker = new Graphics();
	yrMarker.lineStyle(2,0Xf7b7c7,1);
	yrMarker.moveTo(0,0);
	yrMarker.lineTo(0, 1000);
	yrMarker.x = 32;
	yrMarker.y = 32;
	stage.addChild(yrMarker);

	var yr = new Graphics();
	yr.lineStyle(2,0Xf7b7c7,1);
	yr.beginFill(0Xf7b7c7);
	yr.drawRoundedRect(0,0,84,36,10);
	yr.endFill();
	yr.x = 48;
	yr.y = 190;
	stage.addChild(yr);
/*
	yrMarker.lineStyle(2,0Xf7b7c7,1);
	yrMarker.moveTo(0,0);
	yrMarker.lineTo(0, 1000);
	yrMarker.x = 32;
	yrMarker.y = 32;
*/
// 	stage.addChild(yrMarker);
	
		
	/*cat = new Sprite(id["cat.png"]);
	cat.position.set(16,16);
	cat.width = 80;
	cat.height = 120;
	
		// initialise the cat's velocity variables
		cat.vx = 0;
		cat.vy = 0;
		
		// scale the sprite's size proportionally
		cat.scale.set(0.5,0.5);
		
	// create animals container to group sprites together
	var animals = new Container();
	animals.addChild(cat);
	animals.addChild(hedgehog);
	animals.addChild(tiger);
	animals.position.set(64,64);
	stage.addChild(animals);

	// create superFastSprites container to create OP sprites
	var superFastSprites = new ParticleContainer();
	superFastSprites.addChild(cat);
	superFastSprites.addChild(hedgehog);
	superFastSprites.addChild(tiger);
	superFastSprites.position.set(64,64);
	stage.addChild(superFastSprites);
*/
	
	// text elements
	// find more info here: http://pixijs.download/release/docs/PIXI.Text.html
	var message = new Text(
		"Hello Pixi!",
		{ fontFamily: "Arial", fontSize: 32, fill: "white", wordWrap: true, wordWrapWidth: 100, align: "center" }
	);
	message.position.set(54,96);
	stage.addChild(message);
	
	// set the game state
	state = play;
 
	// start the game loop
	gameLoop();
}


// ----- FUNCTION GAME LOOP -----

function gameLoop() {
	
	// loop this function at 60 frames per second
	requestAnimationFrame(gameLoop);
	
	// update the current game state
	state();
	
	// render the stage the see the animation
	renderer.render(stage);
}


// ----- FUNCTION PLAY -----
// all of the animations and changes to the canvas elements go here

function play() {			
	
/*
	// apply the velocity values to the cat's position to make it move
	cat.x += cat.vx;
	cat.y += cat.vy;

	// contain the cat inside the area of the dungeon
	contain(cat, {x: 28, y: 10, width: 488, height: 480});
*/
}


// ----- FUNCTION END -----
// will we have a function end?

function end() {
	gameScene.visible = false;
	gameOverScene.visible = true;
}


// ----- HELPER FUNCTIONS -----

// contain the sprite
function contain(sprite, container) {

	var collision = undefined;
	
	// left
	if (sprite.x < container.x) {
		sprite.x = container.x;
		collision = "left";
	}
	
	// top
	if (sprite.y < container.y) {
		sprite.y = container.y;
		collision = "top";
	}
	
	// right
	if (sprite.x + sprite.width > container.width) {
		sprite.x = container.width - sprite.width;
		collision = "right";
	}
	
	// bottom
	if (sprite.y + sprite.height > container.height) {
		sprite.y = container.height - sprite.height;
		collision = "bottom";
	}
	  
	// return the `collision` value
	return collision;
}

// get a random integer
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
