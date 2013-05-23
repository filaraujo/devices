var _ = require('lodash'),
    clog = require('clog');

var validate = function(obj, ancestor){
    _.forOwn(obj,function(val,key){
        var orig = ancestor + '.'+key;

        if(val === undefined || val === null){
            delete obj[key];
            clog.warn('missing property value @ ' + orig);
        }

        if(_.isObject(val)){
            validate(val, orig);
        }
    });
    return obj;
};


var cssFeatures = function(props){
    return {
        animations: props.cssanimations,
        background: {
            repeatround: props.bgrepeatround,
            repeatspace: props.bgrepeatspace,
            size: props.backgroundsize,
            sizeCover: props.bgsizecover
        },
        border: {
            image: props.borderimage,
            radius: props.borderradius
        },
        box: {
            sizing: props.boxsizing,
            shadow: props.boxshadow
        },
        filters: props.cssfilters,
        layouts: {
            displaytable: props['display-table'],
            displayrunin: props['display-runin'],
            flexbox: props.flexbox,
            columns: props.csscolumns,
            positionSticky: props.csspositionsticky

        },
        text: {},
        transforms: {
            '2d': props.csstransforms,
            '3d': props.csstransforms3d
        },
        transitions: props.csstransitions,
        units: {
            rem: props.cssremunit,
            vh: props.cssvhunit,
            vmin: props.cssvminunit,
            vmax: props.cssvmaxunit,
            vw: props.cssvwunit
        }
    };
};

var formFeatures = function(props){
    return {
        input: {
            properties: {
                autocomplete: props.input.autocomplete,
                autofocus: props.input.autofocus,
                list: props.input.list,
                max: props.input.max,
                min: props.input.min,
                multiple: props.input.multiple,
                pattern: props.input.pattern,
                placeholder: props.input.placeholder,
                required: props.input.required,
                step: props.input.step
            },
            types: {
                color: props.inputtypes.color,
                date: props.inputtypes.date,
                datetime: props.inputtypes.datetime,
                datetimelocal: props.inputtypes['datetime-local'],
                email: props.inputtypes.email,
                file: props.fileinput,
                month: props.inputtypes.month,
                number: props.inputtypes.number,
                range: props.inputtypes.range,
                search: props.inputtypes.search,
                tel: props.inputtypes.tel,
                time: props.inputtypes.time,
                url: props.inputtypes.url,
                week: props.inputtypes.week
            }
        }
    };
};



module.exports = function(){
    this.setFeatures = function(props){
        this.css = validate(cssFeatures(props), 'css');
        this.form = validate(formFeatures(props), 'form');
    };

    this.setUserAgent = function(uaObj){
        this.id = uaObj.string;
        this.agent = validate(uaObj.ua, 'useragent');
        this.agent.id = uaObj.ua.toString();
    };

    this.setOperatingSystem = function(uaObj){
        this.system = validate(uaObj.os, 'system');
        this.system.id = uaObj.os.toString();

    };
};