var _ = require('lodash'),
    chai = require('chai'),
    expect = chai.expect,
    deviceMock = require('../test/mocks/device.mock.js'),
    deviceFeatureMock = require('../test/mocks/device.features.mock.js'),
    deviceUAMock = require('../test/mocks/device.ua.mock.js'),
    DeviceHelper = require('../app/helpers/device.helper');

describe('Device Analysis Helper', function() {

    var dFunc = function(ua, props) {
        return function() {
            return new DeviceHelper(ua, props);
        };
    };

    it('should export a constructor', function() {
        expect(DeviceHelper).to.exist;
        expect(DeviceHelper).to.be.an('function');
    });

    it('should expect up to two parameters', function() {
        expect(DeviceHelper.length).to.equal(2);
    });

    // error state
    describe('should throw an error', function() {
        it('if no parameters are passed', function() {
            expect(dFunc()).to.throw();
        });

        it('if user agent is passed without features object', function() {
            expect(dFunc(deviceUAMock)).to.throw();
        });

        it('if device reference is passed without an id hash', function() {
            expect(dFunc({})).to.throw();
        });
    });

    // device object
    describe('should return an device object', function() {
        it('if a valid user agent and features object is passed', function() {
            var device = new DeviceHelper(deviceUAMock, deviceFeatureMock);

            expect(dFunc(deviceUAMock, deviceFeatureMock)).to.not.throw();
            expect(device).to.be.an('object');
            expect(device).to.instanceof(DeviceHelper);
        });

        it('that contains an agent object', function(){
            var device = new DeviceHelper(deviceUAMock, deviceFeatureMock);

            expect(device).to.contain.keys(['agent']);

            _.forOwn(device.agent, function(val,prop){
                expect(val).to.eql(deviceMock.agent[prop]);
            });
        });

        it('that contains an device object', function(){
            var device = new DeviceHelper(deviceUAMock, deviceFeatureMock);

            expect(device).to.contain.keys(['device']);

            _.forOwn(device.device, function(val,prop){
                expect(val).to.eql(deviceMock.device[prop]);
            });

        });

        it('that contains an css object', function(){
            var device = new DeviceHelper(deviceUAMock, deviceFeatureMock);

            expect(device).to.contain.keys(['css']);

            _.forOwn(device.css, function(val,prop){
                console.log(val, typeof prop, typeof deviceMock.css[prop])
                expect(val).to.eql(deviceMock.css[prop]);
            });

        });
    });
});