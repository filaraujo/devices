var _ = require('lodash'),
    clog = require('clog'),
    DeviceHelper = require('../../app/helpers/device.helper'),
    DeviceHelperAnalysis;


DeviceHelperAnalysis = function(ua, props){
    if(ua._id){
        _.assign(this, ua);
    } else {
        DeviceHelper.bind(this)(ua, props);
    }

    if(this._id){
        this.reference = this._id;
    }

    return this;
};

DeviceHelperAnalysis.prototype.instrument = function instrument(obj){
    var scope = obj || this,
        out = {};

    _.forOwn(scope, function(val, key){
        if(_.isObject(val)){
            out[key] = instrument(val);
            return;
        }
        if(_.isBoolean(val)){
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


DeviceHelperAnalysis.prototype.increment = function increment(obj, out, ancestor){
    var scope = obj || this;

    out = out || {};

    _.forOwn(scope, function(val,key){
        var orig = ancestor ? ancestor + '.'+key : key;

        if(_.isObject(val)){
            increment(val, out, orig);
            return;
        }

        if(_.isBoolean(val)){
            orig = orig + '.' + (val ? 'supported' : 'unsupported');
            out[orig] = 1;
            return ;
        }

    });
    return out;
};



module.exports = DeviceHelperAnalysis;