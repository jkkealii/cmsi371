(function() {
    window.SpriteLibrary = window.SpriteLibrary || { };
    var BODY_WIDTH = 100;
    var BODY_HEIGHT = 10;
    var WING_WIDTH = 90;
    var WING_HEIGHT = 10;
    
    var drawWing = function (renderingContext, wingOffset, wingAngle) {
        renderingContext.save();
        
        renderingContext.translate(wingOffset, 0);
        renderingContext.rotate(wingAngle);
        renderingContext.fillRect(0, 0, WING_WIDTH, WING_HEIGHT);
        
        renderingContext.restore();
    }
    
    SpriteLibrary.bird = function(birdSpecs) {
        var renderingContext = birdSpecs.renderingContext;
        var leftWingAngle = birdSpecs.leftWingAngle || Math.PI/4;
        var rightWingAngle = birdSpecs.rightWingAngle || -Math.PI/4;
        
        renderingContext.save();
        
        // body drawing
        renderingContext.fillStyle = "black";
        renderingContext.fillRect(-BODY_WIDTH/2, 0, BODY_WIDTH, BODY_HEIGHT);
        
        renderingContext.fillStyle = "brown";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 20, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        // arm drawings
        renderingContext.fillStyle = "black";
        drawWing(renderingContext, -BODY_WIDTH/2, leftWingAngle);
        drawWing(renderingContext, BODY_WIDTH/2, rightWingAngle);
        
        renderingContext.restore();
    };
}());