/** game.js
 * Created by codegakko on 28/12/16.
 */
var that = this;
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.spritesheet('animate3', 'assets/button_animate3.png', 130, 40);
    game.load.spritesheet('reset2', 'assets/button_reset2.png', 135, 40);
}

var sprites; // An array of all the sprites in the game to animate them all, for now we'll use the sprite
var arrow;
var animate;
var reset;

function create() {
    // The background sprite
    game.add.sprite(0, 0, 'sky');

    // The arrow sprite
    var arrowInitial = new Sprite('arrow', 250, 250, 64, 64, 0);
    arrow = game.add.sprite(arrowInitial.initialX, arrowInitial.initialY, 'arrow');
    arrow.initial = arrowInitial;
    arrow.width = arrowInitial.width;
    arrow.height = arrowInitial.height;
    arrow.headingInDegrees = arrowInitial.headingInDegrees;
    arrow.anchor.set(0.5);
    arrow.startBlocks = [];
    arrow.clickBlocks = [];
    //sprites.push(arrow);
    // TODO: Multiple sprites

    animate = game.add.button(game.world._width - 300, 10, 'animate3', startButton, this, 0, 0, 0);
    reset = game.add.button(game.world._width - 150, 10, 'reset2', resetSpritePositions, this);
}

function startButton() {
    //startAll(sprites);
    startAll(arrow);
}

function resetSpritePositions() {
    // TODO: Objects continue to tween after reset
    arrow.x = arrow.initial.initialX;
    arrow.y = arrow.initial.initialY;
    arrow.angle = arrow.initial.headingInDegrees;
    arrow.headingInDegrees = arrow.initial.headingInDegrees;

    arrow.events.onInputDown.removeAll();
    enableAnimateButton();
}

function update() {
}