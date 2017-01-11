/** blocks.js
 * Created by DylanGigabyte on 11/1/2017.
 */

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
function Block(inObj, inBlockType, inArg, inStartingPos, inDuration){
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
function addListener(inObj) {
    // Ensure input is enabled
    if(!inObj.inputEnabled){
        inObj.inputEnabled = true;
    }

    // Remove all tweens
    inObj.events.onInputDown.removeAll();

    // Execute all the tweens in queue
    inObj.events.onInputDown.add(function(){
        if (flag) {
            flag = false;

            var curBlock = new Block(inObj, inObj.blocks[0].block, inObj.blocks[0].arg, new Position(inObj));
            var prevBlock = curBlock;
            curBlock.tween.start();

            for (var i = 1; i < inObj.blocks.length; i++) {
                curBlock = new Block(inObj, inObj.blocks[i].block, inObj.blocks[i].arg, prevBlock.endPos);
                prevBlock.tween.chain(curBlock.tween);
                prevBlock = curBlock;
            }

            curBlock.tween.onComplete.add(function () {
                flag = true;
            });
        }
    }, this, 0, inObj);
}