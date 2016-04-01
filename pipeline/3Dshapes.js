
(function (canvas) {

    var gl,
        objectsToDraw,
        shaderProgram,
        abort = false,
        animationActive = false,
        currentRotation = 0.0,
        currentInterval,
        modelViewMatrix,
        projectionMatrix,
        vertexPosition,
        vertexColor,
        drawObject,
        drawScene,
        previousTimestamp,
        advanceScene,
        i,
        maxi,
        j,
        maxj;

    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var father = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.roundy(24, 24, 1.85), 
            gl.LINES, "LINES", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var youngster = new Shape({ r: 0.0, g: 0.45, b: 0.15 }, 
            Shapes.roundy(12, 12, 1.65), 
            gl.LINES, "LINES", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var grandchild = new Shape({ r: 0.75, g: 0.10, b: 0.05 }, 
            Shapes.roundy(12, 12, 1.45), 
            gl.LINES, "LINES", 
            { x: 0.0, y: 1.0, z: 0.0 });
    father.manufactureYoungster(youngster);
    youngster.manufactureYoungster(grandchild);


    objectsToDraw = [
        new Shape({ r: 1, g: 0.5, b: 0 }, 
            Shapes.icosahedron(), 
            gl.LINES, "LINES", 
            { x: 0.0, y: 1.0, z: 1.0 }),
        new Shape({ r: 0.75, g: 0.25, b: 0.25 }, 
            Shapes.pointy(), 
            gl.LINES, "LINES", 
            { x: 1.0, y: 1.0, z: 0.0 }),
        new Shape({ r: 0.25, g: 0.80, b: 0.55 }, 
            Shapes.longPointy(), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 1.0, y: 0.0, z: 1.0 }),
        father
    ];

    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    gl.useProgram(shaderProgram);

    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);

    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");


    for (var i = 0; i < objectsToDraw.length; i++) {
        objectsToDraw[i].g_ready(gl);
    }

    drawScene = function () {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].stash();
            if (objectsToDraw[i].axis) {
                objectsToDraw[i].rotate(currentRotation, objectsToDraw[i].axis.x, objectsToDraw[i].axis.y, objectsToDraw[i].axis.z);
            }
            objectsToDraw[i].draw(vertexColor, modelViewMatrix, vertexPosition, gl);
            objectsToDraw[i].refresh();
        }
        gl.flush();
    };
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, Matrix.orthProj(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    ).toGL());

    previousTimestamp = null;
    advanceScene = function (timestamp) {
        if (!animationActive) {
            return;
        }

        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            window.requestAnimationFrame(advanceScene);
            return;
        }

        currentRotation += 0.033 * progress;
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    drawScene();

    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("3Dshapes")));
