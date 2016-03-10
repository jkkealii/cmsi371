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
        renderingContext.fillStyle = "cyan";
        renderingContext.fillRect(0, 0, 1024, 700);
        renderingContext.fillStyle = "green";
        renderingContext.fillRect(0, 600, 1024, 200);
        renderingContext.restore();
    };

    var secret = function (tweenables) {
        var renderingContext = tweenables.renderingContext;
        var secretImg = new Image();
        secretImg.src = "cheesy.jpg";
        renderingContext.drawImage(secretImg, 500 , 300);
    }

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: secret,
            keyframes: [
                {
                    frame: 0,
                    tx: 0,
                    ty: 0,
                    sx: 0.40,
                    sy: 0.40
                },

                {
                    frame: 200,
                    tx: 0,
                    ty: 0,
                    sx: 0.40,
                    sy: 0.40
                },

                {
                    frame: 400,
                    tx: 0,
                    ty: 0,
                    sx: 0.40,
                    sy: 0.40
                }
            ]
        },
        {
            draw: scene,
            keyframes: [
                {
                    frame: 0,
                    tx: 0,
                    ty: 0,
                    sx: 1,
                    sy: 1,
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 200,
                    tx: 1000,
                    ty: 0,
                    sx: 1,
                    sy: 1,
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 400,
                    tx: 0,
                    ty: 0,
                    sx: 1,
                    sy: 1
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
                    frame: 50,
                    tx: 900,
                    ty: 100,
                    sx: 0.85,
                    sy: 0.85,
                    rotate: 45,
                    tweenlets: [
                        {label: "rayAngle", val: 0.1 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 100,
                    tx: 900,
                    ty: 150,
                    sx: 0.85,
                    sy: 0.85,
                    rotate: 90,
                    tweenlets: [
                        {label: "rayAngle", val: -0.4 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 150,
                    tx: 850,
                    ty: 150,
                    sx: 0.85,
                    sy: 0.85,
                    rotate: 135,
                    tweenlets: [
                        {label: "rayAngle", val: 0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 200,
                    tx: 850,
                    ty: 100,
                    sx: 0.25,
                    sy: 0.25,
                    rotate: 180,
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
                    ty: 200,
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
                    ease: KeyframeTweener.quadEaseIn
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 40,
                    tx: 180,
                    ty: 300,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.9 * Math.PI},
                        {label: "rightWingAngle", val: 0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 60,
                    tx: 100,
                    ty: 100,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 80,
                    tx: 340,
                    ty: 200,
                    sx: 0.85,
                    sy: 0.85,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.3 * Math.PI},
                        {label: "rightWingAngle", val: 0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.startStopGo
                },

                {
                    frame: 100,
                    tx: 80,
                    ty: 120,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: -0.3 * Math.PI},
                        {label: "rightWingAngle", val: -0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 120,
                    tx: 140,
                    ty: 90,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.3 * Math.PI},
                        {label: "rightWingAngle", val: 0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 140,
                    tx: 600,
                    ty: 110,
                    sx: 0.25,
                    sy: 0.25,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 160,
                    tx: 60,
                    ty: 450,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.9 * Math.PI},
                        {label: "rightWingAngle", val: 0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 180,
                    tx: 850,
                    ty: 300,
                    sx: 0.75,
                    sy: 0.75,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.slowToStart
                },

                {
                    frame: 200,
                    tx: 900,
                    ty: 350,
                    sx: 0.5,
                    sy: 0.5,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.3 * Math.PI},
                        {label: "rightWingAngle", val: 0.3 * Math.PI}
                    ]
                }
            ]
        },
        {
            draw: bird,
            keyframes: [
                {
                    frame: 0,
                    tx: 120,
                    ty: 220,
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
                    tx: 170,
                    ty: 120,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseIn
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 40,
                    tx: 200,
                    ty: 320,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.9 * Math.PI},
                        {label: "rightWingAngle", val: 0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 60,
                    tx: 120,
                    ty: 120,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 80,
                    tx: 360,
                    ty: 220,
                    sx: 0.85,
                    sy: 0.85,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.3 * Math.PI},
                        {label: "rightWingAngle", val: 0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.startStopGo
                },

                {
                    frame: 100,
                    tx: 100,
                    ty: 140,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: -0.3 * Math.PI},
                        {label: "rightWingAngle", val: -0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.backAndForth
                },

                {
                    frame: 120,
                    tx: 160,
                    ty: 110,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.3 * Math.PI},
                        {label: "rightWingAngle", val: 0.3 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseInOut
                },

                {
                    frame: 140,
                    tx: 620,
                    ty: 130,
                    sx: 0.25,
                    sy: 0.25,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseIn
                },

                {
                    frame: 160,
                    tx: 80,
                    ty: 470,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: -20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.9 * Math.PI},
                        {label: "rightWingAngle", val: 0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 180,
                    tx: 870,
                    ty: 320,
                    sx: 0.75,
                    sy: 0.75,
                    rotate: 20,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.6 * Math.PI},
                        {label: "rightWingAngle", val: 0.6 * Math.PI}
                    ],
                    ease: KeyframeTweener.slowToStart
                },

                {
                    frame: 200,
                    tx: 920,
                    ty: 370,
                    sx: 0.5,
                    sy: 0.5,
                    tweenlets: [
                        {label: "leftWingAngle", val: 0.3 * Math.PI},
                        {label: "rightWingAngle", val: 0.3 * Math.PI}
                    ]
                }
            ]
        },
        {
            draw: man,
            keyframes: [
                {
                    frame: 0,
                    tx: 320,
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
                    frame: 60,
                    tx: 330,
                    ty: 400,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftLegAngle", val: -0.9 * Math.PI},
                        {label: "rightLegAngle", val: -0.9 * Math.PI},
                        {label: "leftArmAngle", val: -0.9 * Math.PI},
                        {label: "rightArmAngle", val: -0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 120,
                    tx: 340,
                    ty: 500,
                    sx: 0.25,
                    sy: 0.25,
                    tweenlets: [
                        {label: "leftLegAngle", val: -0.9 * Math.PI},
                        {label: "rightLegAngle", val: -0.9 * Math.PI},
                        {label: "leftArmAngle", val: -0.9 * Math.PI},
                        {label: "rightArmAngle", val: -0.9 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseIn
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 180,
                    tx: 380,
                    ty: 600,
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
        },
        {
            draw: man,
            keyframes: [
                {
                    frame: 0,
                    tx: 720,
                    ty: 550,
                    sx: 0.15,
                    sy: 0.15,
                    tweenlets: [
                        {label: "leftLegAngle", val: 0.75 * Math.PI},
                        {label: "rightLegAngle", val: 0.75 * Math.PI},
                        {label: "leftArmAngle", val: 0.75 * Math.PI},
                        {label: "rightArmAngle", val: 0.75 * Math.PI}
                    ],
                    ease: KeyframeTweener.startStopGo,
                    rotate: -20
                },

                {
                    frame: 50,
                    tx: 630,
                    ty: 550,
                    sx: 0.15,
                    sy: 0.15,
                    tweenlets: [
                        {label: "leftLegAngle", val: -0.75 * Math.PI},
                        {label: "rightLegAngle", val: -0.75 * Math.PI},
                        {label: "leftArmAngle", val: -0.75 * Math.PI},
                        {label: "rightArmAngle", val: -0.75 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseOut,
                    rotate: 20
                },

                {
                    frame: 90,
                    tx: 540,
                    ty: 550,
                    sx: 0.15,
                    sy: 0.15,
                    tweenlets: [
                        {label: "leftLegAngle", val: -0.75 * Math.PI},
                        {label: "rightLegAngle", val: -0.75 * Math.PI},
                        {label: "leftArmAngle", val: -0.75 * Math.PI},
                        {label: "rightArmAngle", val: -0.75 * Math.PI}
                    ],
                    ease: KeyframeTweener.quadEaseIn,
                    rotate: -20
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 180,
                    tx: 400,
                    ty: 550,
                    sx: 0.15,
                    sy: 0.15,
                    tweenlets: [
                        {label: "leftLegAngle", val: 0.75 * Math.PI},
                        {label: "rightLegAngle", val: 0.75 * Math.PI},
                        {label: "leftArmAngle", val: 0.75 * Math.PI},
                        {label: "rightArmAngle", val: 0.75 * Math.PI}
                    ],
                    rotate: 20 // Keyframe.rotate uses degrees.
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