
var speed = 50/15,
	projects = [],
	timeout,
	windowWidth=window.innerWidth;


$( document ).ready( function() {
	initialize();
	calculateTrack();
	run();
});

$("#slider-container").stick_in_parent();

/*==============================
=            Events            =
==============================*/

$( window ).resize( function(){
	if(windowWidth !== window.innerWidth){
		clearTimeout(timeout);
		calculateTrack();
		run();
	}
});


$( '.project-header' ).click(function(){
	$(this).find('.project-description').toggleClass('hidden');
});


$('#about-link').click(function(e){
	e.preventDefault();
	var x = $('#footer').offset().top;
    $("html, body").animate({ scrollTop: x }, 600);
    return false;
});

$('.project-bilder').click(function(){
	var index = $('.project-bilder').index(this);
	projects[index].running = !projects[index].running;
});
/*=====  End of Events  ======*/


/*=================================
=            functions            =
=================================*/

// Duplicate Images for Loop
var initialize = function(){
	$('.project-bilder').each(function(i){
		var track = $(this).find('.container-inner .track');
		track.children().clone().appendTo(track);
	});
}

var calculateTrack = function(){

	projects = [];

	$('.project-bilder').each(function(i){

		var track = $(this).find('.container-inner .track');
		
		// determin image width
		if(window.innerWidth >= 768){
			var imgWidth = $(this).find('.container-inner').width() / 2;
		}else{
			var imgWidth = $(this).find('.container-inner').width() / 1;
		}

		// set direction
		var direction = 1;
		if(Math.abs(i % 2) == 1){
			direction = -1;
		}

		// set project array
		var project = {
			length: track.children().length/2,
			width: imgWidth * track.children().length/2,
			running: true,
			offset: 0,
			direction: direction,
		};
		projects.push(project);

		// set image styles
		track.children().each(function(i){
			$(this).css('left', imgWidth * i +'px')
		});

		// set initial offset
		$(this).find('.track').css( 'transform' , 'translate('+-1*project.offset+'px,0)');
		
		// direction offset
		if(project.direction === 1){
			$(this).find('.track').css( 'left' , -project.width+'px');
		}

	});
};

var run = function(){
	timeout = setTimeout(function(){

	$('.track').each(function(i){
		var project = projects[i]
		if(project.running){

			project.offset += speed;

			if(project.offset > project.width){
				project.offset -= project.width;
			};
			
			$(this).css( 'transform' , 'translate('+project.direction*project.offset+'px,0)');
		};
	});
	run();
	},20)
}

/*=====  End of functions  ======*/


/*==============================
=            Slider            =
==============================*/

var slider = document.getElementById("speed");

slider.oninput = function() {
    speed = this.value/15;
}

/*=====  End of Slider  ======*/