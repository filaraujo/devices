module.exports = function(schema, options){
    var booleanObject = Boolean;

    if(options.analysis){
        booleanObject = {
            supported: Number,
            unsupported: Number
        };
    }

    schema.add({
        css: {
            animations: booleanObject,
            background: {
                repeatround: booleanObject,
                repeatspace: booleanObject,
                size: booleanObject,
                sizecover: booleanObject
            },
            border: {
                image: booleanObject,
                radius: booleanObject
            },
            box: {
                sizing: booleanObject,
                shadow: booleanObject
            },
            checked: booleanObject,
            filters: booleanObject,
            layouts: {
                displayrunin: booleanObject,
                displaytable: booleanObject,
                flexbox: booleanObject,
                columns: booleanObject,
                positionsticky: booleanObject

            },
            text: {},
            transforms: {
                '2d': booleanObject,
                '3d': booleanObject
            },
            transitions: booleanObject,
            units: {
                rem: booleanObject,
                vh: booleanObject,
                vmin: booleanObject,
                vmax: booleanObject,
                vw: booleanObject
            }
        }
    });
};