/**
 * Created by codegakko on 28/12/16.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var arrow;
var flag = true;

// Javascript implementation of Enums.
var BLOCKS = { JUMP: 'JUMP', FORWARD: 'FORWARD', ROTATE: 'ROTATE' };

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('arrow', 'assets/arrow.png');
}

function create() {
    // The background sprite
    game.add.sprite(0, 0, 'sky');

    // The arrow sprite
    arrow = game.add.sprite(100, 100, 'arrow');
    arrow.width = 32;
    arrow.height = 32;
    arrow.anchor.set(0.5);
    arrow.headingInDegrees = 0;
    arrow.blocks = [];
    //arrow.blocks.push({ block: BLOCKS.ROTATE, degrees: 45});
    //arrow.blocks.push({ block: BLOCKS.FORWARD, distance: 50});

    //addListener(arrow);
}

/**
 * Creates a jump tween
 * @param {Sprite} inObj
 * @return {Tween}
 */
function jump(inObj) {
    var originalY = inObj.y;
    var originalAngle = inObj.angle;

    var tween = game.add.tween(inObj)
    tween = tween.to( { y: originalY-50 }, 500);
    tween = tween.to( { angle: originalAngle+360}, 500);
    tween = tween.to( { y: originalY }, 500);

    return tween;
}

/**
 * Creates a rotate tween, and changes the heading of the Sprite inObj
 * @param {Sprite} inObj
 * @param {float} inRotInDegrees
 * @return {Tween}
 */
function rotate(inObj, inRotInDegrees) {
    var copyObj = inObj;

    var tween = game.add.tween(inObj);
    tween = tween.to( { angle: copyObj.angle-inRotInDegrees }, 500);

    inObj.headingInDegrees -= inRotInDegrees;
    return tween;
}

/**
 * Creates a rotate tween
 * @param {Sprite} inObj
 * @param {float} inDist
 * @return {Tween}
 */
function forward(inObj, inDist) {
    var copyObj = inObj;
    var deltaX = Math.cos(Phaser.Math.degToRad(copyObj.headingInDegrees)) * inDist;
    var deltaY = Math.sin(Phaser.Math.degToRad(copyObj.headingInDegrees)) * inDist;

    var tween = game.add.tween(inObj);
    tween = tween.to( { x: copyObj.x+deltaX, y: copyObj.y+deltaY }, 500);

    return tween;
}

/**
 * Returns the Tween for a Adds a listener that will start the tween. This should be called ONCE, after the tween is ready.
 * @param {Sprite} inObj
 * @return {Void}
 */
function processBlock(inObj, inBlock) {
    if (inBlock.block === "JUMP") {
        return jump(inObj);
    }
    else if (inBlock.block === "FORWARD") {
        return forward(inObj, inBlock.distance);
    }
    else if (inBlock.block === "ROTATE") {
        return rotate(inObj, inBlock.degrees);
    }
}
/**
 * Adds a listener that will start the tween. This should be called ONCE, after the tween is ready.
 * @param {Sprite} inObj
 * @return {Void}
 */
function addListener(inObj) {
    // Ensure input is enabled
    if(!inObj.inputEnabled){
        inObj.inputEnabled = true;
    }

    // Remove all tweens
    inObj.events.onInputDown.removeAll();

    // If there is nothing to animate, do nothing, but this should never happen. Remove this check?
    if (inObj.blocks.length === 0) {
        console.log("It does do something.");
        return;
    }

    // Execute all the tweens in blocks
    inObj.events.onInputDown.add(function(){
        if (flag) {
            flag = false;

            var firstTween;
            var prevTween;
            var curTween;
            var lastTween;
            firstTween = processBlock(inObj, inObj.blocks[0]);
            prevTween = firstTween;
            curTween = firstTween;

            for (var i = 1; i < inObj.blocks.length; i++) {
                curTween = processBlock(inObj, inObj.blocks[i]);
                prevTween.chain(curTween);
                prevTween = curTween;
            }
            lastTween = curTween;
            lastTween.onComplete.add(function () {
                flag = true;
            });
            firstTween.start();
        }
    }, this, 0, inObj);
}

function update() {
}