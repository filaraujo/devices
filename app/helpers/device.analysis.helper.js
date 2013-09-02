var _ = require('lodash'),
    DeviceHelper = require('../../app/helpers/device.helper'),
    DeviceHelperAnalysis;


DeviceHelperAnalysis = function(ua, features) {

    if (!(ua && features) && !ua._id) {
        throw new Error('Invalid Device Reference or Device Parameters');
    }

    if(ua._id){
        // if device obj then extend this scope with passed in device object
        _.assign(this, ua);
        this.reference = this._id;
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
        if (_.isObject(val) && !(/_id|reference/).test(key)) {
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
DeviceHelperAnalysis.prototype.increment = function(features) {
    var increment = {};


    _.forEach(features, function(val, key){

        // if features is an array of object, then set key to inner object key, and value
        // to inner objects value
        if(_.isObject(val)){
            key = Object.keys(val)[0];
            val = val[key];
        }

        if(_.isString(val)){
            if(/true|false/.test(val)){
                val =  val === 'true';
            }
        }
        if (_.isBoolean(val)) {
            key = key + '.' + (val ? 'supported' : 'unsupported');
            increment[key] = 1;
        }
    });

    return increment;
};



module.exports = DeviceHelperAnalysis;