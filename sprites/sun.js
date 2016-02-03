(function() {
    window.SpriteLibrary = window.SpriteLibrary || { };
    var SUN_RADIUS = 100;
    var RAY_WIDTH = SUN_RADIUS/6;
    var RAY_HEIGHT = SUN_RADIUS;
    
    var drawRay = function (renderingContext, rayOffset, rayAngle) {
        renderingContext.save();
        
        renderingContext.fillStyle = "orange";
        renderingContext.translate(0, 90);
        renderingContext.rotate(rayAngle);
        renderingContext.fillRect(-RAY_WIDTH/2, 0, RAY_WIDTH, RAY_HEIGHT);
        
        renderingContext.restore();
    }
    
    SpriteLibrary.sun = function(sunSpecs) {
        var renderingContext = sunSpecs.renderingContext;
        var rayAngle = sunSpecs.rayAngle || Math.PI/4;
        
        renderingContext.save();
        
        // sun drawing
        renderingContext.fillStyle = "yellow";
        renderingContext.beginPath();
        renderingContext.arc(0, RAY_HEIGHT + SUN_RADIUS, SUN_RADIUS, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        // ray drawings
        drawRay(renderingContext, 0, rayAngle);
        
        renderingContext.restore();
    };
}());