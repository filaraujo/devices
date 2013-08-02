module.exports = function(schema, options){
    var booleanObject = Boolean;

    if(options.analysis){
        booleanObject = {
            supported: Number,
            unsupported: Number
        };
    }

    schema.add({
        javascript: {
            fullscreen: booleanObject,
            postmessage: booleanObject
        }
    });
};