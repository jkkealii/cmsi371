

var Shape = function (color, shape, gl_mode, mode, axis, specularColor, shininess) {
    this.transform = new Matrix();
    this.vertices = shape.vertices;
    this.indices = shape.indices;
    this.color = color;
    this.axis = axis;
    this.gl_mode = gl_mode;
    this.mode = mode;
    this.log = [];
    this.specularColor = specularColor;
    this.shininess = shininess;
}

Shape.prototype.rotate = function (angle, deltx, delty, deltz) {
    this.rotation = Matrix.rot(angle, deltx, delty, deltz); 
    // added rotation as property for testing purposes
    this.transform = this.transform.mult(this.rotation);
    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].rotate(angle, deltx, delty, deltz);
        }
    }
    return this;
};

Shape.prototype.translate = function (deltx, delty, deltz) {
    this.translation = Matrix.trans(deltx, delty, deltz);
    // added translation as property for testing purposes
    this.transform = this.transform.mult(this.translation);
    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].translate(deltx, delty, deltz);
        }
    }
    return this;
};

Shape.prototype.scale = function (deltx, delty, deltz) {
    this.scaling = Matrix.scal(deltx, delty, deltz);
    // added scale as property for testing purposes
    this.transform = this.transform.mult(this.scaling);
    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].scale(deltx, delty, deltz);
        }
    }
    return this;
};

Shape.prototype.draw = function (vertexDiffuseColor, vertexSpecularColor, shininess, modelViewMatrix, vertexPosition, gl, normalVector) {
    gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, this.transform.toGL());

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.specularBuffer);
    gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

    // Set the shininess.
    gl.uniform1f(shininess, this.shininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(this.gl_mode, 0, this.rertices.length / 3);

    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].draw(vertexDiffuseColor, vertexSpecularColor, shininess, modelViewMatrix, vertexPosition, gl, normalVector);
        }
    }
    return this;
};

Shape.prototype.g_ready = function (gl) {
    this.rertices = [];
    if (this.mode == "LINES") {
        this.rertices = this.toRawLineArray();
    } else if (this.mode == "TRIANGLES") {
        this.rertices = this.toRawTriangleArray();
    }
    this.buffer = GLSLUtilities.initVertexBuffer(gl, this.rertices);

    if (!this.colors) {
        this.colors = [];
        for (j = 0, maxj = this.rertices.length / 3;
                j < maxj; j += 1) {
            this.colors = this.colors.concat(
                this.color.r,
                this.color.g,
                this.color.b
            );
        }
    }
    this.colorBuffer = GLSLUtilities.initVertexBuffer(gl, this.colors);

    if (!this.specularColors) {
        // Future refactor: helper function to convert a single value or
        // array into an array of copies of itself.
        this.specularColors = [];
        for (var j = 0, maxj = this.rertices.length / 3; j < maxj; j += 1) {
            this.specularColors = this.specularColors.concat(
                this.specularColor.r,
                this.specularColor.g,
                this.specularColor.b
            );
        }
    }
    this.specularBuffer = GLSLUtilities.initVertexBuffer(gl, this.specularColors);

    // One more buffer: normals.
    this.normals = this.toNormalArray();
    this.normalBuffer = GLSLUtilities.initVertexBuffer(gl, this.normals);

    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].g_ready(gl);
        }
    }
};

Shape.prototype.stash = function () {
    this.log.push(new Matrix(this.transform.matrix));
    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].stash();
        }
    }
    return this;
};

Shape.prototype.refresh = function () {
    this.transform = this.log.pop();
    if (this.children) {
        for (var c = 0; c < this.children.length; c++) {
            this.children[c].refresh();
        }
    }
    return this;
};

Shape.prototype.manufactureYoungster = function (shape) {
    if (this.children) {
        this.children = this.children.concat(shape);
    } else {
        this.children = [].concat(shape);
    }
    return this;
};

Shape.prototype.razeYoungster = function (shape) {
    if (shape) {
        this.children.splice(this.children.indexOf(shape), 1);
    } else {
        this.children.pop();
    }
    return this;
};

