var Matrix = function ( input ) {
    if (input) {
        this.matrix = input;
    } else {
        this.matrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }
    this.rowLength = this.matrix.length;
    this.columnLength = this.matrix[0].length;
};

Matrix.prototype.mult = function ( multiplicand ) {
    var thisNumRows = this.matrix.length, thisNumCols = this.matrix[0].length;
    var multiplicandNumRows = multiplicand.matrix.length, multiplicandNumCols = multiplicand.matrix[0].length;
    var res = new Array(thisNumRows);                    // initialize array of rows
    for (var r = 0; r < thisNumRows; ++r) {
        res[r] = new Array(multiplicandNumCols);      // initialize the current row
        for (var c = 0; c < multiplicandNumCols; ++c) {
            res[r][c] = 0;                            // initialize the current cell
            for (var i = 0; i < thisNumCols; ++i) {
                res[r][c] += this.matrix[r][i] * multiplicand.matrix[i][c];
            }
        }
    }
    return new Matrix( res );
};

Matrix.trans = function ( deltx, delty, deltz ) {
    return new Matrix([
            [1, 0, 0, deltx],
            [0, 1, 0, delty],
            [0, 0, 1, deltz],
            [0, 0, 0, 1]
        ]);
};

Matrix.scal = function ( deltx, delty, deltz ) {
    return new Matrix([
            [deltx, 0, 0, 0],
            [0, delty, 0, 0],
            [0, 0, deltz, 0],
            [0, 0, 0, 1]
        ]);
};

Matrix.rot = function (angle, x, y, z) {
    var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
    var s = Math.sin(angle * Math.PI / 180.0);
    var c = Math.cos(angle * Math.PI / 180.0);
    var oneMinusC = 1.0 - c;
    var x2, y2, z2, xy, yz, xz, xs, ys, zs;

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

    return new Matrix ([
        [(x2 * oneMinusC) + c,
        (xy * oneMinusC) + zs,
        (xz * oneMinusC) - ys,
        0.0]
        ,

        [(xy * oneMinusC) - zs,
        (y2 * oneMinusC) + c,
        (yz * oneMinusC) + xs,
        0.0]
        ,

        [(xz * oneMinusC) + ys,
        (yz * oneMinusC) - xs,
        (z2 * oneMinusC) + c,
        0.0]
        ,

        [0.0, 0.0, 0.0, 1.0]
    ]);
};

Matrix.orthProj = function ( top, bottom, left, right, near, far) {
    var twooverRminusL = 2 / (right - left);
    var negRplusLoverRminusL = -(right + left) / (right - left);
    var twooverTminusB = 2 / (top - bottom);
    var negTplusBoverTminusB = -(top + bottom) / (top - bottom);
    var negtwooverFminusN = -2 / (far - near);
    var negFplusNoverFminusN = -(far + near) / (far - near);

    return new Matrix ([
        [twooverRminusL, 0, 0, negRplusLoverRminusL],
        [0, twooverTminusB, 0, negTplusBoverTminusB],
        [0, 0, negtwooverFminusN, negFplusNoverFminusN],
        [0, 0, 0, 1]
    ]);
};

Matrix.persProj = function ( top, bottom, left, right, near, far) {
    var twoNoverRminusL = (2 * near) / (right - left);
    var RplusLoverRminusL = (right + left) / (right - left);
    var twoNoverTminusB = (2 * near) / (top - bottom);
    var TplusBoverTminusB = (top + bottom) / (top - bottom);
    var negFplusNoverFminusN = -(far + near) / (far - near);
    var negtwoNFoverFminusN = -(2 * near * far) / (far - near);

    return new Matrix ([
        [twoNoverRminusL, 0, 0, RplusLoverRminusL],
        [0, twoNoverTminusB, 0, TplusBoverTminusB],
        [0, 0, negFplusNoverFminusN, negtwoNFoverFminusN],
        [0, 0, -1, 0]
    ]);
};

Matrix.prototype.toGL = function () {
    var flat = [];
    for (var r = 0; r < this.rowLength; r++) {
        flat = flat.concat(this.matrix[r]);
    }
    return new Float32Array(flat);
};
