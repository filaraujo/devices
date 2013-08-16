var _ = require('lodash'),
    logger = require('winston').loggers.get('system'),
    uaParser = require('ua-parser');

var validate = function(obj, ancestor){
    _.forOwn(obj,function(val,key){
        var orig = ancestor + '.'+key;

        if(val === undefined || val === null){
            delete obj[key];
            logger.info('missing property value @ ' + orig);
        }

        if(_.isObject(val)){
            if(_.isEmpty(val)){
                return delete obj[key];
            }
            return validate(val, orig);
        }

        if(_.isString(val)){
            if(/true|false/.test(val)){
                obj[key] =  val === 'true';
            }
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
            sizecover: props.bgsizecover
        },
        border: {
            image: props.borderimage,
            radius: props.borderradius
        },
        box: {
            sizing: props.boxsizing,
            shadow: props.boxshadow
        },
        checked: props.checked,
        filters: props.cssfilters,
        layouts: {
            displaytable: props['display-table'],
            displayrunin: props['display-runin'],
            flexbox: props.flexbox,
            columns: props.csscolumns,
            positionsticky: props.csspositionsticky

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

var deviceFeatures = function(props){

    props.screen = props.screen || {};

    return {
        color: {
            depth: props.screen.colorDepth
        },
        screen: {
            height: Number(props.screen.windowHeight || 0),
            width: Number(props.screen.windowWidth || 0)
        }
    };
};

var htmlFeatures = function(props){

    props.input = props.input || {};
    props.inputtypes = props.inputtypes || {};

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


var javascriptFeatures = function(props){
    return {
        fullscreen: props.fullscreen,
        postmessage: props.postmessage
    };
};



module.exports = function DeviceHelper(ua, props){
    if(!ua || !props){
        throw new Error('Invalid User agent or Device Properties');
    }

    var uaObj = uaParser.parse(ua);

    this.constructor = DeviceHelper;

    // features
    this.css = cssFeatures(props);
    this.html = htmlFeatures(props);
    this.javascript = javascriptFeatures(props);

    // useragent
    this.id = uaObj.string;
    this.agent = uaObj.ua;
    this.agent.id = uaObj.ua.toString();
    this.agent.family = uaObj.family;

    // operating system
    this.system = uaObj.os;
    this.system.id = uaObj.os.toString();

    // device
    this.device = props ? _.assign(uaObj.device, deviceFeatures(props)) : uaObj.device;

    // validation
    validate(this,'device');
};