

var buildCollectionTemplate = function(){
    var template = '<div class="collection-album-container column fourth">'
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

return $(template);
}

$(window).load(function(){
var $collectionContainer= $('.album-covers');
$collectionContainer.empty();
     for (var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionTemplate(); 
        $collectionContainer.append($newThumbnail);

     }

});

