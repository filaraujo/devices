module.exports = function(schema, options){
    var featureObject = {
        value: Boolean,
        supported: Number,
        unsupported: Number
    };

    schema.add({
        javascript: {
            fullscreen: featureObject,
            postmessage: featureObject,
            workers: {
                blob: featureObject,
                data: featureObject,
                shared: featureObject,
                web: featureObject
            }
        }
    });
};