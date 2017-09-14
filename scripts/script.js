$(document).ready(function() {
	
	// custom filmography scripts to go in here
	
	
	// ---- GENRE FILTER ANIMATIONS: WIP ----
	
	var li = $('#genre li');
// 	var line = li.find('span.line');
	
	// when mouse enters genre list item (hover start)
	// show span line
	li.mouseover(function() {
		console.log(this);
		$(this).find('span.line').css({
			transform: "translateX(25px)",
			transition: "all 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950)" 
		})
	});

	// when mouse exits genre list item (hover end)
	// hide span line	
	li.mouseleave(function() {	
		$(this).find('span.line').css({
			transform: "translateX(-25px)",
			transition: "all 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950)"
		})
	});
	
});