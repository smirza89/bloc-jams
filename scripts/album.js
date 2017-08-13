var albumNsync = {
    title: "Colors",
    artist: "NSYNC",
    label: "Cubism",
    year: "1881",
    albumArtUrl: "assets/images/01.png",
    songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
}

var albumBackstreetBoys = {
    title:"Backstreet is Back",
    artist: "BSB",
    label: "EM",
    year: "1909",
    albumArtUrl: "assets/images/20.png",
      songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
}

var albumNewKidsOnTheBlock = {
    title:"NKOTB",
    artist: "New stuff",
    label: "EM",
    year: "1922",
    albumArtUrl: "assets/images/19.png",
      songs: [
         { title: 'This', duration: '1:01' },
         { title: 'Album', duration: '5:01' },
         { title: 'Is', duration: '3:21'},
         { title: 'the', duration: '3:14' },
         { title: 'BEST', duration: '2:15'}
     ]
}


var createSongRow = function(songNumber, songName, songLength){
    var template =  
                 '<tr class="album-view-song-item">'
                +'<td class="song-item-number" data-song-number="'+songNumber+'">'+songNumber+'</td>'
                +'<td class="song-item-title">'+songName+'</td>'
                +'<td class="song-item-duration">'+songLength+'</td>'
                +'</tr>';
    return template;
}

var setCurrentAlbum = function(album){
    var albumTitle = document.getElementsByClassName("album-view-title")[0];
    var albumArtist = document.getElementsByClassName("album-view-artist")[0];
    var albumReleaseInfo = document.getElementsByClassName("album-view-release-info")[0];
    var albumImage = document.getElementsByClassName("album-cover-art")[0];
    var albumSongList = document.getElementsByClassName("album-view-song-list")[0];

    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' +album.label;
    albumImage.setAttribute("src",album.albumArtUrl);

    albumSongList.innerHTML='';
    for(var i=0; i<album.songs.length; i++){
        albumSongList.innerHTML +=createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    }
};

var findParentByClassName = function(className1, element){
    if(element){
        var currentElementParent = element.parentElement;
        while (currentElementParent.className != className1 && currentElementParent.className != null){
            if(currentElementParent.parentElement == null){
               
                return console.log("No parent found");

            }
            currentElementParent = currentElementParent.parentElement;

        }
        if (currentElementParent.className == null){
            console.log("No parent found with that class name");
        }
        else{
            return currentElementParent;
        }
        

    }

};

var getSongItem = function(element2){
    //var getParentClass = findParentByClassName(element2);
    switch (element2.className) {
        
        case 'album-view-song-item' :
            return element2.querySelector('.song-item-number');
        case 'song-item-number' :
            return element2;
        case 'song-item-title' :
        case 'song-item-duration' :
            return findParentByClassName('album-view-song-item',element2).querySelector('.song-item-number');
        case 'album-song-button' :
        case 'ion-play' :
        case 'ion-pause' :
            return findParentByClassName('song-item-number',element2);
        default:
            return;

        //

    }

}

var clickHandler = function(targetElement){
    var songItem = getSongItem(targetElement);
    if (currentlyPlayingSong === null){
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
    else if(currentlyPlayingSong===songItem.getAttribute('data-song-number')){
        songItem.innerHTML = playbuttonTemplate;
        currentlyPlayingSong = null;
    }
    else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="'+currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML =currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
    
};

var songListContainer = document.getElementsByClassName("album-view-song-list")[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var songPlayButton = document.getElementsByClassName('song-item-title');

var playbuttonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function(){
    setCurrentAlbum(albumNsync);
    document.getElementsByClassName("album-cover-art")[0].addEventListener("click", function(){
        console.log(document.getElementsByClassName("album-view-title")[0].firstChild.nodeValue);
        if(document.getElementsByClassName("album-view-title")[0].firstChild.nodeValue=="Colors"){
             setCurrentAlbum(albumBackstreetBoys);   
        }
        else if(document.getElementsByClassName("album-view-title")[0].firstChild.nodeValue=="Backstreet is Back"){
            setCurrentAlbum(albumNewKidsOnTheBlock);   
        }
        else if(document.getElementsByClassName("album-view-title")[0].firstChild.nodeValue=="NKOTB"){
            setCurrentAlbum(albumNsync);   
        }
        else{
            setCurrentAlbum(albumNsync);   
        }
    });
     songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if(event.target.parentElement.className == 'album-view-song-item'){
            var songItem = getSongItem(event.target);

           if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
               songItem.innerHTML = playbuttonTemplate;
            }
         }
     });
    
     
     for(var i =0; i<songRows.length; i++){
        songRows[i].addEventListener('mouseleave', function(event) {
                         var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
        
         songRows[i].addEventListener('click',function(event){
            clickHandler(event.target);
         });

     }
}
