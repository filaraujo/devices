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
            flexbox: {
                flexwrap: featureObject,
            },
            filter: featureObject,
            gradient: featureObject,
            hyphen: featureObject,
            layout: {
                displayrunin: featureObject,
                displaytable: featureObject,
                flexbox: featureObject,
                column: featureObject,
                objectfit: featureObject,
                positionsticky: featureObject

            },
            mask: featureObject,
            mediaquery: featureObject,
            overflow: {
                scrolling: featureObject
            },
            pointerevent: featureObject,
            reflection: featureObject,
            scrollbar: featureObject,
            shape: featureObject,
            support: featureObject,
            target: featureObject,
            transform: {
                '2d': featureObject,
                '3d': featureObject,
                preserve3d: featureObject
            },
            transition: featureObject,
            unit: {
                rem: featureObject,
                vh: featureObject,
                vmin: featureObject,
                vmax: featureObject,
                vw: featureObject
            },
            userselect: featureObject,
            wrapflow: featureObject
        }
    });
};