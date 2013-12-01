var _ = require('lodash'),
    logger = require('winston').loggers.get('system'),
    uaParser = require('ua-parser');

/**
 * validates the features values to ensure that they are valid
 */
var validate = function (obj, ancestor) {
    _.forOwn(obj, function (val, key) {
        var orig = ancestor + '.' + key,
            value;

        if (val === undefined || val === null) {
            delete obj[key];
            logger.info('missing property value @ ' + orig);
        }

        if (_.isObject(val)) {
            if (_.isEmpty(val)) {
                return delete obj[key];
            }
            return validate(val, orig);
        }

        if (_.isString(val)) {
            if (/true|false/.test(val)) {
                value = val === 'true';
                obj[key] = {
                    value: value,
                    supported: Number(value),
                    unsupported: Number(!value)
                };
            }
        }

    });
    return obj;
};


/**
 * build feature object
 * @param  {Object} feature feature object
 */
function buildFeature(feature) {
    var scope = this,
        key = Object.keys(feature)[0],
        parts = key.split('.');

    /**
     * recursive namespace walk
     */
    function walkNamespace(obj) {
        if (!scope[obj]) {
            scope[obj] = parts.length ? {} : feature[key];
        }
        scope = scope[obj];
        if (parts.length) {
            return walkNamespace(parts.shift());
        }
    }
    return walkNamespace(parts.shift());
}



module.exports = function DeviceHelper(ua, features) {
    if (!ua || !features) {
        throw new Error('Invalid User agent or Device Properties');
    }

    var uaObj = uaParser.parse(ua);

    this.constructor = DeviceHelper;
    this.id = uaObj.string;

    // features
    features.forEach(buildFeature.bind(this));

    // device
    this.device = _.assign(uaObj.device, this.device);

    // useragent
    this.agent = uaObj.ua;
    this.agent.name = uaObj.ua.toString();
    this.agent.family = uaObj.family;
    this.agent.version = uaObj.ua.toVersionString();
    // system
    this.system = uaObj.os;
    this.system.name = uaObj.os.toString();
    this.system.version = uaObj.os.toVersionString();

    validate(this, 'device');
};