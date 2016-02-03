(function() {
    window.SpriteLibrary = window.SpriteLibrary || { };
    var BODY_WIDTH = 100;
    var BODY_HEIGHT = 10;
    var WING_WIDTH = 90;
    var WING_HEIGHT = 10;
    
    var drawWing = function (renderingContext, wingOffset, wingAngle, isLeft) {
        renderingContext.save();
        
        renderingContext.translate(wingOffset, 0);
        renderingContext.rotate(wingAngle);
        if (isLeft) {
            renderingContext.fillRect(0, -WING_HEIGHT, WING_WIDTH, WING_HEIGHT);
        } else {
            renderingContext.fillRect(0, 0, WING_WIDTH, WING_HEIGHT);
        }
        
        renderingContext.restore();
    };
    
    var drawFace = function (renderingContext) {
        renderingContext.save();
        
        renderingContext.beginPath();
        renderingContext.arc(0,5,4,0,Math.PI,false);  // Mouth (clockwise)
        renderingContext.moveTo(0,5);
        renderingContext.arc(-5,-5,5,0,Math.PI*2,true);  // Left eye
        renderingContext.moveTo(0,-5);
        renderingContext.arc(5,-5,5,0,Math.PI*2,true);  // Right eye
        renderingContext.stroke(); 
        
        renderingContext.restore(); 
    };
    
    var drawLeg = function (renderingContext, legPointX, legPointY, legLength) {
        var ankleX = legPointX + legLength;
        var ankleY = legPointY + legLength;
        
        renderingContext.save();
        
        renderingContext.beginPath();
        renderingContext.moveTo(legPointX, legPointY);
        renderingContext.lineTo(ankleX, ankleY);
        renderingContext.lineTo(ankleX - 5, ankleY + 5);
        renderingContext.moveTo(ankleX, ankleY);
        renderingContext.lineTo(ankleX, ankleY + 5);
        renderingContext.moveTo(ankleX, ankleY);
        renderingContext.lineTo(ankleX + 5, ankleY + 5);
        renderingContext.stroke();
        
        renderingContext.restore();
    };
    
    
    SpriteLibrary.bird = function(birdSpecs) {
        var renderingContext = birdSpecs.renderingContext;
        var leftWingAngle = birdSpecs.leftWingAngle || Math.PI/4;
        var rightWingAngle = birdSpecs.rightWingAngle || -Math.PI/4;
        
        var rightLegX = -22;
        var rightLegY = 10;
        var leftLegX = 22;
        var leftLegY = 10;
        var legLength = 15;
        
        renderingContext.save();
        
        // body drawing
        renderingContext.fillStyle = "black";
        renderingContext.fillRect(-BODY_WIDTH/2, 0, BODY_WIDTH, BODY_HEIGHT);
        
        renderingContext.fillStyle = "brown";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 20, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        // face drawing
        drawFace(renderingContext);
        
        // leg drawings
        drawLeg(renderingContext, rightLegX, rightLegY, legLength);
        drawLeg(renderingContext, leftLegX, leftLegY, legLength);
        
        // arm drawings
        renderingContext.fillStyle = "black";
        drawWing(renderingContext, -BODY_WIDTH/2, leftWingAngle, true);
        drawWing(renderingContext, BODY_WIDTH/2, rightWingAngle, false);
        
        renderingContext.restore();
    };
}());