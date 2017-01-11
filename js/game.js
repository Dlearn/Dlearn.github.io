/** game.js
 * Created by codegakko on 28/12/16.
 */
var that = this;
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('animate', 'assets/button_animate.png');
    game.load.image('reset', 'assets/button_reset.png');
}

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
    arrow.blocks = [];

    // arrow.blocks.push({ block: "FORWARD", arg: 100});
    // arrow.blocks.push({ block: "ROTATE", arg: 90});
    // addListener(arrow);

    animate = game.add.button(game.world._width - 300, 10, 'animate', animateSprites, this);
    reset = game.add.button(game.world._width - 150, 10, 'reset', resetSpritePositions, this);
}

function animateSprites() {
    console.log("Whee");
}

function resetSpritePositions() {
    arrow.x = arrow.initial.initialX;
    arrow.y = arrow.initial.initialY;
    arrow.angle = arrow.initial.headingInDegrees;
    arrow.headingInDegrees = arrow.initial.headingInDegrees;
}

function update() {
}