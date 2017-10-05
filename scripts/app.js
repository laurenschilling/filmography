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
        var yr2017 = [], yr2016 = [], yr2015 = [], yr2014 = [], yr2013 = [], yr2012 = [], yr2011 = [], yr2010 = [], yr2009 = [], yr2008 = [], yr2007 = [], yr2006 = [], yr2005 = [], yr2004 = [], yr2003 = [], yr2002 = [], yr2001 = [], yr2000 = [], yr1999 = [], yr1998 = [], yr1997 = [], yr1996 = [], yr1995 = [], yr1994 = [], yr1993 = [], yr1992 = [], yr1991 = [], yr1990 = [], yr1989 = [], yr1988 = [], yr1987 = [], yr1986 = [], yr1985 = [], yr1984 = [], yr1983 = [], yr1982 = [], yr1981 = [], yr1980 = [], yr1979 = [], yr1978 = [], yr1977 = [], yr1976 = [], yr1975 = [], yr1974 = [], yr1973 = [], yr1972 = [], yr1971 = [], yr1970 = [], yr1969 = [], yr1968 = [], yr1967 = [], yr1966 = [], yr1965 = [], yr1964 = [], yr1963 = [], yr1962 = [], yr1961 = [], yr1960 = [], yr1959 = [], yr1958 = [], yr1957 = [], yr1956 = [], yr1955 = [], yr1954 = [], yr1953 = [], yr1952 = [], yr1951 = [], yr1950 = [], yr1949 = [], yr1948 = [], yr1947 = [], yr1946 = [], yr1945 = [], yr1944 = [], yr1943 = [], yr1942 = [], yr1941 = [], yr1940 = [], yr1939 = [], yr1938 = [], yr1937 = [], yr1936 = [], yr1935 = [], yr1934 = [], yr1933 = [], yr1932 = [], yr1931 = [], yr1930 = [], yr1929 = [], yr1928 = [], yr1927 = [], yr1926 = [], yr1925 = [], yr1924 = [], yr1923 = [], yr1922 = [], yr1921 = [], yr1920 = [], yr1919 = [], yr1918 = [], yr1917 = [], yr1916 = [], yr1915 = [], yr1914 = [], yr1913 = [], yr1912 = [], yr1911 = [], yr1910 = [], yr1909 = [], yr1908 = [], yr1907 = [], yr1906 = [], yr1905 = [], yr1904 = [], yr1903 = [], yr1902 = [];
        
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
            dot.x = 0;
            dot.y = 0;
			//dot.position.set(d * 12.5, canvasSize.height/2);
            
			dot.year = parseInt($scope.movies[d].release_date.substring(0, 4)); 
			dot.genre = $scope.movies[d].genre_ids;
			dot.title = currentMovie.title;
			
			// this seems to be a lifesaver! -ben
			dot.hitArea = new Rectangle(-150, -150, 300, 300);
			
            // contain the sprites ** not working **
			// contain(dot, {x: 0, y: 0, width: canvasSize.width, height: canvasSize.height});
			
            switch (dot.year) {
                case 2017: yr2017.push(dot); break;
                case 2016: yr2016.push(dot); break;
                case 2015: yr2015.push(dot); break;
                case 2014: yr2014.push(dot); break;
                case 2013: yr2013.push(dot); break;
                case 2012: yr2012.push(dot); break;
                case 2011: yr2011.push(dot); break;
                case 2010: yr2010.push(dot); break;
                case 2009: yr2009.push(dot); break;
                case 2008: yr2008.push(dot); break;
                case 2007: yr2007.push(dot); break;
                case 2006: yr2006.push(dot); break;
                case 2005: yr2005.push(dot); break;
                case 2004: yr2004.push(dot); break;
                case 2003: yr2003.push(dot); break;
                case 2002: yr2002.push(dot); break;
                case 2001: yr2001.push(dot); break;
                case 2000: yr2000.push(dot); break;
                case 1999: yr1999.push(dot); break;
                case 1998: yr1998.push(dot); break;
                case 1997: yr1997.push(dot); break;
                case 1996: yr1996.push(dot); break;
                case 1995: yr1995.push(dot); break;
                case 1994: yr1994.push(dot); break;
                case 1993: yr1993.push(dot); break;
                case 1992: yr1992.push(dot); break;
                case 1991: yr1991.push(dot); break;
                case 1990: yr1990.push(dot); break;
                case 1989: yr1989.push(dot); break;
                case 1988: yr1988.push(dot); break;
                case 1987: yr1987.push(dot); break;
                case 1986: yr1986.push(dot); break;
                case 1985: yr1985.push(dot); break;
                case 1984: yr1984.push(dot); break;
                case 1983: yr1983.push(dot); break;
                case 1982: yr1982.push(dot); break;
                case 1981: yr1981.push(dot); break;
                case 1980: yr1980.push(dot); break;
                case 1979: yr1979.push(dot); break;
                case 1978: yr1978.push(dot); break;
                case 1977: yr1977.push(dot); break;
                case 1976: yr1976.push(dot); break;
                case 1975: yr1975.push(dot); break;
                case 1974: yr1974.push(dot); break;
                case 1973: yr1973.push(dot); break;
                case 1972: yr1972.push(dot); break;
                case 1971: yr1971.push(dot); break;
                case 1970: yr1970.push(dot); break;
                case 1969: yr1969.push(dot); break;
                case 1968: yr1968.push(dot); break;
                case 1967: yr1967.push(dot); break;
                case 1966: yr1966.push(dot); break;
                case 1965: yr1965.push(dot); break;
                case 1964: yr1964.push(dot); break;
                case 1963: yr1963.push(dot); break;
                case 1962: yr1962.push(dot); break;
                case 1961: yr1961.push(dot); break;
                case 1960: yr1960.push(dot); break;
                case 1959: yr1959.push(dot); break;
                case 1958: yr1958.push(dot); break;
                case 1957: yr1957.push(dot); break;
                case 1956: yr1956.push(dot); break;
                case 1955: yr1955.push(dot); break;
                case 1954: yr1954.push(dot); break;
                case 1953: yr1953.push(dot); break;
                case 1952: yr1952.push(dot); break;
                case 1951: yr1951.push(dot); break;
                case 1950: yr1950.push(dot); break;
                case 1949: yr1949.push(dot); break;
                case 1948: yr1948.push(dot); break;
                case 1947: yr1947.push(dot); break;
                case 1946: yr1946.push(dot); break;
                case 1945: yr1945.push(dot); break;
                case 1944: yr1944.push(dot); break;
                case 1943: yr1943.push(dot); break;
                case 1942: yr1942.push(dot); break;
                case 1941: yr1941.push(dot); break;
                case 1940: yr1940.push(dot); break;
                case 1939: yr1939.push(dot); break;
                case 1938: yr1938.push(dot); break;
                case 1937: yr1937.push(dot); break;
                case 1936: yr1936.push(dot); break;
                case 1935: yr1935.push(dot); break;
                case 1934: yr1934.push(dot); break;
                case 1933: yr1933.push(dot); break;
                case 1932: yr1932.push(dot); break;
                case 1931: yr1931.push(dot); break;
                case 1930: yr1930.push(dot); break;
                case 1929: yr1929.push(dot); break;
                case 1928: yr1928.push(dot); break;
                case 1927: yr1927.push(dot); break;
                case 1926: yr1926.push(dot); break;
                case 1925: yr1925.push(dot); break;
                case 1924: yr1924.push(dot); break;
                case 1923: yr1923.push(dot); break;
                case 1922: yr1922.push(dot); break;
                case 1921: yr1921.push(dot); break;
                case 1920: yr1920.push(dot); break;
                case 1919: yr1919.push(dot); break;
                case 1918: yr1918.push(dot); break;
                case 1917: yr1917.push(dot); break;
                case 1916: yr1916.push(dot); break;
                case 1915: yr1915.push(dot); break;
                case 1914: yr1914.push(dot); break;
                case 1913: yr1913.push(dot); break;
                case 1912: yr1912.push(dot); break;
                case 1911: yr1911.push(dot); break;
                case 1910: yr1910.push(dot); break;
                case 1909: yr1909.push(dot); break;
                case 1908: yr1908.push(dot); break;
                case 1907: yr1907.push(dot); break;
                case 1906: yr1906.push(dot); break;
                case 1905: yr1905.push(dot); break;
                case 1904: yr1904.push(dot); break;
                case 1903: yr1903.push(dot); break;
                case 1902: yr1902.push(dot); break;
                default: break;
            }
            
			// set the mouseover and click states
            // listed here: http://pixijs.download/v4.3.4/docs/PIXI.interaction.InteractionManager.html#event:click 
            dot.on('mouseover', dotHover);
            dot.on('click', dotClick);            
            
		} // close data/sprite loop
				
        // this loops through 2017 data, I'm sure we could create a function for this, I'm just terrible at functions - Steph
        for (y = 0; y < yr2017.length; y++) {
            
            console.log(yr2017[y]);
            
            // initially positon first sprite bottom right
            yr2017[y].transform.position.x = canvasSize.width - spriteWidth;
            yr2017[y].transform.position.y = canvasSize.height - spriteHeight;
            spriteHeight += 15; // ensures next sprite sits 'above'
            distanceFromRight = canvasSize.width - yr2017[y].transform.position.x; // calculates how far in px the sprite is from right
            
            if (yr2017[y].transform.position.y < 0) { // within 2017 loop - if sprites proceed past top of y axis
                yr2017[y].transform.position.x = canvasSize.width - (spriteWidth*2); // 2nd column
                yr2017[y].transform.position.y = canvasSize.height - resetSpriteHeight1;
                resetSpriteHeight1 += 15;
                distanceFromRight = canvasSize.width - yr2017[y].transform.position.x;

                if (yr2017[y].transform.position.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                    yr2017[y].transform.position.x = canvasSize.width - (spriteWidth*3); // 3rd column
                    yr2017[y].transform.position.y = canvasSize.height - resetSpriteHeight2;
                    resetSpriteHeight2 += 15;
                    distanceFromRight = canvasSize.width - yr2017[y].transform.position.x;

                    if (yr2017[y].transform.position.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                        yr2017[y].transform.position.x = canvasSize.width - (spriteWidth*4); // 4th column
                        yr2017[y].transform.position.y = canvasSize.height - resetSpriteHeight3;
                        resetSpriteHeight3 += 15;
                        distanceFromRight = canvasSize.width - yr2017[y].transform.position.x;

                        if (yr2017[y].transform.position.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                            yr2017[y].transform.position.x = canvasSize.width - (spriteWidth*5); // 5th column
                            yr2017[y].transform.position.y = canvasSize.height - resetSpriteHeight4;
                            resetSpriteHeight4 += 15;
                            distanceFromRight = canvasSize.width - yr2017[y].transform.position.x;

                            if (yr2017[y].transform.position.y < 0) { // within 2017 loop - if sprites still proceed past top of y axis
                                yr2017[y].transform.position.x = canvasSize.width - (spriteWidth*6); // 6th column
                                yr2017[y].transform.position.y = canvasSize.height - resetSpriteHeight5;
                                resetSpriteHeight5 += 15;
                                distanceFromRight = canvasSize.width - yr2017[y].transform.position.x;
                            }
                        }
                    }
                }
            }
        
        // add dot sprites to stage						
		stage.addChild(yr2017[y]);

        }
              
        columnsFromRight = distanceFromRight / 15;
        
        console.log(columnsFromRight);
           
 
        /*spriteHeight = 15, 
        resetSpriteHeight1 = 15,
        resetSpriteHeight2 = 15,
        resetSpriteHeight3 = 15,
        resetSpriteHeight4 = 15,
        resetSpriteHeight5 = 15;*/

       /* if (dot.year === 2016) {
            dot.x = canvasSize.width - spriteWidth*(columnsFromRight + 1);
            //this currently doesn't work and we can't use a number as we won't 'know' what that number is, so need a variable fed from 2017 aka year proceeding

            dot.y = canvasSize.height - spriteHeight;
            // accessing the spriteHeight variable messes with 2017
            spriteHeight += 15;
            // accessing the spriteHeight variable messes with 2017

        } // close 2016 loop*/
			
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