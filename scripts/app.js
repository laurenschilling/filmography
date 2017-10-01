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
/*
		
		$scope.selectedGenre = currGenreFilter;
		var ngRepeat = $('.films li').attr('ng-repeat');
		ngRepeat.empty().append("movie in selectedGenre");
*/
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
	    current_year: $('#current-year'), // WIP
	    canvas: document.getElementById('canvas'), // can't use jQuery for this it doesn't work
	    //footer: $('footer')
	    // a few other elements will go in here
	}
	
	var stage = new Container();
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
	
	// define global variables
	var texture, dot, dotContainer;
	
	
	// ----- FUNCTION SET UP ----- 
	
	function setup() {
		
		texture = Texture.fromImage("images/dots.svg");
        dot = []; // array for the 5600+ dots (sprites)
        dotContainer = new ParticleContainer(); // create new particle container to hold dots
				
		// loop through movie data to create dot sprites 
		for (var d = 0; d < $scope.movies.length; d++) {
			
			// create a dot sprite for the number of movies
			dot[d] = new Sprite(texture);
			dot[d].interactive = true;
			dot[d].width = 60;
			dot[d].height = 60;
			dot[d].position.set(d * 10, 0);
			contain(dot[d], {x: 0, y: 0, width: canvasSize.width, height: canvasSize.height});
            dot[d].year = $scope.movies[d].release_date.substring(0, 4); // add movie release year to sprite - need to test this

			// add dot sprites to particle container
			dotContainer.addChild(dot[d]);
		}
        
        console.log(dot[5].year); // to test to see if the year for the 6th film in the loop pops up, it does!
	
		// when loop is finished, add particle container to stage
		stage.addChild(dotContainer);

		/*cat = new Sprite(id["cat.png"]);
		cat.position.set(16,16);
		cat.width = 80;
		cat.height = 120;
		
			// initialise the cat's velocity variables
			cat.vx = 0;
			cat.vy = 0;
			
			// scale the sprite's size proportionally
			cat.scale.set(0.5,0.5); */
		
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
		PIXI.INTERACTION_FREQUENCY = 60;
	
	/*
		// apply the velocity values to the cat's position to make it move
		cat.x += cat.vx;
		cat.y += cat.vy; */
		
	}
    
    // year marker moves with cursor within canvas - outside of play() function it seems a bit less laggy or am I imagining it? 
    $(canvas).on('mousemove', function(e) {
			
        var mouseMove = document.getElementById('mouse-move');
        var cursor = document.getElementById('cursor');
        var offset = 20;
        var x = e.pageX;
        var y = e.pageY;
			
        mouseMove.style.left = x + 'px';
        cursor.style.top = y + 'px';			
    });
    
    // testing the canvas click event - don't put in play() function as it doesn't work as intended
    dataElements.mouse_move.click(function() {
        console.log('you clicked the canvas');
    });
	
	
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
	
} // close movieController();