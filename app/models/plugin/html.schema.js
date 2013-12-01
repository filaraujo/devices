module.exports = function(schema, options){
    var featureObject = {
        value: Boolean,
        supported: Number,
        unsupported: Number
    };

    schema.add({
        html: {
            input: {
                properties: {
                    autocomplete: featureObject,
                    autofocus: featureObject,
                    list: featureObject,
                    max: featureObject,
                    min: featureObject,
                    multiple: featureObject,
                    pattern: featureObject,
                    placeholder: featureObject,
                    required: featureObject,
                    step: featureObject
                },
                types: {
                    color: featureObject,
                    date: featureObject,
                    datetime: featureObject,
                    datetimelocal: featureObject,
                    email: featureObject,
                    file: featureObject,
                    month: featureObject,
                    number: featureObject,
                    range: featureObject,
                    search: featureObject,
                    tel: featureObject,
                    time: featureObject,
                    url: featureObject,
                    week: featureObject
                }
            }
        }
    });
};