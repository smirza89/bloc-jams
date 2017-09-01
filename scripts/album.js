

var createSongRow = function(songNumber, songName, songLength){
    var template =  
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
    + '</tr>'
    ;
    var $row=$(template);
    var onhover = function(event) {
         // Placeholder for function logic
         
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber != currentlyPlayingSongNumber){
            
            songNumberCell.html(playbuttonTemplate);

        }
     };
     var offhover = function(event) {
         // Placeholder for function logic
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        // #2
        
          if (songNumber !== currentlyPlayingSongNumber) {
              songNumberCell.html(songNumber);
             }
     };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onhover,offhover);
    return $row;
}


var updatePlayerBarSong = function(){
    if(currentSongFromAlbum == null){
        console.log("nn");
        currentSongFromAlbum.title = " ";
        currentAlbum.artist = " ";
    }
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseTemplate)
    setTotalTimeInPlayerBar(currentSongFromAlbum.duration);
}


var setCurrentAlbum = function(album){
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList =$('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' +album.label);
    $albumImage.attr('src',album.albumArtUrl);

    $albumSongList.empty();
    
    for(var i=0; i<album.songs.length; i++){
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};



var setTotalTimeInPlayerBar = function(totalTime){
    
    $('.currently-playing .total-time').html(filterTimeCode(totalTime));
}

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        // #10
        currentSoundFile.bind('timeupdate', function(event) {
            // #11
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
            setCurrentTimeInPlayerBar(this.getTime());
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }
};

var setCurrentTimeInPlayerBar = function(currentTime){
    
        $('.currently-playing .current-time').html(filterTimeCode(currentTime));
}

var filterTimeCode = function(timeInSeconds){
    console.log(timeInSeconds);
    var timeFloat = parseFloat(timeInSeconds);
    var wholeSeconds = ('0' + Math.floor(timeInSeconds%60)).slice(-2);
    console.log("time " + Math.floor(timeInSeconds/60) + ':' + wholeSeconds);
    return Math.floor(timeFloat/60) + ':' + wholeSeconds;
}


var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };
    
 var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        // #3
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        // #4
        var seekBarFillRatio = offsetX / barWidth;
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
        // #5
        updateSeekPercentage($(this), seekBarFillRatio);
    });
    $seekBars.find('.thumb').mousedown(function(event){
        var $seekBar=$(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX= event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX/barWidth;
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });


    });
};


var trackIndex = function(album, song){
    return album.songs.indexOf(song);
}

var nextSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    if(currentSongIndex>= currentAlbum.songs.length){
        currentSongIndex =0;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    updatePlayerBarSong();
    
        var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
        var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
        setSong(currentSongIndex + 1);
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        $nextSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    $('.main-controls .play-pause').html(playerBarPauseTemplate);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell =getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var togglePlayFromPlayerBar = function()
{
    var $currentSongNumberCell =getSongNumberCell(currentlyPlayingSongNumber);
    if (currentSoundFile.isPaused()) {
        $(this).html(playerBarPauseTemplate);
        //$('.main-controls .play-pause').html(playerBarPauseTemplate);
        currentSoundFile.play();
        $currentSongNumberCell.html(pauseButtonTemplate);
    } else {
        $(this).html(playerBarPlayTemplate);
        //$('.main-controls .play-pause').html(playerBarPlayTemplate);
        currentSoundFile.pause();
        $currentSongNumberCell.html(playbuttonTemplate);   
    }
    //var songNumber = parseInt($(this).attr('data-song-number'));
}



 var clickHandler = function() {
         // clickHandler logic
         
    var songNumber = parseInt($(this).attr('data-song-number'));
    
   if (currentlyPlayingSongNumber !== null){
        var currentlyPlayingSongElement =getSongNumberCell(currentlyPlayingSongNumber);
        currentlyPlayingSongElement.html(currentlyPlayingSongNumber);
        console.log("nothing");
    }
    if (currentlyPlayingSongNumber !== songNumber){
        
        /*currentlyPlayingSongNumber = songNumber;
        */
        setSong(songNumber);
        currentSoundFile.play();
        $(this).html(pauseButtonTemplate);
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

        var $volumeFill = $('.volume .fill');
        var $volumeThumb = $('.volume .thumb');
        $volumeFill.width(currentVolume +'%');
        $volumeThumb.css({left:currentVolume +'%'});

        updatePlayerBarSong();
    }
    else if (currentlyPlayingSongNumber === songNumber){
        /*$(this).html(playbuttonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayTemplate);
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;*/
        if (currentSoundFile.isPaused()) {
            $(this).html(pauseButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPauseTemplate);
            currentSoundFile.play();
            updateSeekBarWhileSongPlays();
        } else {
            $(this).html(playbuttonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayTemplate);
            currentSoundFile.pause();   
           }
    }
    
 };


 var setSong = function(songNumber){
    if(currentSoundFile){
        currentSoundFile.stop();
    }

    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    setVolume(currentVolume);
 };

 var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
}

var setVolume = function(volume){
    if(currentSoundFile){
        currentSoundFile.setVolume(volume);
    }

}

 var getSongNumberCell = function(number){

    return $('.song-item-number[data-song-number="'+number + '"]');
 }


var songPlayButton = document.getElementsByClassName('song-item-title');

var playbuttonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayTemplate = '<span class="ion-play"></span></a>';
var playerBarPauseTemplate = '<span class="ion-pause"></span></a>';

var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .forward');
var $playpause = $('.main-controls .play-pause')

$(document).ready(function(){
    setCurrentAlbum(albumNsync);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playpause.click(togglePlayFromPlayerBar);
    setupSeekBars();
});

