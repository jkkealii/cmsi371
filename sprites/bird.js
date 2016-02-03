(function() {
    window.SpriteLibrary = window.SpriteLibrary || { };
    var BODY_WIDTH = 100;
    var BODY_HEIGHT = 150;
    var mountainImg = new Image();
    var mountainLoaded = false;
    var ARM_WIDTH = BODY_WIDTH/3;
    var ARM_HEIGHT = BODY_HEIGHT;
    
    mountainImg.addEventListener("load", function () {
        mountainLoaded = true;
    }, false);
    mountainImg.src = "/sprites/mountain.png";
    
    var drawArm = function (renderingContext, armOffset, armAngle) {
        renderingContext.save();
        
        renderingContext.translate(armOffset, mountainImg.height/2);
        renderingContext.rotate(armAngle);
        renderingContext.fillRect(-ARM_WIDTH/2, 0, ARM_WIDTH, ARM_HEIGHT);
        
        renderingContext.fillStyle = "blue";
        renderingContext.beginPath();
        var fistRadius = ARM_HEIGHT/8;
        renderingContext.arc(0, ARM_HEIGHT + fistRadius, fistRadius, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        renderingContext.restore();
    }
    
    SpriteLibrary.mountainMan = function(mountainSpecs) {
        var renderingContext = mountainSpecs.renderingContext;
        var leftAngle = mountainSpecs.leftAngle || Math.PI/4;
        var rightAngle = mountainSpecs.rightAngle || -Math.PI/4;
        
        renderingContext.save();
        if (mountainLoaded) {
            renderingContext.drawImage(mountainImg, -mountainImg.width/2 , -mountainImg.height/2);
            
            // body drawing
            renderingContext.fillStyle = "yellow";
            renderingContext.fillRect(-BODY_WIDTH/2, mountainImg.height/2, BODY_WIDTH, BODY_HEIGHT);
            
            // arm drawings
            drawArm(renderingContext, -BODY_WIDTH/2, leftAngle);
            drawArm(renderingContext, BODY_WIDTH/2, rightAngle);
        }
        renderingContext.restore();
    };
}());