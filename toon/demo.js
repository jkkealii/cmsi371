/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // Draw the sprites!
    var sun = function (tweenables) {
        SpriteLibrary.sun(tweenables);
    };

    var bird = function (tweenables) {
        SpriteLibrary.bird(tweenables);
    };

    var man = function (tweenables) {
        SpriteLibrary.theMan(tweenables);
    };

    var scene = function (tweenables) {
        var renderingContext = tweenables.renderingContext;

        renderingContext.save();
        renderingContext.fillStyle = "white";
        renderingContext.fillRect(0, 0, 1024, 700);
        renderingContext.fillStyle = "green";
        renderingContext.fillRect(0, 600, 1024, 200);
        renderingContext.restore();
    }

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: scene,
            keyframes: [
                {
                    frame: 0,
                    tx: 0,
                    ty: 0,
                    sx: 1,
                    sy: 1,
                },

                {
                    frame: 100,
                    tx: 0,
                    ty: 0,
                    sx: 1,
                    sy: 1,
                },

                {
                    frame: 300,
                    tx: 0,
                    ty: 0,
                    sx: 1,
                    sy: 1,
                }
            ]
        },
        {
            draw: sun,
            keyframes: [
                {
                    frame: 0,
                    tx: 850,
                    ty: 100,
                    sx: 0.85,
                    sy: 0.85,
                    tweenlets: [
                        {label: "rayAngle", val: -0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 100,
                    tx: 900,
                    ty: 100,
                    sx: 0.85,
                    sy: 0.85,
                    tweenlets: [
                        {label: "rayAngle", val: 0.1 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 200,
                    tx: 850,
                    ty: 100,
                    sx: 0.85,
                    sy: 0.85,
                    tweenlets: [
                        {label: "rayAngle", val: -0.3 * Math.PI}
                    ]
                }
            ]
        },
        {
            draw: bird,
            keyframes: [
                {
                    frame: 0,
                    tx: 100,
                    ty: 100,
                    sx: 0.5,
                    sy: 0.5,
                    tweenlets: [
                        {label: "leftWingAngle", val: -0.3 * Math.PI},
                        {label: "rightWingAngle", val: -0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.slowToStart
                },

                {
                    frame: 20,
                    tx: 150,
                    ty: 100,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 40,
                    tx: 180,
                    ty: 500,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 60,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.9 * Math.PI},
                        {label: "rightWingAngle", val: 0.9 * Math.PI}
                    ]
                },

                {
                    frame: 60,
                    tx: 180,
                    ty: 500,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 60,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.9 * Math.PI},
                        {label: "rightWingAngle", val: 0.9 * Math.PI}
                    ]
                }
            ]
        },
        {
            draw: man,
            keyframes: [
                {
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftLegAngle", val: 0.9 * Math.PI},
                        {label: "rightLegAngle", val: 0.9 * Math.PI},
                        {label: "leftArmAngle", val: 0.9 * Math.PI},
                        {label: "rightArmAngle", val: 0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.startStopGo
                },

                {
                    frame: 30,
                    tx: 800,
                    ty: 20,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftLegAngle", val: -0.9 * Math.PI},
                        {label: "rightLegAngle", val: -0.9 * Math.PI},
                        {label: "leftArmAngle", val: -0.9 * Math.PI},
                        {label: "rightArmAngle", val: -0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.startStopGo
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: 80,
                    ty: 900,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftLegAngle", val: 0.9 * Math.PI},
                        {label: "rightLegAngle", val: 0.9 * Math.PI},
                        {label: "leftArmAngle", val: 0.9 * Math.PI},
                        {label: "rightArmAngle", val: 0.9 * Math.PI}
                    ],
                    rotate: 60 // Keyframe.rotate uses degrees.
                }
            ]
        }
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());