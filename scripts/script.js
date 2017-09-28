$(document).ready(function() {
	
	// ---- GENRE FILTER ANIMATIONS: WIP ----
	
	var li = $('#genres ul li');

	genreFilter();
	function genreFilter() {
		var line;
		var active;
		
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
	};
});
