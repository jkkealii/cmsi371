QUnit.test("raw triangle array no args", function ( assert ) {
    var thape = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "TRIANGLE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    assert.ok( thape.toRawTriangleArray().length == 0, "pass");
});

QUnit.test("raw line array no args", function ( assert ) {
    var thape = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    assert.ok( thape.toRawLineArray().length == 0, "pass");
});

QUnit.test("add/remove child", function ( assert ) {
    var thapeFather = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var thapeKid = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    thapeFather.manufactureYoungster(thapeKid);
    assert.deepEqual( thapeFather.children[0], thapeKid, "add pass");
    thapeFather.razeYoungster(thapeKid);
    assert.ok( thapeFather.children.length == 0, "specific remove pass");
    thapeFather.manufactureYoungster(thapeKid);
    thapeFather.razeYoungster();
    assert.ok( thapeFather.children.length == 0, "non-specific remove pass")
});

QUnit.test("rotate test", function ( assert ) {
    var thape = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var thapeKid = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var rotatedThape1 = thape.rotate( Math.PI, Math.PI, Math.PI, Math.PI );
    var check = new Matrix([ 
            [0.9989980999092426, 0.03214186087161047, -0.031139960780853033, 0],
            [-0.031139960780853033, 0.9989980999092426, 0.03214186087161047, 0],
            [0.03214186087161047, -0.031139960780853033, 0.9989980999092426, 0],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual( rotatedThape1.rotation, check, "1st pass" );

    var rotatedThape2 = thape.rotate( Math.PI/2, 4*Math.PI, 2*Math.PI/3, 1 );
    var check1 = new Matrix([
            [0.9999876047125096, 0.0022056744712789593, -0.004463790033644077, 0.0],
            [-0.0020845451869363238, 0.9996343109665102, 0.02696106470216037, 0.0],
            [0.0045216250067130195, -0.026951425539982213, 0.9996265180399435, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ]);
    assert.deepEqual( rotatedThape2.rotation, check1, "2nd pass" );

    var rotatedKid = thape.manufactureYoungster(thapeKid).rotate( Math.PI, Math.PI, Math.PI, Math.PI );
    assert.deepEqual( rotatedKid.rotation, check, "kid rotate pass" );
});

QUnit.test("translate test", function ( assert ) {
    var thape = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.pointy(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var thapeKid = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var translatedThape1 = thape.translate( 6, 9, 12 );
    var check = new Matrix([ 
            [1, 0, 0, 6],
            [0, 1, 0, 9],
            [0, 0, 1, 12],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual( translatedThape1.translation, check, "trans pass" );

    var translatedKid = thape.manufactureYoungster(thapeKid).translate( 6, 9, 12 );
    assert.deepEqual( translatedKid.translation, check, "kid trans pass" );
});

QUnit.test("scale test", function ( assert ) {
    var thape = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.pointy(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var thapeKid = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.blanky(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    var scaledThape1 = thape.scale( 3, 8, 13 );
    var check = new Matrix([ 
            [3, 0, 0, 0],
            [0, 8, 0, 0],
            [0, 0, 13, 0],
            [0, 0, 0, 1]
        ]);
    assert.deepEqual( scaledThape1.scaling, check, "scale pass" );

    var scaledKid = thape.manufactureYoungster(thapeKid).scale( 3, 8, 13 );
    assert.deepEqual( scaledKid.scaling, check, "kid scale pass" );
});

QUnit.test("stash/refresh test", function ( assert ) {
    var thape = new Shape({ r: 0.0, g: 0.00, b: 0.45 }, 
            Shapes.pointy(), 
            null, "LINE", 
            { x: 0.0, y: 1.0, z: 0.0 });
    thape.stash();
    assert.ok( thape.log.length == 1, "stash pass");
    thape.refresh();
    assert.ok( thape.log.length == 0, "refresh pass");
});

