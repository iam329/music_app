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
	}
]


var currentEp = 2;

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
    }
    });
}

$(document).ready(function(){
	$('inner-wrapper').fadeIn(300);

	$('.episode').text("Episode "+playlist[currentEp-1].episode);
	$('.title').text("''"+playlist[currentEp-1].title+"''");
	$('.artist').text(playlist[currentEp-1].artist);

	$('#play').click(function(){
		$('.wrapper').fadeOut(400);
		player.playVideo();	
	});

	$(window).resize(function() {
		var height = window.innerHeight;
		var width = window.innerWidth;
		$('body').find('iframe').attr('height', height);
		$('body').find('iframe').attr('width', width);
	});	

});