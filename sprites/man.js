(function() {
    window.SpriteLibrary = window.SpriteLibrary || { };
    var BODY_WIDTH = 120;
    var BODY_HEIGHT = 200;
    var manImg = new Image();
    var manLoaded = false;
    var ARM_WIDTH = BODY_WIDTH/3;
    var LEG_WIDTH = BODY_WIDTH/3;
    var ARM_HEIGHT = BODY_HEIGHT;
    var LEG_HEIGHT = BODY_HEIGHT*1.5;
    
    manImg.addEventListener("load", function () {
        manLoaded = true;
    }, false);
    manImg.src = "/sprites/man.png";
    
    var drawArm = function (renderingContext, armOffset, armAngle) {
        renderingContext.save();
        
        renderingContext.translate(armOffset, manImg.height/2);
        renderingContext.rotate(armAngle);
        renderingContext.fillRect(-ARM_WIDTH/2, 0, ARM_WIDTH, ARM_HEIGHT);
        
        renderingContext.fillStyle = "blue";
        renderingContext.beginPath();
        var fistRadius = ARM_HEIGHT/8;
        renderingContext.arc(0, ARM_HEIGHT + fistRadius, fistRadius, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        renderingContext.restore();
    };
    
    var drawLeg = function (renderingContext, legOffset, legAngle) {
        renderingContext.save();
        
        renderingContext.translate(legOffset, manImg.height/1.25);
        renderingContext.rotate(legAngle);
        renderingContext.fillRect(-LEG_WIDTH/2, 0, LEG_WIDTH, LEG_HEIGHT);
        
        renderingContext.fillStyle = "red";
        renderingContext.beginPath();
        var footRadius = LEG_HEIGHT/8;
        renderingContext.arc(0, LEG_HEIGHT + footRadius, footRadius, 0, 2 * Math.PI, true);
        renderingContext.fill();
        
        renderingContext.restore();
    };
    
    SpriteLibrary.theMan = function(manSpecs) {
        var renderingContext = manSpecs.renderingContext;
        var leftArmAngle = manSpecs.leftArmAngle || Math.PI/4;
        var rightArmAngle = manSpecs.rightArmAngle || -Math.PI/4;
        var leftLegAngle = manSpecs.leftLegAngle || Math.PI/4;
        var rightLegAngle = manSpecs.leftLegAngle || -Math.PI/4;
        
        renderingContext.save();
        if (manLoaded) {
            renderingContext.drawImage(manImg, -manImg.width/2 , -manImg.height/2);
            
            // body drawing
            renderingContext.fillStyle = "brown";
            renderingContext.fillRect(-BODY_WIDTH/2, manImg.height/2, BODY_WIDTH, BODY_HEIGHT);
            
            // arm drawings
            drawArm(renderingContext, -BODY_WIDTH/2, leftArmAngle);
            drawArm(renderingContext, BODY_WIDTH/2, rightArmAngle);
            
            // leg drawings
            drawLeg(renderingContext, -BODY_WIDTH/2, leftLegAngle);
            drawLeg(renderingContext, BODY_WIDTH/2, rightLegAngle);
        }
        renderingContext.restore();
    };
}());