/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var renderingContext = canvas.getContext("2d");

    var leftArmAngle = Math.PI /8;
    var rightArmAngle = -Math.PI /2;
    var leftLegAngle = Math.PI /8;
    var rightLegAngle = -Math.PI /2;

    var rayAngle = Math.PI /4;

    var leftWingAngle = 0.75*Math.PI;
    var rightWingAngle = -Math.PI /8;

    var drawScene = function () {
      
        renderingContext.fillStyle = "white";
        renderingContext.fillRect(0, 0, 1250, 800);
        renderingContext.fillStyle = "green";
        renderingContext.fillRect(0, 600, 1250, 200);

        renderingContext.save();
        renderingContext.translate(1000, 200);
        SpriteLibrary.sun({
            renderingContext: renderingContext,
            rayAngle: rayAngle
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.scale(0.5, 0.5);
        renderingContext.translate(450, 400);
        SpriteLibrary.theMan({
            renderingContext: renderingContext,
            leftArmAngle: leftArmAngle,
            rightArmAngle: rightArmAngle,
            leftLegAngle: leftLegAngle,
            rightLegAngle: rightLegAngle
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(600, 250);
        SpriteLibrary.bird({
            renderingContext: renderingContext,
            leftWingAngle: leftWingAngle,
            rightWingAngle: rightWingAngle
        });

        renderingContext.restore();

        // uncomment the below code for some fun times
        
        // leftArmAngle += Math.PI / 180;
        // rightArmAngle -= Math.PI / 90;
        // leftLegAngle += Math.PI / 90;
        // rightLegAngle -= Math.PI / 90;

        // rayAngle += Math.PI / 180;

        // leftWingAngle += Math.PI / 180;
        // rightWingAngle -= Math.PI / 90;

        //window.requestAnimationFrame(drawScene);
    };

    window.requestAnimationFrame(drawScene);


    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.darkener
            ),
            0, 0
        );

        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.darkener
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });

    $("#apply-neighborhood-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.darkener
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
}());