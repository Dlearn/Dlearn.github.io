/** sprites.js
 * Created by Gigabyte on 11/1/2017.
 */

var that = this;
// Constructor for Sprite object
function Sprite(inSprite, inInitialX, inInitialY, inWidth, inHeight, inHeadingInDegrees) {
    this.initialX = inInitialX;
    this.initialY = inInitialY;
    this.width = inWidth;
    this.height = inHeight;
    this.headingInDegrees = inHeadingInDegrees;
}