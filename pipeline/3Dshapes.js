
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

    var father = new Shape({ r: 0.0, g: 0.0, b: 0.45 }, 
            Shapes.roundy(24, 24, 0.85), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.2, g: 0.5, b: 0.45 },
            10).translate(0.5, 1.0, 1.5);
    var youngster = new Shape({ r: 0.0, g: 0.45, b: 0.15 }, 
            Shapes.roundy(12, 12, 0.65), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 0.5, z: 0.0 },
            { r: 0.2, g: 0.5, b: 0.45 },
            10).translate(2.5, 0.0, 0.5);
    var grandchild = new Shape({ r: 0.75, g: 0.10, b: 0.05 }, 
            Shapes.roundy(12, 12, 0.75), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: -1.0, z: 0.0 },
            { r: 0.2, g: 0.5, b: 0.45 },
            10).translate(-2.5, 0.0, -0.5);
    father.manufactureYoungster(youngster);
    youngster.manufactureYoungster(grandchild);


    objectsToDraw = [
        new Shape({ r: 1, g: 0.5, b: 0 }, 
            Shapes.icosahedron(), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.2, g: 0.5, b: 0.45 },
            12),
        new Shape({ r: 0.75, g: 0.25, b: 0.25 }, 
            Shapes.pointy(), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 1.0, y: 1.0, z: 0.0 },
            { r: 0.2, g: 0.5, b: 0.45 },
            12),
        new Shape({ r: 0.25, g: 0.80, b: 0.55 }, 
            Shapes.longPointy(), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 1.0, y: 0.0, z: 1.0 },
            { r: 0.3, g: 0.3, b: 0.0 },
            0.25),
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

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    var vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    var vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    var normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    var xRotationMatrix = gl.getUniformLocation(shaderProgram, "xRotationMatrix");
    var yRotationMatrix = gl.getUniformLocation(shaderProgram, "yRotationMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    // Note the additional variables.
    var lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    var lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    var lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    var shininess = gl.getUniformLocation(shaderProgram, "shininess");

    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

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
            objectsToDraw[i].draw(vertexDiffuseColor, vertexSpecularColor, shininess, modelViewMatrix, vertexPosition, gl, normalVector);
            objectsToDraw[i].refresh();
        }
        gl.flush();
    };

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, Matrix.orthProj(
        -4 * (canvas.width / canvas.height),
        4 * (canvas.width / canvas.height),
        -4,
        4,
        -20,
        20
    ).toGL());

    gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, Matrix.cameraMatrix(
        1, 1, 1, 1, 1, currentRotation, 1, 1, 1
    ).toGL());

    gl.uniform4fv(lightPosition, [5, -50, -200, 1.0]);
    gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE, (new Matrix()).toGL());
    gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE, (new Matrix()).toGL());
    gl.uniform3fv(lightDiffuse, [1, 1, 1]);
    gl.uniform3fv(lightSpecular, [1, 1, 1]);
    gl.uniform1f(shininess, 1.0);

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
