/** blocks.js
 * Created by DylanGigabyte on 11/1/2017.
 */

// Setting context
var that=this;

function normalizeAngle(inAngle) {
    if (inAngle >= 360) {
        return normalizeAngle(inAngle-360);
    }
    else if (inAngle <= -360) {
        return normalizeAngle(inAngle+360);
    }
    else {
        return inAngle
    }
}

// TODO: Are there other properties to record?
// Constructor for Position object
function Position(inObj) {
    this.x = inObj.x;
    this.y = inObj.y;
    this.headingInDegrees = inObj.headingInDegrees;
}

// TODO: Make duration
// This is where all the magic happens. It tells what tweens to add depending on the blocks.
// Importantly: This gives the tween AND the endposition of the sprite after the tween
function Block(inObj, inBlockType, inArg, inStartingPos, inDuration){
    // Default value for inDuration = 500;
    if (inDuration === undefined) { inDuration = 500; }

    this.endPos = inStartingPos;

    var tween = game.add.tween(inObj);
    if (inBlockType === "JUMP") {
        // No need to change endPos

        tween = tween.to( { y: inStartingPos.y-50 }, 500);
        tween = tween.to( { angle: inStartingPos.headingInDegrees+360}, 500);
        tween = tween.to( { y: inStartingPos.y }, 500);
    }
    else if (inBlockType === "FORWARD") {
        // Trigonometry
        var deltaX = Math.cos(Phaser.Math.degToRad(inStartingPos.headingInDegrees)) * inArg;
        var deltaY = Math.sin(Phaser.Math.degToRad(inStartingPos.headingInDegrees)) * inArg;
        this.endPos.x += deltaX;
        this.endPos.y += deltaY;

        tween = tween.to( { x: this.endPos.x, y: this.endPos.y }, 500);
    }
    else if (inBlockType === "ROTATE") {
        this.endPos.headingInDegrees -= inArg;
        inObj.headingInDegrees -= inArg;
        this.endPos.headingInDegrees = normalizeAngle(this.endPos.headingInDegrees);
        inObj.headingInDegrees = normalizeAngle(inObj.headingInDegrees);

        tween = tween.to( { angle: this.endPos.headingInDegrees }, 500);
    }

    this.tween = tween;
}

var flag = true;
function clickListener(inSprite) {
    // Ensure input is enabled
    if(!inSprite.inputEnabled){
        inSprite.inputEnabled = true;
    }

    // Remove all tweens
    inSprite.events.onInputDown.removeAll();

    inSprite.events.onInputDown.add(function() {
        // Do not execute if is in mid animation
        if (flag) {
            flag = false;

            // Execute all the tweens in queue
            var finalTween = animateSprite(inSprite, inSprite.clickBlocks);
            finalTween.onComplete.add(function () {
                // Allow the sprite to be clicked after all tweens
                flag = true;
            });
        }
    }, this, 0, inSprite);
}

function startAll(inSprites) { // At the moment, not sprite array input, but 1 sprite only
    disableAnimateButton();

    // If nothing to animate, add the clickListener;
    if (inSprites.startBlocks.length === 0) {
        clickListener(that.arrow);
        return;
    }

    var finalTween = animateSprite(inSprites, inSprites.startBlocks);
    finalTween.onComplete.add(function () {
        clickListener(that.arrow);
    });
}

// Return final tween so we can decide what to do after tween ends
function animateSprite(inSprite, inBlocks) {
    var curBlock = new Block(inSprite, inBlocks[0].block, inBlocks[0].arg, new Position(inSprite));
    var prevBlock = curBlock;
    curBlock.tween.start();

    for (var i = 1; i < inBlocks.length; i++) {
        curBlock = new Block(inSprite, inBlocks[i].block, inBlocks[i].arg, prevBlock.endPos);
        prevBlock.tween.chain(curBlock.tween);
        prevBlock = curBlock;
    }

    return curBlock.tween;
}

function disableAnimateButton() {
    that.animate.inputEnabled = false;
    that.animate.setFrames(1, 1, 1);
}

function enableAnimateButton() {
    that.animate.inputEnabled = true;
    that.animate.setFrames(0, 0, 0);
}