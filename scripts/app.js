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
    
	// ---- GENRE FILTER ANIMATIONS: WIP ----
	
	var li = $('#genres ul li');

	$(function() {
		var line,
			active;
		
		// genre list item : enter hover
		// show span line
		li.bind('mouseover', function() {
			line = $(this).find('span');
			line.removeClass('move-line-back').addClass('move-line');
		});
	
		// genre list item : exit hover
		// hide span line	
		li.bind('mouseleave', function() {	
			line.addClass('move-line-back').removeClass('move-line');
		});
	});    

	// when genre filter is clicked, only show movies with that genre
	$('#genres ul li').on('click', function() {
		console.log('a genre filter has been clicked');
		var currGenreFilter = $(this).attr('data-link');
		console.log('current filter selected: ' + currGenreFilter);
	})
    

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
	    height: window.innerHeight - 60 - 30, /* subtract the height of the footer 60px and 15px * 2 for top and bottom margins */
	    width: window.innerWidth - 220 - 15 /* subtract the width of left sidebar 220px and 15px right margin */
	}
	
	var dataElements = {
	    mouse_move: $('#mouse-move'),
	    canvas: document.getElementById('canvas') // can't use jQuery for this it doesn't work
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
	// load textures and run setup function
	loader
		.add("images/dots.svg")
		.load(setup);
	
 
	// ----- FUNCTION SET UP ----- 
	
	function setup() {
		
		var texture = Texture.fromImage("images/dots-15.svg"),
		    length = $scope.movies.length,
			yr2017 = [], yr2016 = [], yr2015 = [], yr2014 = [], yr2013 = [], yr2012 = [], yr2011 = [], yr2010 = [], yr2009 = [], yr2008 = [], yr2007 = [], yr2006 = [], yr2005 = [], yr2004 = [], yr2003 = [], yr2002 = [], yr2001 = [], yr2000 = [], yr1999 = [], yr1998 = [], yr1997 = [], yr1996 = [], yr1995 = [], yr1994 = [], yr1993 = [], yr1992 = [], yr1991 = [], yr1990 = [], yr1989 = [], yr1988 = [], yr1987 = [], yr1986 = [], yr1985 = [], yr1984 = [], yr1983 = [], yr1982 = [], yr1981 = [], yr1980 = [], yr1979 = [], yr1978 = [], yr1977 = [], yr1976 = [], yr1975 = [], yr1974 = [], yr1973 = [], yr1972 = [], yr1971 = [], yr1970 = [], yr1969 = [], yr1968 = [], yr1967 = [], yr1966 = [], yr1965 = [], yr1964 = [], yr1963 = [], yr1962 = [], yr1961 = [], yr1960 = [], yr1959 = [], yr1958 = [], yr1957 = [], yr1956 = [], yr1955 = [], yr1954 = [], yr1953 = [], yr1952 = [], yr1951 = [], yr1950 = [], yr1949 = [], yr1948 = [], yr1947 = [], yr1946 = [], yr1945 = [], yr1944 = [], yr1943 = [], yr1942 = [], yr1941 = [], yr1940 = [], yr1939 = [], yr1938 = [], yr1937 = [], yr1936 = [], yr1935 = [], yr1934 = [], yr1933 = [], yr1932 = [], yr1931 = [], yr1930 = [], yr1929 = [], yr1928 = [], yr1927 = [], yr1926 = [], yr1925 = [], yr1924 = [], yr1923 = [], yr1922 = [], yr1921 = [], yr1920 = [], yr1919 = [], yr1918 = [], yr1917 = [], yr1916 = [], yr1915 = [], yr1914 = [], yr1913 = [], yr1912 = [], yr1911 = [], yr1910 = [], yr1909 = [], yr1908 = [], yr1907 = [], yr1906 = [], yr1905 = [], yr1904 = [], yr1903 = [], yr1902 = [], // for each year of data
            distanceFromRight, // for sprite px from right
            columnsFromRight = 0, // divide by sprite width to get 'columns' from right
            spriteWidth = 10, // including padding
            spriteHeight = 10, // including padding
            resetSpriteHeight = 10, // there is not supposed to be a resetSpriteHeight1
            resetSpriteHeight2 = 10, // in case canvas height means data spills to 2 columns
            resetSpriteHeight3 = 10, // in case canvas height means data spills to 3 columns
            resetSpriteHeight4 = 10, // in case canvas height means data spills to 4 columns
            resetSpriteHeight5 = 10, // in case canvas height means data spills to 5 columns
            resetSpriteHeight6 = 10, // in case canvas height means data spills to 6 columns
            resetSpriteHeight7 = 10, // in case canvas height means data spills to 7 columns
            resetSpriteHeight8 = 10, // in case canvas height means data spills to 8 columns
            resetSpriteHeight9 = 10, // in case canvas height means data spills to 9 columns
            resetSpriteHeight10 = 10, // in case canvas height means data spills to 10 columns
            resetSpriteHeight11 = 10, // in case canvas height means data spills to 11 columns
            resetSpriteHeight12 = 10; // in case canvas height means data spills to 12 columns
 
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
			dot.width = 8.5;
			dot.height = 8.5;
            dot.anchor.set = (0.5, 0.5);
			dot.x = 0;
            dot.y = 0;
			dot.year = parseInt(currentMovie.release_date.substring(0, 4)); 
			dot.genre = currentMovie.genre_ids;
			dot.title = currentMovie.title;
            dot.img = imageBase + imageSize + currentMovie.poster_path;
            dot.overview = currentMovie.overview;
			dot.id = currentMovie.id;            
            
			// this seems to be a lifesaver! -ben
			// dot.hitArea = new Rectangle(-150, -150, 300, 300);
			dot.hitArea = new Rectangle(0, 0, 15, 15);
			
			// push movie data for each year into array		
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
            
			// set the mouseover and click states - listed here: http://pixijs.download/v4.3.4/docs/PIXI.interaction.InteractionManager.html#event:click 
            dot.on('mouseover', dotHover).on('mouseout', dotLeave);
            dot.on('click', dotClick);
            
		} // close data/sprite loop
        
        var allYears = [];
        allYears.push(yr2017, yr2016, yr2015, yr2014, yr2013, yr2012, yr2011, yr2010, yr2009, yr2008, yr2007, yr2006, yr2005, yr2004, yr2003, yr2002, yr2001, yr2000, yr1999, yr1998, yr1997, yr1996, yr1995, yr1994, yr1993, yr1992, yr1991, yr1990, yr1989, yr1988, yr1987, yr1986, yr1985, yr1984, yr1983, yr1982, yr1981, yr1980, yr1979, yr1978, yr1977, yr1976, yr1975, yr1974, yr1973, yr1972, yr1971, yr1970, yr1969, yr1968, yr1967, yr1966, yr1965, yr1964, yr1963, yr1962, yr1961, yr1960, yr1959, yr1958, yr1957, yr1956, yr1955, yr1954, yr1953, yr1952, yr1951, yr1950, yr1949, yr1948, yr1947, yr1946, yr1945, yr1944, yr1943, yr1942, yr1941, yr1940, yr1939, yr1938, yr1937, yr1936, yr1935, yr1934, yr1933, yr1932, yr1931, yr1930, yr1929, yr1928, yr1927, yr1926, yr1925, yr1924, yr1923, yr1922, yr1921, yr1920, yr1919, yr1918, yr1917, yr1916, yr1915, yr1914, yr1913, yr1912, yr1911, yr1910, yr1909, yr1908, yr1907, yr1906, yr1905, yr1904, yr1903, yr1902);
        
        // for 'filled' columns (columns that take up the canvas height)
        var spritesToColumn = Math.floor(canvasSize.height/spriteHeight), // determine how many (whole) sprites fit the canvas height
            fullColumnHeight = spritesToColumn*spriteHeight, // get the total height a 'full' column of sprites will take up (in px)
            columnSpace = canvasSize.height - fullColumnHeight, // find the remainder unused column space (in px)
            offsetY = Math.floor(columnSpace/2); // divide columnSpace by 2 and round down (to offset y axis to vertically centre sprites)
        
        // wider loop for all years
        for (y = 0; y < allYears.length; y++) {
            
            for (r = 0; r < allYears[y].length; r++) {
                
                // for 'incomplete' columns of sprites
                var widthOfYear = Math.ceil(allYears[y].length/spritesToColumn) + (columnsFromRight), // to find number of columns the year will take up (have to include previous years - accumulative)
                    widthOfCurrYear = Math.ceil(allYears[y].length/spritesToColumn), // how many columns the current years takes up
                    incompleteColumnSprites = allYears[y].length - (spritesToColumn*(widthOfCurrYear - 1)), // to find the number of sprites in the incomplete column
                    incompleteColumnSpace = canvasSize.height - (incompleteColumnSprites*spriteHeight), // find the remainder unused column space
                    offsetYincomplete;
                    if (isOdd(spritesToColumn) == false) { // if the no of sprites in a full column is even
                        if (isOdd(incompleteColumnSprites)) { // if the no of sprites in the incomplete column is odd
                            offsetYincomplete = Math.floor(incompleteColumnSpace/2) + (spriteHeight/2);
                        } else {
                            offsetYincomplete = Math.floor(incompleteColumnSpace/2); }
                    } else { // if the no of sprites in a full column is odd
                        if (isOdd(incompleteColumnSprites)) { // if the no of sprites in the in the incomplete column is odd
                            offsetYincomplete = Math.floor(incompleteColumnSpace/2);
                        } else {
                            offsetYincomplete = Math.floor(incompleteColumnSpace/2) + (spriteHeight/2); }
                    }
                
                // 1st column
                allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 1); // 1 column
                if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) { // if this is an unfilled column
                    allYears[y][r].y = canvasSize.height - resetSpriteHeight - offsetYincomplete; // offset the y axis for incomplete column
                } else {
                    allYears[y][r].y = canvasSize.height - resetSpriteHeight - offsetY; } // otherwise use standard filled column y axis offset
                resetSpriteHeight += spriteHeight;
                distanceFromRight = canvasSize.width - allYears[y][r].x;
                
                // if more than 1 column
                if (allYears[y][r].y < 0) {
                    
                    allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 2); // 2 columns
                    if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                        allYears[y][r].y = canvasSize.height - resetSpriteHeight2 - offsetYincomplete;
                    } else {
                        allYears[y][r].y = canvasSize.height - resetSpriteHeight2 - offsetY;}
                    resetSpriteHeight2 += spriteHeight;
                    distanceFromRight = canvasSize.width - allYears[y][r].x;
                    
                    // if more than 2 columns
                    if (allYears[y][r].y < 0) {
                        
                        allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 3); // 3 columns
                        if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                            allYears[y][r].y = canvasSize.height - resetSpriteHeight3 - offsetYincomplete;
                        } else {
                            allYears[y][r].y = canvasSize.height - resetSpriteHeight3 - offsetY; }
                        resetSpriteHeight3 += spriteHeight;
                        distanceFromRight = canvasSize.width - allYears[y][r].x;

                        // if more than 3 columns
                        if (allYears[y][r].y < 0) {
                            
                            allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 4); // 4 columns
                            if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                allYears[y][r].y = canvasSize.height - resetSpriteHeight4 - offsetYincomplete;
                            } else {
                                allYears[y][r].y = canvasSize.height - resetSpriteHeight4 - offsetY; }
                            resetSpriteHeight4 += spriteHeight;
                            distanceFromRight = canvasSize.width - allYears[y][r].x;
                            
                            // if more than 4 columns
                            if (allYears[y][r].y < 0) {
                                
                                allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 5); // 5 columns
                                if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                    allYears[y][r].y = canvasSize.height - resetSpriteHeight5 - offsetYincomplete;
                                } else {
                                    allYears[y][r].y = canvasSize.height - resetSpriteHeight5 - offsetY; }
                                resetSpriteHeight5 += spriteHeight;
                                distanceFromRight = canvasSize.width - allYears[y][r].x;
                                
                                // if more than 5 columns
                                if (allYears[y][r].y < 0) {
                                    
                                    allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 6); // 6 columns
                                    if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                        allYears[y][r].y = canvasSize.height - resetSpriteHeight6 - offsetYincomplete;
                                    } else {
                                        allYears[y][r].y = canvasSize.height - resetSpriteHeight6 - offsetY; }
                                    resetSpriteHeight6 += spriteHeight;
                                    distanceFromRight = canvasSize.width - allYears[y][r].x;
                                    
                                    // if more than 6 columns
                                    if (allYears[y][r].y < 0) {
                                        
                                        allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 7); // 7 columns
                                        if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                            allYears[y][r].y = canvasSize.height - resetSpriteHeight7 - offsetYincomplete;
                                        } else {
                                            allYears[y][r].y = canvasSize.height - resetSpriteHeight7 - offsetY; }
                                        resetSpriteHeight7 += spriteHeight;
                                        distanceFromRight = canvasSize.width - allYears[y][r].x;
                                        
                                        // if more than 7 columns
                                        if (allYears[y][r].y < 0) {
                                            
                                            allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 8); // 8 columns
                                            if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                                allYears[y][r].y = canvasSize.height - resetSpriteHeight8 - offsetYincomplete;
                                            } else {
                                                allYears[y][r].y = canvasSize.height - resetSpriteHeight8 - offsetY; }
                                            resetSpriteHeight8 += spriteHeight;
                                            distanceFromRight = canvasSize.width - allYears[y][r].x;
                                            
                                            // if more than 8 columns
                                            if (allYears[y][r].y < 0) {
                                                
                                                allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 9); // 9 columns
                                                if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                                    allYears[y][r].y = canvasSize.height - resetSpriteHeight9 - offsetYincomplete;
                                                } else {
                                                    allYears[y][r].y = canvasSize.height - resetSpriteHeight9 - offsetY; }
                                                resetSpriteHeight9 += spriteHeight;
                                                distanceFromRight = canvasSize.width - allYears[y][r].x;
                                                
                                                // if more than 9 columns
                                                if (allYears[y][r].y < 0) {
                                                    
                                                    allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 10); // 10 columns
                                                    if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                                        allYears[y][r].y = canvasSize.height - resetSpriteHeight10 - offsetYincomplete;
                                                    } else {
                                                        allYears[y][r].y = canvasSize.height - resetSpriteHeight10 - offsetY; }
                                                    resetSpriteHeight10 += spriteHeight;
                                                    distanceFromRight = canvasSize.width - allYears[y][r].x;
                                                    
                                                    // if more than 10 columns
                                                    if (allYears[y][r].y < 0) {
                                                        
                                                        allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 11); // 11 columns
                                                        if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                                            allYears[y][r].y = canvasSize.height - resetSpriteHeight11 - offsetYincomplete;
                                                        } else {
                                                            allYears[y][r].y = canvasSize.height - resetSpriteHeight11 - offsetY; }
                                                        resetSpriteHeight11 += spriteHeight;
                                                        distanceFromRight = canvasSize.width - allYears[y][r].x;
                                                        
                                                        // if more than 11 columns
                                                        if (allYears[y][r].y < 0) {
                                                            
                                                            allYears[y][r].x = canvasSize.width - spriteWidth*(columnsFromRight + 12); // 12 columns
                                                            if (allYears[y][r].x == canvasSize.width - (spriteWidth*widthOfYear)) {
                                                                allYears[y][r].y = canvasSize.height - resetSpriteHeight12 - offsetYincomplete;
                                                            } else {
                                                                allYears[y][r].y = canvasSize.height - resetSpriteHeight12 - offsetY; }
                                                            resetSpriteHeight12 += spriteHeight;
                                                            distanceFromRight = canvasSize.width - allYears[y][r].x;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                stage.addChild(allYears[y][r]);
            }
            columnCalc();
            resetValues();
        } // close for loop for allYears
        
        // to determine an odd number
        function isOdd(n) {
            if (n % 2 != 0) {
                return true;
            } else {
                return false; }
        }
        
        // to determine number of columns from right
        function columnCalc() {
            columnsFromRight = distanceFromRight / spriteWidth; }
        
        // reset sprite height values for next year loop
        function resetValues() {
            resetSpriteHeight = 10, 
            resetSpriteHeight2 = 10,
            resetSpriteHeight3 = 10,
            resetSpriteHeight4 = 10,
            resetSpriteHeight5 = 10,
            resetSpriteHeight6 = 10,
            resetSpriteHeight7 = 10,
            resetSpriteHeight8 = 10,
            resetSpriteHeight9 = 10,
            resetSpriteHeight10 = 10,
            resetSpriteHeight11 = 10,
            resetSpriteHeight12 = 10; }
        
        // work out how many columns are visible on screen
        var columnsOnScreen = Math.floor(canvasSize.width / spriteWidth),
            sliderWidth = (columnsOnScreen / columnsFromRight) * 100;
        
        $('#slider-block').css('width', sliderWidth + '%');
        
        // to find the length of the pink slider in pixels
        var sliderPx = $('#slider-block').outerWidth();
        
        // to get the slider to drag along the x axis
        $(function() {
            var slideWidth = $('.slider').width(),
                min = canvasSize.width - sliderPx,
                max = 0;

            $('#slider-block').draggable({
                axis: 'x',
                drag: function (event, ui) {
                    if (ui.position.left > min) ui.position.left = min;
                    if (ui.position.left < max) ui.position.left = max;
                }
            }); 
        });
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
	
	// global variables for mouseover and mouseout
	var timer,
		$hoverDiv = $('#hover-event');
	
	// mouseover
	function dotHover() {
		//console.log('hovering over: ' + this.year + ': ' + this.title);
		$('#dot-year').html(this.year);

		//console.log('this dot is at x: ' + this.x + ' and y: ' + this.y);
		
		var dotPosX = this.x,
			dotPosY = this.y,
			hoverDiv = document.getElementById('hover-event');
					
		// add data to hover div
		$('.event-image').attr('src', this.img);
		$('.event-title').html(this.title);		
		
		// position hover div left of cursor marker, show div
        hoverDiv.style.left = dotPosX + 180 + 'px';
        hoverDiv.style.top = dotPosY + 'px';

		// hover delay
        timer = setTimeout(function() {
			$hoverDiv.addClass('open');
			console.log('hover event opened');
        }, 120);

        $('#cursor').addClass('pink-glow');
	}
	
	// mouseout
	function dotLeave() {
        $hoverDiv.removeClass('open');
		console.log('leave mouseover, hover event closed');
	}
	
	// click events
	function dotClick() {
        
		console.log('clicked on: ' + this.year + ': ' + this.title);
        var popUp = $('.detail'),
            popUpX = this.x,
			popUpY = this.y,
            popUpPosX = popUpX + 180 + 'px',
            popUpPosY = popUpY + 'px';
        
        // getting the pop up div to display where the hover div is
        popUp.css('left', popUpPosX);
        popUp.css('top', popUpPosY);
        
        // add movie details to pop up
        $('.detail-image').attr('src', this.img);
        $('.detail-title').html(this.title);
        $('.yr').html(this.year);
        $('.detail-overview').html(this.overview);
                        
        // if there is a genre id, find the genre name
		var currGenres = [];
		var ids = this.genre;			
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
		];	
		
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


        // api call for specific data requests ie. director, cast, runtime        
        var currMovie = this.id,
        	key = "2385af2e8136eb616d2a12e316efa014",
			url = "https://api.themoviedb.org/3/movie/" + currMovie + "?api_key=" + key + "&append_to_response=credits,videos",
			castList = new Array();
	    
	    $.getJSON(url, function(data) {    
		    
		    //request json data through get
            for (var i = 0; i < 4; i++) {
                castList.push(data.credits.cast[i].name);
            }
            
            $('.actors').addClass('.names').html('<p>' + castList[0] + '</p>' + '<p>' + castList[1] + '</p>' + '<p>' + castList[2] + '</p>' +'<p>' + castList[3] + '</p>');
			// $('.actors').empty().append('<li>' + castList[1] + '</li>'),
			// $('.actors').empty().append('<li>' + castList[2] + '</li>'),
			// $('.actors').empty().append('<li>' + castList[3] + '</li>');
			// console.log(castList);
        
		    var directors = new Array();  
		      
		    data.credits.crew.forEach(function(entry) {
			    if (entry.job === 'Director') {
			        directors.push(entry.name);
			    }
			})
			
			// console.log('Director: ' + directors.join(', '));
	        $('.director').html("Director: " + directors);
	        $('.run-time').html(' ' + data.runtime + ' ' + 'min');
            
            if (data.budget === 0) {
                $('.budget').html(' ');
            } else {
                $('.budget').html('Budget: ' + '$' + Math.round(data.budget/1000000) + 'm');
            }
            
            if (data.revenue === 0) {
                $('.revenue').html(' ');
            } else {
	        $('.revenue').html('Revenue:  ' + '$' + Math.round(data.revenue/1000000) + 'm');
            }
             
        // console.log(data.videos.results[0].id);
        var trailer = "https://www.youtube.com/watch?v=" + data.videos.results[0].key;
        console.log (trailer);
        $('.trailer').attr('href', trailer);
        
            var imdb = data.imdb_id;
            console.log("IMDB ID is: " + imdb);
            var awards = "http://www.imdb.com/title/" + imdb + "/awards?ref_=tt_ql_op_1";
            var trivia = "http://www.imdb.com/title/"+ imdb + "/trivia?ref_=tt_trv_trv"; 
            console.log("This IMDB link is: " + awards);
            $('.awards-trivia a:nth-child(1)').attr('href', awards);
            $('.awards-trivia a:nth-child(2)').attr('href', trivia); 
	   });  
	   
	    popUp.toggle();
        if (popUp.css('display') === 'block') {
            $('#hover-event').addClass('close');
            $('#current-year').hide();
            $('#line').hide();
            $('canvas').removeClass('add-opacity').addClass('min-opacity');
        } else {
            $('#hover-event').removeClass('close').addClass('open');
            $('#current-year').show();
            $('#line').show();
            $('canvas').addClass('add-opacity').removeClass('min-opacity');
        }
        	   
    } // close dotClick
    
} // close movieController();