/** gakkoGenerator.js
 * Created by codegakko on 28/12/16.
 */

var obj = '';
var event = '';

Blockly.JavaScript['arrow'] = function(block){
    obj = 'arrow';

    var code = '';
    event = block.getFieldValue('EVENT');
    if (event === 'EVENT_CLICKSPRITE') {
        event = 'click';
    }
    else if (event === 'EVENT_START') {
        event = 'start';
    }
    else {
        return;
    }

    var branch = Blockly.JavaScript.statementToCode(block, 'STMTS');
    if (branch) {
        code += branch;
    }

    return code;
}

Blockly.JavaScript['jump'] = function(block) {
    var code = 'that.'+ obj +'.' + event + 'Blocks.push({ block: "JUMP" });\n';
    return code;
};

Blockly.JavaScript['forward'] = function(block) {
    var distance = block.getFieldValue('distance');
    var code = 'that.'+ obj +'.' + event + 'Blocks.push({ block: "FORWARD", arg: ' + distance + ' });\n';
    return code;
};

Blockly.JavaScript['rotate'] = function(block) {
    var degrees = block.getFieldValue('degrees');
    var code = 'that.'+ obj +'.' + event + 'Blocks.push({ block: "ROTATE", arg: ' + degrees + ' });\n';
    return code;
};

function codeSetup (code) {
    code = 'var that = this;\n' +
        'that.'+ obj +'.startBlocks = [];\n' +
        'that.'+ obj +'.clickBlocks = [];\n' + code;
    return code;
}