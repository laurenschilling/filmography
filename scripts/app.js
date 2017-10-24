// this is our controller - basically a function 
function movieController($scope, $http) {
    imageBase = "https://image.tmdb.org/t/p/";
    imageSize = 'w300/';// from https://developers.themoviedb.org/3/getting-started/images
    
    defaultImg = "blank.gif";

    $http.get('scripts/all-moviedata.json').success(function(data) {
        $scope.movies = data;
    });
    
	// ---- GENRE FILTER HOVER ----

	var li = $('#genres ul li'),
		line;
	
	// hover on list item, show span line
	li.on('mouseover', function() {
		line = $(this).find('span');
		line.removeClass('move-line-back').addClass('move-line');
	});

	// exit hover on list item, hide span line	
	li.on('mouseleave', function() {	
		line.addClass('move-line-back').removeClass('move-line');
	});
    
        // ---- SPLASH SCREEN ----
    

$('#hover-event').addClass('close');
     $( ".button" ).click(function() {
        $("#splash" ).fadeOut('slow');
          $('#hover-event').removeClass('close').addClass('open');
});
 

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
	
	var stage = new Container();
	stage.interactive = false;
	var renderer = new PIXI.WebGLRenderer(canvasSize.width, canvasSize.height, {
	    transparent: !0,
	    view: document.getElementById('canvas')
	}, document.getElementById('canvas'), !1, !0);
	
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
	
    var offsetX = 0; // need to initialise this variable outside of setup() so the hover and click events recognise the x axis offset globally (for stage horizontal scroll)    
    
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
			dot.rating = currentMovie.vote_average;
            dot.match = false;
            dot.visible = true;
            
			// this seems to be a lifesaver! -ben
			// dot.hitArea = new Rectangle(-150, -150, 300, 300);
			dot.hitArea = new Rectangle(0, -34, 17, 17);
			
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
            
			// set the mouseover and click states
            dot.on('mouseover', dotHover).on('mouseout', dotLeave);
            dot.on('click', dotClick);
            
		} // close data/sprite loop
        
    	// ---- POSITION SPRITES ----
    
        var allYears = [];
        allYears.push(yr2017, yr2016, yr2015, yr2014, yr2013, yr2012, yr2011, yr2010, yr2009, yr2008, yr2007, yr2006, yr2005, yr2004, yr2003, yr2002, yr2001, yr2000, yr1999, yr1998, yr1997, yr1996, yr1995, yr1994, yr1993, yr1992, yr1991, yr1990, yr1989, yr1988, yr1987, yr1986, yr1985, yr1984, yr1983, yr1982, yr1981, yr1980, yr1979, yr1978, yr1977, yr1976, yr1975, yr1974, yr1973, yr1972, yr1971, yr1970, yr1969, yr1968, yr1967, yr1966, yr1965, yr1964, yr1963, yr1962, yr1961, yr1960, yr1959, yr1958, yr1957, yr1956, yr1955, yr1954, yr1953, yr1952, yr1951, yr1950, yr1949, yr1948, yr1947, yr1946, yr1945, yr1944, yr1943, yr1942, yr1941, yr1940, yr1939, yr1938, yr1937, yr1936, yr1935, yr1934, yr1933, yr1932, yr1931, yr1930, yr1929, yr1928, yr1927, yr1926, yr1925, yr1924, yr1923, yr1922, yr1921, yr1920, yr1919, yr1918, yr1917, yr1916, yr1915, yr1914, yr1913, yr1912, yr1911, yr1910, yr1909, yr1908, yr1907, yr1906, yr1905, yr1904, yr1903, yr1902);
        
        // for 'filled' columns (columns that take up the canvas height)
        var spritesToColumn = Math.floor(canvasSize.height/spriteHeight), // determine how many (whole) sprites fit the canvas height
            fullColumnHeight = spritesToColumn*spriteHeight, // get the total height a 'full' column of sprites will take up (in px)
            columnSpace = canvasSize.height - fullColumnHeight, // find the remainder unused column space (in px)
            offsetY = Math.floor(columnSpace/2); // divide columnSpace by 2 and round down (to offset y axis to vertically centre sprites)
        
        // to assign an invisible sprite to years with a value of 0, so they get picked up and positioned in the allYears[y][r] loop below, leaving a 'gap' for a year with no associated data
        for (y = 0; y < allYears.length; y++) {
            
            if (allYears[y] == 0) {
                var dot = new Sprite(texture);
                dot.alpha = 0;
				
                allYears[y].push(dot); }
        }
        
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

		// ---- SLIDER ----
        
        var columnsOnScreen = Math.floor(canvasSize.width / spriteWidth), // work out how many columns are visible on screen
            sliderWidth = (columnsOnScreen / columnsFromRight) * 100; // set the slider width to the percentage of columns on screen from the total no of columns
        
        $('#slider-block').css('width', sliderWidth + '%');
        
        // to find the length of the pink slider in pixels
        var sliderPx = $('#slider-block').outerWidth();
        
        // to get the slider to drag along the x axis
        $(function() {
            var slideWidth = $('.slider').width(),
                min = canvasSize.width - sliderPx,
                max = 0,
                stageMin = 0,
                stageMax = containerPx - canvasSize.width;

            $('#slider-block').draggable({
                axis: 'x',
                drag: function (event, ui) {
                    if (ui.position.left > min) {
                        ui.position.left = min;
                        stage.x = stageMin; }
                    if (ui.position.left < max) {
                        ui.position.left = max;
                        stage.x = stageMax; }
                }
            });
        });
        
        // to link the slider to the Pixi Container of data - the horizontal scroll
        var origSliderPos = $('#slider-block').position(),
            containerPx = columnsFromRight * spriteWidth,
            sliderMovSpace = canvasSize.width - sliderPx, // how many px the slider can move
            canvasMovSpace = containerPx - canvasSize.width, // how many px the canvas can move
            increment = canvasMovSpace / sliderMovSpace; // the relative increment to work out what slider movement increment triggers the canvas to move along x axis
     
        // to set the width of the decade container to match the stage width
        $('#decades-container').css('width', containerPx + 'px');
        
        $('#slider-block').mousemove(function() {
            newSliderPos = $('#slider-block').position();
            
            var originalLeft = Math.round(origSliderPos.left / 10) * 10, // to find slider left starting position to nearest 10px
                newLeft = Math.round(newSliderPos.left / 10) * 10, // to find the new slider left position to nearest 10px
                movement = originalLeft - newLeft; // to find how far in px the slider has moved

            // returns function
            stage.x = adjustStage(newLeft, originalLeft, increment, movement, stage.x);
            
            $('#decades').css('margin-right', -stage.x + 'px'); // so the decade markers drag with it
            
            offsetX = stage.x; // so hover event alignment updates with the movement of the stage
        });
        
        var offset = 15; // offset half the length of the year text so it sits in the middle, calcs below are a bit random but they work
        
        // position the 2015 year marker
        var median2015 = Math.round(yr2015.length / 2), // find the median number of the array
            pos2015 = yr2015[median2015].x, // find the x position of the median sprite
            x2015 = canvasSize.width - pos2015 - offset; // use that to position the 2015 year marker
        
        $('#y2015').css('margin-right', x2015 + 'px');
        
        // position the 2010 year marker
        var median2010 = Math.round(yr2010.length / 2),
            pos2010 = yr2010[median2010].x,
            x2010 = -(pos2010 - pos2015 + (offset*2));
        
        $('#y2010').css('margin-right', x2010 + 'px');
        
        // position the 2005 year marker
        var median2005 = Math.round(yr2005.length / 2),
            pos2005 = yr2005[median2005].x,
            x2005 = -(pos2005 - pos2010 + (offset*3));
        
        $('#y2005').css('margin-right', x2005 + 'px');
        
        // position the 2000 year marker
        var median2000 = Math.round(yr2000.length / 2),
            pos2000 = yr2000[median2000].x,
            x2000 = -(pos2000 - pos2005 + (offset*2));
        
        $('#y2000').css('margin-right', x2000 + 'px');
        
        // position the 1990 year marker
        var median1990 = Math.round(yr1990.length / 2),
            pos1990 = yr1990[median1990].x,
            x1990 = -(pos1990 - pos2000 + (offset*3));
        
        $('#y1990').css('margin-right', x1990 + 'px');
        
        // position the 1980 year marker
        var median1980 = Math.round(yr1980.length / 2),
            pos1980 = yr1980[median1980].x,
            x1980 = -(pos1980 - pos1990 + (offset*2.5));
        
        $('#y1980').css('margin-right', x1980 + 'px');
        
        // position the 1970 year marker
        var median1970 = Math.round(yr1970.length / 2),
            pos1970 = yr1970[median1970].x,
            x1970 = -(pos1970 - pos1980 + (offset*2.5));
        
        $('#y1970').css('margin-right', x1970 + 'px');
        
        // position the 1960 year marker
        var median1960 = Math.round(yr1960.length / 2),
            pos1960 = yr1960[median1960].x,
            x1960 = -(pos1960 - pos1970 + (offset*3));
        
        $('#y1960').css('margin-right', x1960 + 'px');
        
        // position the 1950 year marker
        var median1950 = Math.round(yr1950.length / 2),
            pos1950 = yr1950[median1950].x,
            x1950 = -(pos1950 - pos1960 + (offset*2.5));
        
        $('#y1950').css('margin-right', x1950 + 'px');
        
        // position the 1940 year marker
        var median1940 = Math.round(yr1940.length / 2),
            pos1940 = yr1940[median1940].x,
            x1940 = -(pos1940 - pos1950 + (offset*2.5));
        
        $('#y1940').css('margin-right', x1940 + 'px');
        
        // position the 1930 year marker - it only has one entry, not an ideal solution as you need to know the data
        var pos1930 = yr1930[0].x,
            x1930 = -(pos1930 - pos1940 + (offset*2.5));
        
        $('#y1930').css('margin-right', x1930 + 'px');
        
        // position the 1920 year marker - it only has one entry, not an ideal solution as you need to know the data
        var pos1920 = yr1920[0].x,
            x1920 = -(pos1920 - pos1930 + (offset*3));
        
        $('#y1920').css('margin-right', x1920 + 'px');
        
        // position the 1910 year marker - it has an invisible sprite, not an ideal solution as you need to know the data
        var pos1910 = yr1910[0].x,
            x1910 = -(pos1910 - pos1920 + (offset*2.5));
        
        $('#y1910').css('margin-right', x1910 + 'px');
        
        
         
		// ---- GENRE FILTER FUNCTIONALITY ----
		
        $('#genres ul li').on('click', function() {
            console.log('a genre filter has been clicked');

            var moviesWithCurrentGenre = [],
            	currGenreFilter = $(this).attr('data-link');

			// if active genre filter is clicked 'off', show all films
/*
			if ($(this).hasClass('active')) {
				
				console.log('this was an active class');
				
				for (var z = 0; z < allYears.length; z++) {

	                // loop through all movies in all years 
	                for (var a = 0; a < allYears[z].length; a++) {
	
	                    // make all films visible
	                    allYears[z][a].visible = true;  
	                }
	            }  
			}
*/
			
            // add active class to genre list item and span line
            $('#genres ul li').removeClass('active');
            $('#genres ul li').find('span').removeClass('span-active');
            $(this).toggleClass('active');
            $(this).find('span').toggleClass('span-active');

            // loop through all years 
            for (var z = 0; z < allYears.length; z++) {

                // loop through all movies in all years 
                for (var a = 0; a < allYears[z].length; a++) {

                    // push film genres into genre array
                    var film = allYears[z][a];                   
                    var genreArray = film.genre;
                    
                    // if genre array is undefined (i.e. invisible/fake/filler dot)
					if (genreArray === undefined) {
						console.log('year has 0 films');
					} 
						
					// else if it's an actual dot
					else {	                    
	                    // loop through genre array
	                    for (var b = 0; b < genreArray.length; b++) {
	                        // if genre array matches clicked filter
	                        if (genreArray[b] == currGenreFilter) {
	                            // assign all films matching the genre with match true
	                            film.match = true;
	                        };
		                }  
		                
		                if (film.match == true) {
	                        // push movie into movie with current genre array
	                        moviesWithCurrentGenre.push(allYears[z][a]);
	                        film.visible = true; // display sprite
 				            // console.log(film.title + ' ' + film.year + ' genres: ' + film.genre);
	                    } else {
							film.visible = false; // hide sprite
	                    }
                	}
		                
                // reset previous matches to false
				film.match = false;    
				
            	}
            }

            console.log('DONE');
            // log the amount of films with clicked genre
            console.log('No of movies that match: ' + moviesWithCurrentGenre.length); 

        }); // close genre filter click function 
        
        // set the game state
		state = play;
	 
		// start the game loop
		gameLoop();
	}
	
    function adjustStage(newSliderPosLeft, origSliderPosLeft, increment, movement, stageX) {
        
        if (newSliderPosLeft < origSliderPosLeft) {
            stageX = increment * movement; }
        return stageX;
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
	
	// ROUND NUMBER TO NEAREST HALF
	function roundHalf(num) {
	    return Math.round(num*2)/2;
	}
	
	// GET RANDOM INTEGER
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// ----- MOUSEOVER AND CLICK EVENTS -----

	// GLOBAL VARIABLES FOR MOUSEOVER AND MOUSEOUT
	var timer,
		$hoverDiv = $('#hover-event');
	
	// MOUSEOVER
	function dotHover() {
		
		$('#dot-year').html(this.year);
		
		var dotPosX = this.x,
			dotPosY = this.y,
			hoverDiv = document.getElementById('hover-event');
						
		// add data to hover div
		$('.event-image').attr('src', this.img);
		$('.event-title').html(this.title);		
		
		// position hover div left of cursor marker, show div
        hoverDiv.style.left = dotPosX + 180 + offsetX + 'px';
        hoverDiv.style.top = dotPosY + 'px';


		// prevent hover events from showing when hovering over the genre filter
        $(window).on('mousemove', function(e) {
	        if (e.pageX <= 220) {
		        $hoverDiv.removeClass('open');
		    } else {
				// hover delay
		        timer = setTimeout(function() {
					$hoverDiv.addClass('open');
		        }, 120);
		    }
		})
		
		// pink glow on cursor
        $('#cursor').addClass('pink-glow');
        
		// if hover div is close to the window's right edge, move div to the left	
	    if (dotPosX > ($(window).width() - 220 - 150)) {
			hoverDiv.style.left = dotPosX + 45 + 'px';
        }
		
		// if hover div is close to the window's bottom edge, move div up	
        if (dotPosY > ($(window).height() - 150)) {
			hoverDiv.style.top = dotPosY - 120 + 'px';	
// 			console.log('150 cat');
        } else if (dotPosY < ($(window).height() - 150) && dotPosY > ($(window).height() - 160)) {
	        hoverDiv.style.top = dotPosY - 110 + 'px';	       
// 	        console.log('150 - 170 cat'); 
        } else if (dotPosY < ($(window).height() - 160)) {
	        hoverDiv.style.top = dotPosY - 20 + 'px';
// 	        console.log('out of 170 cat');
        }
	
	}
	
	// MOUSEOUT
	function dotLeave() {
        $hoverDiv.removeClass('open');
	}
	
	// CLICK EVENTS
	function dotClick() {
        
		console.log('clicked on: ' + this.year + ': ' + this.title);
		console.log(this);
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
        
        // get film's rating, halve it and round to nearest half
        var halfRating = this.rating/2,
        	roundRating = roundHalf(halfRating),
        	star = "<i class='fa fa-star'></i>",
        	halfStar = "<i class='fa fa-star-half'></i>";
        
        // log ratings to console 
        console.log('original rating: ' + this.rating);
        console.log('half rating: ' + halfRating);
        console.log('rounded rating: ' + roundRating);
        
        // append rating to div using star icons
        // if rating is an integer, else if rating is a float
        if (Math.floor(roundRating) == roundRating && $.isNumeric(roundRating)) {
			$('.rating').html(star.repeat(roundRating));
        } else {
			$('.rating').html(star.repeat(roundRating - 0.5) + halfStar);
        }
                
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
		
		switch (numOfGenres) {
			case 1:
				$('.genre-ids').html(currGenres[0]); break;
			case 2:
				$('.genre-ids').html(currGenres[0] + ' and ' + currGenres[1]); break;
			case 3: 
				$('.genre-ids').html(currGenres[0] + ', ' + currGenres[1] + ' and ' + currGenres[2]); break;
			case 4: 
				$('.genre-ids').html(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ' and ' + currGenres[3]); break;
			case 5:
				$('.genre-ids').html(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ', ' + currGenres[3] + ' and ' + currGenres[4]); break;
			case 6:
				$('.genre-ids').html(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ', ' + currGenres[3] + ', ' + currGenres[4] + ' and ' + currGenres[5]); break;
			default: 
				$('.genre-ids').html(currGenres[0] + ', ' + currGenres[1] + ', ' + currGenres[2] + ', ' + currGenres[3] + ', ' + currGenres[4] + ', ' + currGenres[5] + ' and more!'); break;
		}

        // api call for specific data requests ie. director, cast, runtime        
        var currMovie = this.id,
        	key = "2385af2e8136eb616d2a12e316efa014",
			url = "https://api.themoviedb.org/3/movie/" + currMovie + "?api_key=" + key + "&append_to_response=credits,videos",
			castList = new Array();
	    
	    $.getJSON(url, function(data) {    
		    
		    // find top 4 actors and append to div
            for (var i = 0; i < 4; i++) {
                castList.push(data.credits.cast[i].name);
            }

            $('.actors').addClass('.names').html('<p>' + castList[0] + '</p>' + '<p>' + castList[1] + '</p>' + '<p>' + castList[2] + '</p>' +'<p>' + castList[3] + '</p>');
        
			// find directors and append to div
		    var directors = new Array();  
		     
		    data.credits.crew.forEach(function(entry) {
			    if (entry.job === 'Director') {
			        directors.push(entry.name);
			    }
			})
			
			// console.log('Director: ' + directors.join(', '));
	        $('.director').html("Director: " + directors);
	        $('.run-time').html(' ' + data.runtime + ' ' + 'min');
            
            // if budget or revenue is $0, display nothing
			// else round to nearest million
           // if less than 1m round to the nearest thousand
            if (data.budget === 0) {
                $('.budget').html(' ');
            } else if (data.budget < 1000000) {
                $('.budget').html('Budget: ' + '$' + Math.round(data.budget/1000) + 'k');
            }
            else {
                $('.budget').html('Budget: ' + '$' + Math.round(data.budget/1000000) + 'm');
            }
            
            if (data.revenue === 0) {
                $('.revenue').html(' ');
            } else if (data.revenue < 1000000) {
                $('.revenue').html('Revenue: ' + '$' + Math.round(data.revenue/1000) + 'k'); 
            }
            else {
	        	$('.revenue').html('Revenue:  ' + '$' + Math.round(data.revenue/1000000) + 'm');
            }
            
            
            // find trailer and append link to div
	        var trailer = "https://www.youtube.com/watch?v=" + data.videos.results[0].key;
	        console.log (trailer);
	        $('.trailer').attr('href', trailer);
			
			// find links to trivia and award pages on imdb
            var imdb = data.imdb_id,
            	awards = "http://www.imdb.com/title/" + imdb + "/awards?ref_=tt_ql_op_1",
            	trivia = "http://www.imdb.com/title/"+ imdb + "/trivia?ref_=tt_trv_trv"; 

            // console.log("IMDB ID is: " + imdb);
            // console.log("This IMDB link is: " + awards);
            
            $('.awards-trivia a:nth-child(1)').attr('href', awards);
            $('.awards-trivia a:nth-child(2)').attr('href', trivia); 
	   });  
	   
	   	// toggle pop up display
	   	// change background opacity and hide mouseover elements
	    popUp.toggle();
        if (popUp.css('display') === 'block') {
            $('#hover-event').removeClass('open').addClass('close');
            $('#current-year').hide();
            $('#line').hide();
            $('canvas').removeClass('add-opacity').addClass('min-opacity');
        } else {
            $('#hover-event').removeClass('close').addClass('open');
            $('#current-year').show();
            $('#line').show();
            $('canvas').addClass('add-opacity').removeClass('min-opacity');
        }
        
        // how to make pop up div close on canvas click?
/*
            $('canvas').on('click', function() {
	    		popUp.hide();
			})
*/
        	   
    } // close dotClick
    
} // close movieController();