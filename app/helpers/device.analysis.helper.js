var _ = require('lodash'),
    clog = require('clog'),
    DeviceHelper = require('../../app/helpers/device.helper'),
    DeviceHelperAnalysis;


DeviceHelperAnalysis = function(ua, features) {

    if (!(ua && features) && !ua._id) {
        throw new Error('Invalid Device Reference or Device Parameters');
    }

    if(ua._id){
        // if device obj then extend this scope with passed in device object
        _.assign(this, ua);
    }

    if(!ua._id){
        // if user agent and features passed, build new DeviceHelper with this scope
        DeviceHelper.bind(this)(ua, features);
    }

    return this;
};

/**
 * convert device object into a supported/unsupported matrix
 * @param  {Object} obj analysis object
 * @return {Object}     analysis instrument object
 */
DeviceHelperAnalysis.prototype.instrument = function instrument(obj) {
    var scope = obj || this,
        out = {};

    _.forOwn(scope, function(val, key) {
        if (_.isObject(val)) {
            out[key] = instrument(val);
            return;
        }
        if (_.isBoolean(val)) {
            out[key] = {
                supported: Number(val),
                unsupported: Number(!val)
            };
            return;
        }
        out[key] = val;
    });
    return out;
};

/**
 * convert device object into an object of increments properties
 * @param  {Object} obj device object
 * @return {Object}     analysis increment object
 */
DeviceHelperAnalysis.prototype.increment = function increment(obj, out, ancestor) {
    var scope = obj || this;

    out = out || {};

    _.forOwn(scope, function(val, key) {
        var orig = ancestor ? ancestor + '.' + key : key;

        if (_.isObject(val)) {
            increment(val, out, orig);
            return;
        }

        if (_.isBoolean(val)) {
            orig = orig + '.' + (val ? 'supported' : 'unsupported');
            out[orig] = 1;
            return;
        }

    });
    return out;
};



module.exports = DeviceHelperAnalysis;