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
        SpriteLibrary.man(tweenables);
    };

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: sun,
            keyframes: [
                {
                    frame: 50,
                    tx: 300,
                    ty: 600,
                    tweenlets: [
                        {label: "rayAngle", val: 69}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 100,
                    tx: 300,
                    ty: 0,
                    tweenlets: [
                        {label: "rayAngle", val: 69}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 150,
                    tx: 300,
                    ty: 600,
                    tweenlets: [
                        {label: "rayAngle", val: 69}
                    ]
                }
            ]
        },
        {
            draw: bird,
            keyframes: [
                {
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    sx: 0.5,
                    sy: 0.5,
                    tweenlets: [
                        {label: "leftWingAngle", val: 420},
                        {label: "rightWingAngle", val: 420}
                    ],
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    sx: 3,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftWingAngle", val: 420},
                        {label: "rightWingAngle", val: 420}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 60,
                    tweenlets: [
                        {label: "leftWingAngle", val: 420},
                        {label: "rightWingAngle", val: 420}
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
                    tweenlets: [
                        {label: "leftLegAngle", val: 420},
                        {label: "rightLegAngle", val: 420},
                        {label: "leftArmAngle", val: 420},
                        {label: "rightArmAngle", val: 420}
                    ],
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    tweenlets: [
                        {label: "leftLegAngle", val: 420},
                        {label: "rightLegAngle", val: 420},
                        {label: "leftArmAngle", val: 420},
                        {label: "rightArmAngle", val: 420}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    tweenlets: [
                        {label: "leftLegAngle", val: 420},
                        {label: "rightLegAngle", val: 420},
                        {label: "leftArmAngle", val: 420},
                        {label: "rightArmAngle", val: 420}
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