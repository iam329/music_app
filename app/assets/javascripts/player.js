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
	}
]

var currentEp = 3;

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
		go = 0;
		$('.wrapper').show();
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
		$('.wrapper').fadeOut(400);
		$('#next').css("opacity", 0.2);
		$('#previous').fadeTo("opacity", 0.2);
		if(go==0){
			go = 1;
		}
		player.loadVideoById(playlist[currentEp-1].vid);	
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