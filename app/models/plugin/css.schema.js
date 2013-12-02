module.exports = function(schema, options){
    var featureObject = {
        value: Boolean,
        supported: Number,
        unsupported: Number
    };

    schema.add({
        css: {
            animation: featureObject,
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
            calc: featureObject,
            checked: featureObject,
            filter: featureObject,
            layout: {
                displayrunin: featureObject,
                displaytable: featureObject,
                flexbox: featureObject,
                columns: featureObject,
                positionsticky: featureObject

            },
            transform: {
                '2d': featureObject,
                '3d': featureObject
            },
            transition: featureObject,
            unit: {
                rem: featureObject,
                vh: featureObject,
                vmin: featureObject,
                vmax: featureObject,
                vw: featureObject
            }
        }
    });
};