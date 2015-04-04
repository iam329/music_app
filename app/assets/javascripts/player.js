var playlist = [
	{
		'episode': 1,
		'title': 'Elysium',
		'artist': 'Bear\'s Den',
		'vid': 'BH-wP2TDUBQ'
	},
	{
		'episode': 2,
		'title': 'I Don\'t Want To Go Home',
		'artist': 'Nick Mulvey',
		'vid': 'hMQSlY6CNms'	
	},
	{
		'episode': 3,
		'title': 'Gold',
		'artist': 'Chet Faker',
		'vid': 'hi4pzKvuEQM'
	},
	{
		'episode': 4,
		'title': 'Bottled Up Tight',
		'artist': 'Luke Sital-Singh',
		'vid': '9GDFbVssI4c'
	},
	{
		'episode': 5,
		'title': 'Kathleen',
		'artist': 'Catfish and the Bottlemen',
		'vid': 'xrrcVxnjJO8'	
	},
	{
		'episode': 6,
		'title': 'Coffee',
		'artist': 'Sylvan Esso',
		'vid': 'Qr5AIKRPIHo'	
	},
	{
		'episode': 7,
		'title': 'Do You Even Know?',
		'artist': 'Rae Morris',
		'vid': '9Nz-GlhKZVg'	
	},
	{
		'episode': 8,
		'title': 'Heaven',
		'artist': 'Amber Run',
		'vid': 'zpFfWYO2K08'	
	},
	{
		'episode': 9,
		'title': 'Young Blood',
		'artist': 'Saint Raymond',
		'vid': 'kLj8aDWE-Es'	
	},
	{
		'episode': 10,
		'title': 'Brother',
		'artist': 'The Mispers',
		'vid': 'HscX4-rkERE'	
	}
]

var currentEp = 10;

// on opening scene go is 0 so that nextEp and prevEp only scroll through playlist carousel
// once play button is hit go is set to 1 and nextEp and prevEp scroll and load vids
var go = 0;

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: window.innerHeight,
    width: window.innerWidth,
    videoId: playlist[currentEp-1].vid,
    playerVars: {
    	'showinfo': 0,
    	'controls': 2,
    	'bq': 'hd1080',
    	'color': 'red',
    	'fs': 0
    },
    events: {
    	'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event){
	if(event.data == YT.PlayerState.ENDED){
		nextEp();
	}
}

function nextEp(){
	player.stopVideo();
	if(playlist.length>1 && currentEp < playlist.length){
		currentEp++;
		console.log(currentEp);
		if(go == 1){
			player.loadVideoById(playlist[currentEp-1].vid);	
		}
	}
	else if(playlist.length>1 && currentEp == playlist.length){
		currentEp = 1;
		console.log(currentEp);
		if(go == 1){
			player.loadVideoById(playlist[currentEp-1].vid);
		}
	}	
}

function prevEp(){
	player.stopVideo();
	if(playlist.length>1 && currentEp > 1){
		currentEp--;
		console.log(currentEp);
		if(go == 1){
			player.loadVideoById(playlist[currentEp-1].vid);	
		}
	}
	else if(playlist.length>1 && currentEp==1){
		currentEp = playlist.length;
		console.log(currentEp);
		if(go == 1){
			player.loadVideoById(playlist[currentEp-1].vid);
		}
	}
}

$(document).ready(function(){
	$('inner-wrapper').fadeIn(300);

	$('.episode').text("Episode "+playlist[currentEp-1].episode);
	$('.title').text("''"+playlist[currentEp-1].title+"''");
	$('.artist').text(playlist[currentEp-1].artist);

	$('#play').click(function(){
		if( navigator.userAgent.match(/Android/i)
 		 || navigator.userAgent.match(/webOS/i)
 		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)
 		){
			window.location.href = 'https://www.youtube.com/watch?v='+playlist[currentEp-1].vid;
 		} else {
 			$('.wrapper').fadeOut(400);
			$('#next').css("opacity", 0.2);
			$('#previous').fadeTo("opacity", 0.2);
			if(go==0){
				go = 1;
			}
 			player.loadVideoById(playlist[currentEp-1].vid);	
 		}
	});

	$('#next').click(function(){
		nextEp();
		$('.episode').text("Episode "+playlist[currentEp-1].episode);
		$('.title').text("''"+playlist[currentEp-1].title+"''");
		$('.artist').text(playlist[currentEp-1].artist);
	});

	$('#previous').click(function(){
		prevEp();
		$('.episode').text("Episode "+playlist[currentEp-1].episode);
		$('.title').text("''"+playlist[currentEp-1].title+"''");
		$('.artist').text(playlist[currentEp-1].artist);
	});

	$('#next').mouseenter(function(){
		$('#next').css('opacity', 1);
	});

	$('#next').mouseleave(function(){
		$('#next').css('opacity', 0.2);
	});

	$('#previous').mouseenter(function(){
		$('#previous').css('opacity', 1);
	});

	$('#previous').mouseleave(function(){
		$('#previous').css('opacity', 0.2);
	});

	$(window).resize(function() {
		var height = window.innerHeight;
		var width = window.innerWidth;
		$('body').find('iframe').attr('height', height);
		$('body').find('iframe').attr('width', width);
	});	
});