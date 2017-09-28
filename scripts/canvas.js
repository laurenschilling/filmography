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
	ParticleContainer = PIXI.particles.ParticleContainer,
	Graphics = PIXI.Graphics,
	Text = PIXI.Text;

// change the texture a sprite is displaying
// use this to interactively change a sprite's appearance
	// anySprite.texture = TextureCache["anyTexture.png"];


// ----- SET UP THE CANVAS ----- 

var canvasSize = {
    height: window.innerHeight - 60, /* subtract the height of the footer 60px */
    width: window.innerWidth - 220 /* subtract the width of left sidebar 220px */
}

var resizableDataArea = {
    mouse_move: $('#mouse-move'), // WIP
    current_year: $('#current-year'), // WIP
    canvas: document.getElementById('canvas'), // can't use jQuery for this it doesn't work
    //footer: $('footer')
    // a few other elements will go in here, year marker, mousemove etc
}

var stage = new Container();
var renderer = new PIXI.WebGLRenderer(canvasSize.width, canvasSize.height, {
    transparent: !0,
    view: resizableDataArea.canvas
}, resizableDataArea.canvas, !1, !0);

document.body.appendChild(renderer.view);


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
	.add("images/dots.svg")
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
var texture, dot;


// ----- FUNCTION SET UP ----- 

function setup() {
	
	// create an alias for the texture atlas frame ids
	// 	id = loader.resources["images/animals.json"].textures;
	
	// attempted to loop through data to create dot sprites 
	// couldn't access variable from other script file
	for (var i = 0; i < 5; i++) {
		texture = Texture.fromImage("images/dots.svg");
		dot = new Sprite(texture);
		dot.width = 60;
		dot.height = 60;
		dot.position.set(i * 10, 0);
		stage.addChild(dot);		
	}
	
	/*cat = new Sprite(id["cat.png"]);
	cat.position.set(16,16);
	cat.width = 80;
	cat.height = 120;
	
		// initialise the cat's velocity variables
		cat.vx = 0;
		cat.vy = 0;
		
		// scale the sprite's size proportionally
		cat.scale.set(0.5,0.5);

	// create superFastSprites container to create OP sprites
	var superFastSprites = new ParticleContainer();
	superFastSprites.addChild(cat);
	superFastSprites.addChild(hedgehog);
	superFastSprites.addChild(tiger);
	superFastSprites.position.set(64,64);
	stage.addChild(superFastSprites);
*/
	
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

	PIXI.INTERACTION_FREQUENCY = 60;
	
	// year marker moves with cursor within canvas
	$(canvas).on('mousemove', function(e) {
		
		var mouseMove = document.getElementById('mouse-move');
		var cursor = document.getElementById('cursor');
		var offset = 20;
		var x = e.pageX;
		var y = e.pageY;
		
		mouseMove.style.left = x + 'px';
		cursor.style.top = y + 'px';
		
	});	

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
