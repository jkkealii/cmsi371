QUnit.test( "hello test", function ( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("constructor test", function ( assert ) {
    var subject = new Matrix([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    var check = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    assert.deepEqual(subject.matrix, check, "arg supplied, pass");
    var subject1 = new Matrix();
    assert.deepEqual(subject1.matrix, check, "no arg supplied, pass");
});

QUnit.test("multiplication test", function ( assert ) {
    var subject = new Matrix([
            [2, 4, 6, 8],
            [8, 6, 4, 2],
            [1, 3, 5, 7],
            [7, 5, 3, 1]
        ]);
    var multiplicand = new Matrix([
            [1, 3, 5, 7],
            [7, 5, 3, 1],
            [2, 4, 6, 8],
            [8, 6, 4, 2]
        ]);
    var check = new Matrix([
            [106, 98, 90, 82],
            [74, 82, 90, 98],
            [88, 80, 72, 64],
            [56, 64, 72, 80]
        ]);
    assert.deepEqual(subject.mult(multiplicand), check, "multiply");
});

QUnit.test("translation test", function ( assert ) {
    var check = new Matrix([
            [1, 0, 0, 6],
            [0, 1, 0, 9],
            [0, 0, 1, 12],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual(Matrix.trans( 6, 9, 12 ), check, "translate");
});

QUnit.test("scale test", function ( assert ) {
    var check = new Matrix([
            [3, 0, 0, 0],
            [0, 8, 0, 0],
            [0, 0, 13, 0],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual(Matrix.scal( 3, 8, 13 ), check, "scale");
});

QUnit.test("rotation test", function ( assert ) {
    var check = new Matrix([ 
            [0.9989980999092426, 0.03214186087161047, -0.031139960780853033, 0],
            [-0.031139960780853033, 0.9989980999092426, 0.03214186087161047, 0],
            [0.03214186087161047, -0.031139960780853033, 0.9989980999092426, 0],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual(Matrix.rot(Math.PI, Math.PI, Math.PI, Math.PI), check, "1st pass");

    var check1 = new Matrix([
            [0.9999876047125096, 0.0022056744712789593, -0.004463790033644077, 0.0],
            [-0.0020845451869363238, 0.9996343109665102, 0.02696106470216037, 0.0],
            [0.0045216250067130195, -0.026951425539982213, 0.9996265180399435, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ]);
    assert.deepEqual(Matrix.rot(Math.PI/2, 4*Math.PI, 2*Math.PI/3, 1), check1, "2nd pass");

});

QUnit.test("orthographic projection test", function ( assert ) {
    var check = new Matrix([
            [2, 0, 0, -7],
            [0, -2, 0, 3],
            [0, 0, -2, -11],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual(Matrix.orthProj(1, 2, 3, 4, 5, 6), check, "1st pass");

    var check1 = new Matrix([
            [1, 0, 0, -3],
            [0, -1, 0, 3],
            [0, 0, -0.2, -1.4],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual(Matrix.orthProj(2, 4, 2, 4, 2, 12), check1, "2nd pass");
});

QUnit.test("perspective projection test", function ( assert ) {
    var check = new Matrix([
            [-2, 0, 0, -7],
            [0, -0.6666666666666666, 0, -3.6666666666666665],
            [0, 0, -3, -4],
            [0, 0, -1, 0]
        ]);
    assert.deepEqual(Matrix.persProj(4, 7, 4, 3, 1, 2), check, "1st pass");

    var check1 = new Matrix([
            [1, 0, 0, 2.5],
            [0, 2, 0, 4],
            [0, 0, -3, -8],
            [0, 0, -1, 0]
        ]);
    assert.deepEqual(Matrix.persProj(5, 3, 3, 7, 2, 4), check1, "2nd pass");
});

QUnit.test("conversion to WebGL and GLSL test", function ( assert ) {
    var subject = new Matrix([
            [1, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    var check = new Float32Array([
            1, 0, 0, 0,
            0, 2, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    assert.deepEqual(subject.toGL(), check, "conversion pass");
});