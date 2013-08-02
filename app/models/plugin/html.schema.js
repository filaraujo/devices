module.exports = function(schema, options){
    var booleanObject = Boolean;

    if(options.analysis){
        booleanObject = {
            supported: Number,
            unsupported: Number
        };
    }

    schema.add({
        html: {
            input: {
                properties: {
                    autocomplete: booleanObject,
                    autofocus: booleanObject,
                    list: booleanObject,
                    max: booleanObject,
                    min: booleanObject,
                    multiple: booleanObject,
                    pattern: booleanObject,
                    placeholder: booleanObject,
                    required: booleanObject,
                    step: booleanObject
                },
                types: {
                    color: booleanObject,
                    date: booleanObject,
                    datetime: booleanObject,
                    datetimelocal: booleanObject,
                    email: booleanObject,
                    file: booleanObject,
                    month: booleanObject,
                    number: booleanObject,
                    range: booleanObject,
                    search: booleanObject,
                    tel: booleanObject,
                    time: booleanObject,
                    url: booleanObject,
                    week: booleanObject
                }
            }
        }
    });
};