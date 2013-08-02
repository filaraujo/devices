var _ = require('lodash'),
    clog = require('clog'),
    device = {},
    DeviceAnalysis = require('../../app/models/device.analysis.schema'),
    DeviceHelper = require('../../app/helpers/device.helper'),
    diff = require('deep-diff'),
    uaParser = require('ua-parser');

//curl -v -H "Content-Type: application/json" -X PUT -d '{"tests":{"javascript": { "fullscreen": false}}}' http://localhost:3000/device/51fb0a8b7c6bcb0000000002/analysis -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36"

exports.put = function(req, res, next){
    var device = _.pick(res.device, ['html', 'css', 'javascript']);
    var difference = diff(device, req.body.tests);


    var test = [];

    difference.filter(function(d){
        console.log(d)

        if(d.kind === 'D'){
            clog.info(d.path.join('.') + ' does not exist in new object');
            return;
        }

        if(d.kind === 'E'){
            clog.warn(d.path.join('.') + ' was modified in new object');
            test.push({

            });
        }

        // if(d.kind === 'N'){
        //     clog.error(d.path.join('.') + ' does not exist in original object');
        //     return;
        // }

    });

    console.log(test)
    res.json({}, 200);
};