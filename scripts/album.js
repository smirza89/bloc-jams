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
                +'<td class="song-item-number">'+songNumber+'</td>'
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
}

