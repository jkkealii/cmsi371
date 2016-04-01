
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
        maxj,


        getRotationMatrix = function (angle, x, y, z) {
            var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,
                x2,
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            x2 = x * x;
            y2 = y * y;
            z2 = z * z;
            xy = x * y;
            yz = y * z;
            xz = x * z;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            return [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) + zs,
                (xz * oneMinusC) - ys,
                0.0,

                (xy * oneMinusC) - zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) + xs,
                0.0,

                (xz * oneMinusC) + ys,
                (yz * oneMinusC) - xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        },

        getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
            var width = right - left,
                height = top - bottom,
                depth = zFar - zNear;

            return [
                2.0 / width,
                0.0,
                0.0,
                0.0,

                0.0,
                2.0 / height,
                0.0,
                0.0,

                0.0,
                0.0,
                -2.0 / depth,
                0.0,

                -(right + left) / width,
                -(top + bottom) / height,
                -(zFar + zNear) / depth,
                1.0
            ];
        };

    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    objectsToDraw = [
        new Shape({ r: 1, g: 0.5, b: 0 }, Shapes.icosahedron(), gl.LINES, "LINES", { x: 0.0, y: 1.0, z: 1.0 }),
        new Shape({ r: 0.75, g: 0.25, b: 0.25 }, Shapes.pointy(), gl.LINES, "LINES", { x: 1.0, y: 1.0, z: 0.0 }),
        new Shape({ r: 0.25, g: 0.80, b: 0.55 }, Shapes.longPointy(), gl.TRIANGLES, "TRIANGLES", { x: 1.0, y: 0.0, z: 1.0 }),
        new Shape({ r: 0.0, g: 0.00, b: 0.45 }, Shapes.roundy(24, 24, 1.75), gl.LINES, "LINES", { x: 0.0, y: 1.0, z: 0.0 })
    ];

    // for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
    //     objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
    //             objectsToDraw[i].vertices);

    //     if (!objectsToDraw[i].colors) {
    //         objectsToDraw[i].colors = [];
    //         for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
    //                 j < maxj; j += 1) {
    //             objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
    //                 objectsToDraw[i].color.r,
    //                 objectsToDraw[i].color.g,
    //                 objectsToDraw[i].color.b
    //             );
    //         }
    //     }
    //     objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
    //             objectsToDraw[i].colors);
    // }

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

    // drawObject = function (object) {
    //     gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
    //     gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

    //     gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(object.axis ?
    //             getRotationMatrix(currentRotation, object.axis.x, object.axis.y, object.axis.z) :
    //             [1, 0, 0, 0,
    //              0, 1, 0, 0,
    //              0, 0, 1, 0,
    //              0, 0, 0, 1]
    //         ));

    //     gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
    //     gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
    //     gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    // };

    drawScene = function () {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].draw(vertexColor, modelViewMatrix, vertexPosition);
        }
        gl.flush();
    };
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(getOrthoMatrix(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    )));

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
