

var Shape = function (shape) {
    this.vertices = shape.vertices;
    this.indices = shape.indices;
}

Shape.prototype.manufactureYoungster = function (shape) {
    if (this.children) {
        this.children = this.children.concat(shape);
    } else {
        this.children = [].concat(shape);
    }
}

Shape.prototype.razeYoungster = function (shape) {
    if (shape) {
        this.children.splice(this.children.indexOf(shape), 1);
    } else {
        this.children.pop();
    }
}

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
}

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
}

var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
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
