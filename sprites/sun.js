(function() {
    window.SpriteLibrary = window.SpriteLibrary || { };
    var SUN_RADIUS = 100;
    var RAY_WIDTH = SUN_RADIUS/6;
    var RAY_HEIGHT = SUN_RADIUS;
    
    var drawRay = function (renderingContext, rayDian, rayAngle) {
        var xRay = 0 + SUN_RADIUS * Math.cos(rayDian);
        var yRay = 0 + SUN_RADIUS * Math.sin(rayDian);
        renderingContext.save();
        
        renderingContext.fillStyle = "orange";
        renderingContext.translate(xRay, yRay);
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
        renderingContext.arc(0, 0, SUN_RADIUS, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        // ray drawings
        drawRay(renderingContext, 0, rayAngle);
        drawRay(renderingContext, Math.PI/4, rayAngle);
        drawRay(renderingContext, Math.PI/2, rayAngle);
        drawRay(renderingContext, 3 * Math.PI/4, rayAngle);
        drawRay(renderingContext, Math.PI, rayAngle);
        drawRay(renderingContext, 5 * Math.PI/4, rayAngle);
        drawRay(renderingContext, 3 * Math.PI/2, rayAngle);
        drawRay(renderingContext, 7 * Math.PI/4, rayAngle);
        
        renderingContext.restore();
    };
}());