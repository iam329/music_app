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
	},
	{
		'episode': 11,
		'title': 'We Don\'t Eat',
		'artist': 'James Vincent McMorrow',
		'vid': 'wayVq4BPS5Y'	
	},
	{
		'episode': 12,
		'title': 'Thieves',
		'artist': 'The Beach',
		'vid': 'VC13qNcTKJw'	
	}
]

var currentEp = 12;

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

//TODO: SET TIMEOUT FOR PHOENIX SCENE OF 5 SECONDS
//TODO: CREATE BOOLEAN THAT EVALUATES TO TRUE ONCE PHOENIX SCENE TIMES OUT
//TODO: *** IF WINDOW LOADS BOOLEAN IS TRUE *** 
//TODO: HIDE PHOENIX SCENE
//TODO: REMOVE CLASS 'HIDDEN' FROM PLAYER AND WRAPPER
//TODO: ADD CLASS 'FADEIN' TO WRAPPER, INNER WRAPPER AND CONTROLS WRAPPER
//TODO: *** ELSE ***
//TODO: SET PHOENIX BOOLEAN TO FALSE
//TODO: REPLAY ANIMATION FOR ANOTHER 5 SECONDS AND THEN EVALUATE IF STATEMENT AGAIN 


//TODO: STRIPES ARRAY
//TODO: FOR LOOP THROUGH STRIPES
//TODO: IF RED, THEN SET TO PURPLE
//TODO: IF BLUE, THEN SET TO RED
//TODO: IF PURPLE, THEN SET TO BlUE

var stripes = document.getElementsByClassName("stripe");
var tagLines = ["Tape", "Deck", "Hero"];
var t = 0;

var colourInterval = setInterval(function(){
	for(var i = 0; i<stripes.length; i++) {
		if(stripes[i].className.indexOf("red")>-1){
			stripes[i].className = stripes[i].className.replace("red", "");
			stripes[i].className += "purple";
		} else if(stripes[i].className.indexOf("blue")>-1){
			stripes[i].className = stripes[i].className.replace("blue", "");
			stripes[i].className += "red";
		} else if(stripes[i].className.indexOf("purple")>-1){
			stripes[i].className = stripes[i].className.replace("purple", "");
			stripes[i].className += "blue";
		}
	}
}, 200);

var tagLineInterval = setInterval(function(){
	if(t<tagLines.length){
		document.getElementsByClassName("tagLine")[0].innerHTML = tagLines[t];
		t++;	
	} else {
		t=0;
	} 
	console.log(t);
}, 400);

$(document).ready(function(){

	document.getElementById('player').style.visibility = "hidden";

	$('.episode').text("Episode "+playlist[currentEp-1].episode);
	$('.title').text(playlist[currentEp-1].title);
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
                document.getElementById('player').style.display='none';
                $('.wrapper').fadeOut(400);
                window.location.href = 'https://www.youtube.com/watch?v='+playlist[currentEp-1].vid;
            }
            else {
                $('.wrapper').fadeOut(400);
                $('#next').css("opacity", 0.2);
                $('#previous').fadeTo("opacity", 0.2);
                if(go==0){
                    go = 1;
                }

                document.getElementById('player').style.visibility = "visible";
                player.loadVideoById(playlist[currentEp-1].vid);
            }
        });

        $('#next').click(function(){
            nextEp();
            $('.episode').text("Episode "+playlist[currentEp-1].episode);
            $('.title').text(playlist[currentEp-1].title);
            $('.artist').text(playlist[currentEp-1].artist);
        });

        $('#previous').click(function(){
            prevEp();
            $('.episode').text("Episode "+playlist[currentEp-1].episode);
            $('.title').text(playlist[currentEp-1].title);
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