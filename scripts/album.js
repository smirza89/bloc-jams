

var createSongRow = function(songNumber, songName, songLength){
    var template =  
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
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

    $('.main-controls .play-pause').html(playerBarPauseTemplate);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell =getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

 var clickHandler = function() {
         // clickHandler logic
         
    var songNumber = parseInt($(this).attr('data-song-number'));
    
   if (currentlyPlayingSongNumber !== null){
        var currentlyPlayingSongElement =getSongNumberCell(currentlyPlayingSongNumber);
        currentlyPlayingSongElement.html(currentlyPlayingSongNumber);
        
    }
    if (currentlyPlayingSongNumber !== songNumber){
        $(this).html(pauseButtonTemplate);
        /*currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];*/
        setSong(songNumber);
        updatePlayerBarSong();
    }
    else if (currentlyPlayingSongNumber === songNumber){
        $(this).html(playbuttonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayTemplate);
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
    }
    
 };
 var setSong = function(songNumber){
   
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    
 };

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

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .forward');

$(document).ready(function(){
    setCurrentAlbum(albumNsync);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});

