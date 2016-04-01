QUnit.test("raw triangle array no args", function ( assert ) {
    var thape = new Shape({vertices: [], indices: []});
    assert.ok( thape.toRawTriangleArray().length == 0, "pass");
});

QUnit.test("raw line array no args", function ( assert ) {
    var thape = new Shape({vertices: [], indices: []});
    assert.ok( thape.toRawLineArray().length == 0, "pass");
});

QUnit.test("add/remove child", function ( assert ) {
    var thapeFather = new Shape({vertices: [[0, 0, 1], [0, 1, 0]], indices: []});
    var thapeKid = new Shape({vertices: [[0, 0, 0], [1, 0, 0]], indices: []});
    thapeFather.manufactureYoungster(thapeKid);
    assert.deepEqual( thapeFather.children[0], thapeKid, "add pass");
    thapeFather.razeYoungster(thapeKid);
    assert.ok( thapeFather.children.length == 0, "specific remove pass");
    thapeFather.manufactureYoungster(thapeKid);
    thapeFather.razeYoungster();
    assert.ok( thapeFather.children.length == 0, "non-specific remove pass")
});

QUnit.test("", function ( assert ) {
    
});