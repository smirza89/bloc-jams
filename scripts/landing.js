var pointsArray = document.getElementsByClassName("point"); 

var revealPoint = function(element){
        element.style.opacity = 1;
        element.style.transform = "scaleX(1) translateY(0)";
       element.style.msTransform = "scaleX(1) translateY(0)";
      element.style.WebkitTransform = "scaleX(1) translateY(0)";
};

var animatePoints = function(points) {
      forEach(points, revealPoint);
};

window.onload = function(){
  var sellingPoints = document.getElementsByClassName('selling-point')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight +200;
  window.addEventListener("scroll",function(event){
    if(document.documentElement.scrollTop || document.body.scrollTop>=scrollDistance){
        animatePoints(pointsArray);
      
    }
    
  });
}
