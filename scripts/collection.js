var collectionItemTemplate = 
'<div class="collection-album-container column fourth">'
+'                <img src="assets/images/01.png"/>'
+'                <div class="collection-album-info caption">'
+'<p>'                    
+'<a class="album-name" href="album.html">The Colors</a>'                        
+'<br/>'                        
+'<a href="album.html">Pablo Picasso</a> '                        
+ '<br/> '                       
+ ' X Songs '                      
+' <br/> '                       
+ '  </p> '                 
+'</div> '                
+ '</div> '           
     
+ '            </div>'

window.onload = function(){
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    console.log(collectionContainer.firstChild.nodeValue);
    
    collectionContainer.innerHTML = "";
     for (var i = 0; i < 12; i++) {
         collectionContainer.innerHTML += collectionItemTemplate;
     }
}