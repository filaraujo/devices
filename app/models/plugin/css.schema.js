module.exports = function(schema, options){
    var featureObject = {
        value: Boolean,
        supported: Number,
        unsupported: Number
    };

    schema.add({
        css: {
            animations: featureObject,
            background: {
                repeatround: featureObject,
                repeatspace: featureObject,
                size: featureObject,
                sizecover: featureObject
            },
            border: {
                image: featureObject,
                radius: featureObject
            },
            box: {
                sizing: featureObject,
                shadow: featureObject
            },
            checked: featureObject,
            filters: featureObject,
            layouts: {
                displayrunin: featureObject,
                displaytable: featureObject,
                flexbox: featureObject,
                columns: featureObject,
                positionsticky: featureObject

            },
            text: {},
            transforms: {
                '2d': featureObject,
                '3d': featureObject
            },
            transitions: featureObject,
            units: {
                rem: featureObject,
                vh: featureObject,
                vmin: featureObject,
                vmax: featureObject,
                vw: featureObject
            }
        }
    });
};