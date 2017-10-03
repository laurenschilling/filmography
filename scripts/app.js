// this is our controller - basically a function 
function movieController($scope, $http) {
    imageBase = "https://image.tmdb.org/t/p/";
    imageSize = 'w300/';// from https://developers.themoviedb.org/3/getting-started/images
    
    defaultImg = "blank.gif";
    
//    $scope.selectedArtist = "";
//    $scope.selectedArtistImage = IMAGE_ROOT + DEFAULT_IMAGE;

    $http.get('scripts/all-moviedata.json').success(function(data) {
        $scope.movies = data;
    });

	// when genre filter is clicked, only show movies with that genre
	$('#genres ul li').on('click', function() {
		console.log('a genre filter has been clicked');
		var currGenreFilter = $(this).attr('data-link');
		console.log('current filter selected: ' + currGenreFilter);
	})
    
    //what happens when you click the ng-click in the movie list
    $scope.movieClick = function(movie) {
        $scope.selectedMovie = movie;
        console.log(movie);

        //if there is an image then add the filepath to the string 
        if ( movie.poster_path ) {
          $scope.selectedMovieImage = imageBase + imageSize + movie.poster_path;
        } else {
          $scope.selectedMovieImage = imageBase + defaultImg;
        }
        
        // if there is a release date, only show release year
        if ( movie.release_date ) {
	        var yr = movie.release_date.substring(0, 4);
			$('.yr').empty().append(yr);
        }
        
        // if there is a genre id, find the genre name
        if ( movie.genre_ids ) {

			var currGenres = [];
			var ids = movie.genre_ids;			
			var genres = [
				{ id: 28, name: 'Action' },
				{ id: 12, name: 'Adventure' },
				{ id: 16, name: 'Animation' },
				{ id: 35, name: 'Comedy' },
				{ id: 80, name: 'Crime' },
				{ id: 99, name: 'Documentary' },
				{ id: 18, name: 'Drama' },
				{ id: 10751, name: 'Family' },
				{ id: 14, name: 'Fantasy' },
				{ id: 36, name: 'History' },
				{ id: 27, name: 'Horror' },
				{ id: 10402, name: 'Music' },
				{ id: 9648, name: 'Mystery' },
				{ id: 10749, name: 'Romance' },
				{ id: 878, name: 'Science Fiction' },
				{ id: 10770, name: 'TV Movie' },
				{ id: 53, name: 'Thriller' },
				{ id: 10752, name: 'War' },
				{ id: 37, name: 'Western' }
			]			
			
			// match the movie ids with the genre names
			for (var j = 0; j < genres.length; j++) {

				for (var i = 0; i < ids.length; i++) {
					if ( ids[i] == genres[j].id) {
						console.log('Match: ' + ids[i] + ' and ' + genres[j].id);
						currGenres.push(genres[j].name);
					}
				}
			}
			
			// log current genre names to console
			console.log('current genres are: ' + currGenres);

			// append genre names to page
			var numOfGenres = currGenres.length;
			if ( numOfGenres === 1 ) {
				$('.genre-ids').empty().append(currGenres[0]);
			} else if ( numOfGenres === 2 ) {
				$('.genre-ids').empty().append(currGenres[0] + ', ' + currGenres[1]);
			} else if ( numOfGenres === 3 ) {
				$('.genre-ids').empty().append(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2]);
			} else if ( numOfGenres === 4 ) {
				$('.genre-ids').empty().append(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ', ' + currGenres[3]);
			} else if ( numOfGenres === 5 ) {
				$('.genre-ids').empty().append(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ', ' + currGenres[3] + ', ' + currGenres[4]);
			} else {
					$('.genre-ids').empty().append(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ', ' + currGenres[3] + ', ' + currGenres[4] + ' and more!');
			}
		}
	}

	// ----- PIXI CODE -----
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
	
	var dataElements = {
	    mouse_move: $('#mouse-move'),
	    canvas: document.getElementById('canvas'), // can't use jQuery for this it doesn't work
	    //footer: $('footer')
	    // a few other elements will go in here
	}
	
	var stage = new Container();
	stage.interactive = false;
	var renderer = new PIXI.WebGLRenderer(canvasSize.width, canvasSize.height, {
	    transparent: !0,
	    view: dataElements.canvas
	}, dataElements.canvas, !1, !0);
	
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
	
 
	// ----- FUNCTION SET UP ----- 
	
	function setup() {
		
		var texture = Texture.fromImage("images/dots-15.svg");
		var length = $scope.movies.length;
        
        var distanceFromRight,
            columnsFromRight,
            spriteWidth = 15,
            spriteHeight = 15, 
            resetSpriteHeight1 = 15, // in case the canvas height means the data for a year spills to 2 columns
            resetSpriteHeight2 = 15, // in case the canvas height means the data for a year spills to 3 columns
            resetSpriteHeight3 = 15, // in case the canvas height means the data for a year spills to 4 columns
            resetSpriteHeight4 = 15, // in case the canvas height means the data for a year spills to 5 columns
            resetSpriteHeight5 = 15; // in case the canvas height means the data for a year spills to 6 columns
            // I'm thinking if a dataset needs more than 6 columns perhaps we should have a screen pop up telling the user their browser window is too small anyway? Not ideal, but for the time constraints on this assignment, it might be okay
		
		// loop through movie data to create dot sprites 
		for (var d = 0; d < length; d++) {
		
			// variable for current movie
			var currentMovie = $scope.movies[d];
			
			// create a dot sprite for the number of movies
			var dot = new Sprite(texture);
			
			// make the dot interactive
			dot.buttonMode = true;
			dot.interactive = true;
			
			// dot properties
			dot.width = 12.5;
			dot.height = 12.5;
            dot.anchor.set = (0.5, 0.5);
			//dot.position.set(d * 12.5, canvasSize.height/2);
            
			dot.year = parseInt($scope.movies[d].release_date.substring(0, 4)); 
			dot.genre = $scope.movies[d].genre_ids;
			dot.title = currentMovie.title;
			
			// this seems to be a lifesaver! -ben
			dot.hitArea = new Rectangle(-150, -150, 300, 300);
			
            // contain the sprites ** not working **
			// contain(dot, {x: 0, y: 0, width: canvasSize.width, height: canvasSize.height});
			
			// set the mouseover and click states
            //listed here: http://pixijs.download/v4.3.4/docs/PIXI.interaction.InteractionManager.html#event:click 
            dot.on('mouseover', dotHover);
            dot.on('click', dotClick);

			// add dot sprites to stage						
			stage.addChild(dot);
            
            if (dot.year === 2017) { // this loops through 2017 data, I'm sure we could create a function for this, I'm just terrible at functions - Steph
                // initially positon first sprite bottom right
                dot.x = canvasSize.width - spriteWidth;
                dot.y = canvasSize.height - spriteHeight;
                spriteHeight += 15; // ensures next sprite sits 'above'
                distanceFromRight = canvasSize.width - dot.x; // calculates how far in px the sprite is from right
            
                if (dot.y < 0) { // within 2017 loop - if sprites proceed past top of y axis
                    dot.x = canvasSize.width - (spriteWidth*2); // 2nd column
                    dot.y = canvasSize.height - resetSpriteHeight1;
                    resetSpriteHeight1 += 15;
                    distanceFromRight = canvasSize.width - dot.x;
                    
                    if (dot.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                        dot.x = canvasSize.width - (spriteWidth*3); // 3rd column
                        dot.y = canvasSize.height - resetSpriteHeight2;
                        resetSpriteHeight2 += 15;
                        distanceFromRight = canvasSize.width - dot.x;
                        
                        if (dot.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                            dot.x = canvasSize.width - (spriteWidth*4); // 4th column
                            dot.y = canvasSize.height - resetSpriteHeight3;
                            resetSpriteHeight3 += 15;
                            distanceFromRight = canvasSize.width - dot.x;
                            
                            if (dot.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                                dot.x = canvasSize.width - (spriteWidth*5); // 5th column
                                dot.y = canvasSize.height - resetSpriteHeight4;
                                resetSpriteHeight4 += 15;
                                distanceFromRight = canvasSize.width - dot.x;
                                
                                if (dot.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                                    dot.x = canvasSize.width - (spriteWidth*6); // 6th column
                                    dot.y = canvasSize.height - resetSpriteHeight5;
                                    resetSpriteHeight5 += 15;
                                    distanceFromRight = canvasSize.width - dot.x;
                                }
                            }
                        }
                    }
                }
            } // close 2017 loop
            
            columnsFromRight = distanceFromRight / 15;
            // this currently evaluates as a number, which I want to use to position 2016 sprites on the x axis, but as soon as I add data to 2016 my variables change as it loops through 2016 before 2017 at the same time. I don't want to have to assign a new spriteHeight variable for each year, but am thinking perhaps we need the data to loop through the other way? So it hits the 2017 data first so we can position it first?
            
            if (dot.year === 2016) {
                //dot.x = canvasSize.width - spriteWidth*(columnsFromRight + 1);
                //this currently doesn't work and we can't use a flat number as we won't 'know' what that number is, so need a variable fed from 2017 aka year proceeding, which is what columnsFromRight was designed for
                
                //dot.y = canvasSize.height - spriteHeight;
                // accessing the spriteHeight variable messes with 2017
                //spriteHeight += 15;
                // accessing the spriteHeight variable messes with 2017
            
            } // close 2016 loop
            
            
		} // close data/sprite loop
		
			
			// initialise the cat's velocity variables
			//cat.vx = 0;
			//cat.vy = 0;
			
			// scale the sprite's size proportionally
			//cat.scale.set(0.5,0.5); */
		
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
	
		// meant to help with lagging frame rate
		// it's probably not meant to be this high, but thought I'd try it 
		PIXI.INTERACTION_FREQUENCY = 600;
	
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
		cat.y += cat.vy; */
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
	
	// mouse hover
	function dotHover() {
		console.log('hovering over: ' + this.year + ': ' + this.title);
		$('#dot-year').html(this.year);
	}
	
	// put dot click events in here
	function dotClick() {
		console.log('clicked');
        console.log('clicked on: ' + this.year);	
	}
	
} // close movieController();