
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

    // var father = new Shape({ r: 0.0, g: 0.0, b: 0.45 }, 
    //         Shapes.roundy(24, 24, 0.85), 
    //         gl.TRIANGLES, "TRIANGLES", 
    //         { x: 0.0, y: 1.0, z: 0.0 },
    //         { r: 0.2, g: 0.5, b: 0.45 },
    //         10).translate(0.5, 1.0, 1.5);
    // var youngster = new Shape({ r: 0.0, g: 0.45, b: 0.15 }, 
    //         Shapes.roundy(12, 12, 0.65), 
    //         gl.TRIANGLES, "TRIANGLES", 
    //         { x: 0.0, y: 0.5, z: 0.0 },
    //         { r: 0.2, g: 0.5, b: 0.45 },
    //         10).translate(2.5, 0.0, 0.5);
    // var grandchild = new Shape({ r: 0.75, g: 0.10, b: 0.05 }, 
    //         Shapes.roundy(12, 12, 0.75), 
    //         gl.TRIANGLES, "TRIANGLES", 
    //         { x: 0.0, y: -1.0, z: 0.0 },
    //         { r: 0.2, g: 0.5, b: 0.45 },
    //         10).translate(-2.5, 0.0, -0.5);
    // father.manufactureYoungster(youngster);
    // youngster.manufactureYoungster(grandchild);


    // objectsToDraw = [
    //     new Shape({ r: 1, g: 0.5, b: 0 }, 
    //         Shapes.icosahedron(), 
    //         gl.TRIANGLES, "TRIANGLES", 
    //         { x: 0.0, y: 1.0, z: 0.0 },
    //         { r: 0.2, g: 0.5, b: 0.45 },
    //         12),
    //     new Shape({ r: 0.75, g: 0.25, b: 0.25 }, 
    //         Shapes.pointy(), 
    //         gl.TRIANGLES, "TRIANGLES", 
    //         { x: 1.0, y: 1.0, z: 0.0 },
    //         { r: 0.2, g: 0.5, b: 0.45 },
    //         12),
    //     new Shape({ r: 0.25, g: 0.80, b: 0.55 }, 
    //         Shapes.longPointy(), 
    //         gl.TRIANGLES, "TRIANGLES", 
    //         { x: 1.0, y: 0.0, z: 1.0 },
    //         { r: 0.3, g: 0.3, b: 0.0 },
    //         0.25),
    //     father
    // ];

    var snowman = new Shape({ r: 0.9, g: 0.1, b: 0.1 }, 
            Shapes.roundy(24, 24, 0.40), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10);
    var torso = new Shape({ r: 0.9, g: 0.1, b: 0.5 }, 
            Shapes.roundy(24, 24, 0.55), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -1.65, 0.0);
    var bum = new Shape({ r: 0.7, g: 0.2, b: 0.1 }, 
            Shapes.roundy(24, 24, 0.70), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -3.7, 0.0);
    var leftEye = new Shape({ r: 0.1, g: 0.5, b: 0.5 }, 
            Shapes.roundy(15, 15, 0.07), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.24, 0.25, 0.75);
    var rightEye = new Shape({ r: 0.1, g: 0.5, b: 0.5 }, 
            Shapes.roundy(15, 15, 0.07), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(-0.24, 0.25, 0.70);
    var nose = new Shape({ r: 0.0, g: 0.3, b: 0.6 }, 
            Shapes.pointy(), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -0.25, 0.70).scale(0.25, 0.15, 0.25).rotate(45, 0, 1, 0);
    var firstButton = new Shape({ r: 0.9, g: 0.9, b: 0.9 }, 
            Shapes.roundy(15, 15, 0.06), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -1.2, 1.0);
    var secondButton = new Shape({ r: 0.9, g: 0.9, b: 0.9 }, 
            Shapes.roundy(15, 15, 0.06), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -1.9, 1.05);
    var thirdButton = new Shape({ r: 0.9, g: 0.9, b: 0.9 }, 
            Shapes.roundy(15, 15, 0.06), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -3.1, 1.25);
    var fourthButton = new Shape({ r: 0.9, g: 0.9, b: 0.9 }, 
            Shapes.roundy(15, 15, 0.06), 
            gl.TRIANGLES, "TRIANGLES", 
            { x: 0.0, y: 1.0, z: 0.0 },
            { r: 0.5, g: 0.75, b: 0.25 },
            10).translate(0.0, -3.9, 1.35);

    snowman.manufactureYoungster(torso);
    torso.manufactureYoungster(bum);
    bum.manufactureYoungster(leftEye);
    leftEye.manufactureYoungster(rightEye);
    rightEye.manufactureYoungster(nose);
    nose.manufactureYoungster(firstButton);
    firstButton.manufactureYoungster(secondButton);
    secondButton.manufactureYoungster(thirdButton);
    thirdButton.manufactureYoungster(fourthButton);

    objectsToDraw = [
        snowman
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

    var rotationAroundX = 0.0;
    var rotationAroundY = 0.0;

    drawScene = function () {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE, Matrix.rot(rotationAroundX, 1.0, 0.0, 0.0).toGL());
        gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE, Matrix.rot(rotationAroundY, 0.0, 1.0, 0.0).toGL());

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
        -6 * (canvas.width / canvas.height),
        6 * (canvas.width / canvas.height),
        -6,
        6,
        -20,
        20
    ).toGL());

    gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, Matrix.cameraMatrix(
        1, 0, 0, 0, 0, currentRotation, 1, 1, 0
    ).toGL());

    gl.uniform4fv(lightPosition, [5, -50, -200, 1.0]);
    gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE, (new Matrix()).toGL());
    gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE, (new Matrix()).toGL());
    gl.uniform3fv(lightDiffuse, [1, 1, 1]);
    gl.uniform3fv(lightSpecular, [1, 1, 1]);
    gl.uniform1f(shininess, 1.0);

    // previousTimestamp = null;
    // advanceScene = function (timestamp) {
    //     if (!animationActive) {
    //         return;
    //     }

    //     if (!previousTimestamp) {
    //         previousTimestamp = timestamp;
    //         window.requestAnimationFrame(advanceScene);
    //         return;
    //     }

    //     var progress = timestamp - previousTimestamp;
    //     if (progress < 30) {
    //         window.requestAnimationFrame(advanceScene);
    //         return;
    //     }

    //     currentRotation += 0.033 * progress;
    //     drawScene();
    //     if (currentRotation >= 360.0) {
    //         currentRotation -= 360.0;
    //     }
    //     previousTimestamp = timestamp;
    //     window.requestAnimationFrame(advanceScene);
    // };

    var rotateScene = function (event) {
        rotationAroundX = xRotationStart - yDragStart + event.clientY;
        rotationAroundY = yRotationStart - xDragStart + event.clientX;
        drawScene();
    };

    var xDragStart;
    var yDragStart;
    var xRotationStart;
    var yRotationStart;
    $(canvas).mousedown(function (event) {
        xDragStart = event.clientX;
        yDragStart = event.clientY;
        xRotationStart = rotationAroundX;
        yRotationStart = rotationAroundY;
        $(canvas).mousemove(rotateScene);
    }).mouseup(function (event) {
        $(canvas).unbind("mousemove");
    });

    drawScene();

    // $(canvas).click(function () {
    //     animationActive = !animationActive;
    //     if (animationActive) {
    //         previousTimestamp = null;
    //         window.requestAnimationFrame(advanceScene);
    //     }
    // });

}(document.getElementById("duckman3D")));
