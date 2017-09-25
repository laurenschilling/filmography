//this is our controller - basically a function 
function movieController($scope, $http) {
    imageBase = "https://image.tmdb.org/t/p/";
    imageSize = 'w300/';// from https://developers.themoviedb.org/3/getting-started/images
    
    defaultImg = "blank.gif";
    
//    $scope.selectedArtist = "";
//    $scope.selectedArtistImage = IMAGE_ROOT + DEFAULT_IMAGE;
    
    $http.get('scripts/all-moviedata.json').success(function(data) {
        $scope.movies = data;
//         console.log(data);
    });

    //what happens when you click the ng-click in the movie list
    $scope.movieClick = function(movie) {
        $scope.selectedMovie = movie;
        console.log(movie);

        //if there is an image then add the filepath to the string 
        if( movie.poster_path ) {
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
}