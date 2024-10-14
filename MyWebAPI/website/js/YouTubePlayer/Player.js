function CreatePlayer(link) {
    var tag = document.createElement('script');
    tag.src = `${link}`;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

var player;
var done = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'z0DnBiM3DtQ',
        playerVars: {
            'autoplay': 0,
            'disablekb': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

CreatePlayer("https://www.youtube.com/iframe_api");
