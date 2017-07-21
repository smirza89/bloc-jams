 var animatePoints = function() {
                 var points=document.getElementsByClassName("point");
    
                

                var revealPoint = function(element){
                     points[element].style.opacity = 1;
                   points[element].style.transform = "scaleX(1) translateY(0)";
                   points[element].style.msTransform = "scaleX(1) translateY(0)";
                  points[element].style.WebkitTransform = "scaleX(1) translateY(0)";
                };

                for(var i=0; i<points.length; i++){
                    revealPoint(i);
                }
               
 
             };

