/** gakkoUtil.js
 * Created by DylanGigabyte on 18/1/2017.
 */

Blockly.JavaScript.workspaceToCode = function (inWorkspace) {
    // workspaceToCode function modified from original function in blockly_compressed.js
    inWorkspace||(console.warn("No workspace specified in workspaceToCode call.  Guessing."),inWorkspace=Blockly.getMainWorkspace());

    var code = [];
    var eventHeaderBlks = ['arrow'];

    this.init(inWorkspace);
    var topBlocks = inWorkspace.getTopBlocks(true);

    for(var i=0,topBlock;topBlock=topBlocks[i];i++) {
        var line = this.blockToCode(topBlock);

        // Value blocks return tuples of code and operator order.
        // Top-level blocks don't care about operator order.
        goog.isArray(line)&&(line=line[0]);

        if (line) {
            if (topBlock.outputConnection && this.scrubNakedValue) {
                // This block is a naked value.  Ask the language's code generator if
                // it wants to append a semicolon, or something.
                line = this.scrubNakedValue(line);
            }
            // @note: The main difference is we separate out declarations
            if (eventHeaderBlks.indexOf(topBlock.type) != -1 ) { // isEventHeaderBlk
                code.push(line);
            } else {
                code.push('// '+line);
            }
        }
    }
    code = code.join("\n");
    code = this.finish(code);
    code = scrubWhitespace(code);

    return code;
}

function scrubWhitespace(code) {
    code = code.replace(/^\s+\n/, '');
    code = code.replace(/\n\s+$/, '\n');
    code = code.replace(/[ \t]+\n/g, '\n');
    return code;
}