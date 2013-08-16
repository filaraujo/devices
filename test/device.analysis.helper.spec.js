var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    deviceMock = require('../test/mocks/device.mock.js'),
    deviceFeatureMock = require('../test/mocks/device.features.mock.js'),
    deviceUAMock = require('../test/mocks/device.ua.mock.js'),
    DeviceAnalysisHelper = require('../app/helpers/device.analysis.helper');

describe('Device Analysis Helper', function() {

    var dFunc = function(ua, props) {
        return function() {
            return new DeviceAnalysisHelper(ua, props);
        };
    };

    it('should export a constructor', function() {
        expect(DeviceAnalysisHelper).to.exist;
        expect(DeviceAnalysisHelper).to.be.an('function');
    });

    it('should expect up to two parameters', function() {
        expect(DeviceAnalysisHelper.length).to.equal(2);
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

    // analysis object
    describe('should return an analysis object', function() {
        it('if a valid user agent and features object is passed', function() {
            var device = new DeviceAnalysisHelper(deviceUAMock, deviceFeatureMock);

            expect(dFunc(deviceUAMock, deviceFeatureMock)).to.not.throw();
            expect(device).to.be.an('object');
            expect(device).to.contain.keys(['agent','device','css','html','javascript','system']);
            expect(device).to.instanceof(DeviceAnalysisHelper);
            expect(device).to.respondTo('increment');
            expect(device).to.respondTo('instrument');
        });

        it('if a valid device reference is passed', function() {
            var device = new DeviceAnalysisHelper(deviceMock);

            expect(dFunc(deviceMock)).to.not.throw();
            expect(device).to.be.an('object');
            expect(device).to.contain.keys(['agent','device','css','html','javascript','system']);
            expect(device).to.instanceof(DeviceAnalysisHelper);
            expect(device).to.respondTo('increment');
            expect(device).to.respondTo('instrument');
        });
    });

    //instrument
    describe('should instrument an analysis object', function() {
        it('if the instrument method is called', function(){
            var analysis = new DeviceAnalysisHelper(deviceMock).instrument();

             [
                analysis.css.border.image,
                analysis.css.border.radius,
                analysis.css.background.repeatround,
                analysis.css.background.repeatspace,
                analysis.css.background.size
            ].forEach(function(i){
                expect(i.supported).to.exist;
                expect(i.unsupported).to.exist;
                expect(i.unsupported).to.be.a('number');
                expect(i.unsupported).to.be.within(0,1);
            });
        });
    });


    //instrument
    describe('should create an analysis increment object', function() {
        it('if the increment method is called', function(){
            var analysis = new DeviceAnalysisHelper(deviceMock).increment();

            [
                'css.border.image.supported',
                'css.border.radius.supported',
                'css.background.repeatround.unsupported',
                'css.background.repeatspace.unsupported',
                'css.background.size.supported'
            ].forEach(function(i){
                expect(analysis[i]).to.equal(1);

            });
        });
    });
});