Shape.prototype.toRawLineArray = function () {
    var result = [],
        i,
        j,
        maxi,
        maxj;

    for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            result = result.concat(
                this.vertices[
                    this.indices[i][j]
                ],

                this.vertices[
                    this.indices[i][(j + 1) % maxj]
                ]
            );
        }
    }

    return result;
};

Shape.prototype.toRawTriangleArray = function () {
    var result = [],
        i,
        j,
        maxi,
        maxj;

    for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            result = result.concat(
                this.vertices[
                    this.indices[i][j]
                ]
            );
        }
    }

    return result;
};

Shape.prototype.toNormalArray = function () {
    var result = [];

    // For each face...
    for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        // We form vectors from the first and second then second and third vertices.
        var p0 = this.vertices[this.indices[i][0]];
        var p1 = this.vertices[this.indices[i][1]];
        var p2 = this.vertices[this.indices[i][2]];

        // Technically, the first value is not a vector, but v can stand for vertex
        // anyway, so...
        var v0 = new Vector(p0[0], p0[1], p0[2]);
        var v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
        var v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
        var normal = v1.cross(v2).unit();

        // We then use this same normal for every vertex in this face.
        for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            result = result.concat(
                [ normal.x(), normal.y(), normal.z() ]
            );
        }
    }

    return result;
};

/*
 * Another utility function for computing normals, this time just converting
 * every vertex into its unit vector version.  This works mainly for objects
 * that are centered around the origin.
 */
Shape.prototype.toVertexNormalArray = function () {
    var result = [];

    // For each face...
    for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        // For each vertex in that face...
        for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            var p = this.vertices[this.indices[i][j]];
            var normal = new Vector(p[0], p[1], p[2]).unit();
            result = result.concat(
                [ normal.x(), normal.y(), normal.z() ]
            );
        }
    }

    return result;
};

var Shapes = {
    // for testing purposes
    blanky: function () {
        return {
            vertices: [],
            indices: []
        };
    },

    icosahedron: function () {
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    pointy: function () {
        var X = 1,
            Y = 1,
            Z = 1;
        return {
            vertices: [
                [0, 0, Z],
                [0, Y, 0],
                [X, 0, 0],
                [0, 0, 0]
            ],

            indices: [
                [0, 1, 2],
                [0, 1, 3],
                [0, 2, 3],
                [1, 2, 3]
            ]
        }
    },

    longPointy: function () {
        var X = 0.5,
            Y = 0.5,
            Z = 0.5;
        return {
            vertices: [
                [0, Y, 0],
                [0, 0, 0],
                [X, 0, 0],
                [0, Y, Z],
                [0, 0, Z],
                [X, 0, Z]
            ],

            indices: [
                [0, 1, 2],
                [0, 1, 4],
                [0, 3, 4],
                [0, 2, 3],
                [2, 3, 5],
                [1, 2, 4],
                [2, 5, 4],
                [3, 4, 5]
            ]
        }
    },

    roundy: function (side, up, r) {
        var vertices = [], indices = [];
        var up = up, side = side;
        var r = r;

        for (i = 0; i < side + 1; i++) {
            var deeg = i * Math.PI / side;
            // math stuff
            var sine = Math.sin(deeg);
            var cosine = Math.cos(deeg);

            for (var k = 0; k < up + 1; k++) {
                // special magical formula that does it all
                var magic = k * 2 * Math.PI / up;

                var x = r * Math.cos(magic) * sine;
                var y = r * cosine;
                var z = r * Math.sin(magic) * sine;

                vertices.push([x, y, z]);
           }
        }

        for (i = 0; i < side; i++) {
            for (k = 0; k < up; k++) {
                // so complicated, it would take days to explain
                var upper = i * (up + 1) + k;
                var lower = upper + up + 1;

                indices.push([upper, lower, upper + 1]);
                indices.push([lower, lower + 1, upper + 1]);
            }
        }

        return {
            vertices: vertices, indices: indices
        }
    },

};
