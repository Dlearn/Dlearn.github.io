// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4gu9nf

Blockly.Blocks['arrow'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ARROW");
        this.appendStatementInput("STMTS")
            .setCheck(null);
        this.setMovable(false);
        this.setColour(210);
        this.setTooltip('ARROWTooltip');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['jump'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("jump");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('jumpTooltip');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['forward'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("forward")
            .appendField(new Blockly.FieldNumber(50, -800, 800, 1), "distance");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('forwardTooltip');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['rotate'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("rotate")
            .appendField(new Blockly.FieldAngle(45), "degrees");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('rotateTooltip');
        this.setHelpUrl('http://www.example.com/');
    }
};