var obj = '';

Blockly.JavaScript['arrow'] = function(block){
    obj = 'arrow';
    var code = 'var that = this;\n';
    var branch = Blockly.JavaScript.statementToCode(block, 'STMTS');
    if (branch) {
        code += 'that.'+ obj +'.blocks = [];\n';
        code += branch;
    }

    // Probably don't need this with the way I'm implementing addListener
    else {
        code += 'that.'+ obj + '.events.onInputDown.removeAll();\n';
        return code;
    }
    code += 'that.addListener(arrow);\n';
    return code;
}

Blockly.JavaScript['jump'] = function(block) {
    var code = 'that.'+ obj +'.blocks.push({ block: "JUMP" });\n';
    return code;
};

Blockly.JavaScript['forward'] = function(block) {
    var distance = block.getFieldValue('distance');
    var code = 'that.'+ obj +'.blocks.push({ block: "FORWARD", arg: ' + distance + ' });\n';
    return code;
};

Blockly.JavaScript['rotate'] = function(block) {
    var degrees = block.getFieldValue('degrees');
    var code = 'that.'+ obj +'.blocks.push({ block: "ROTATE", arg: ' + degrees + ' });\n';
    return code;
};