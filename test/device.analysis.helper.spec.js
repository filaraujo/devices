
var chai = require('chai'),
    expect = chai.expect;


var DeviceAnalysisHelper = require('../app/helpers/device.analysis.helper');

describe('Device Analysis Helper', function(){
    describe('put route', function(){

        it('should export a constructor', function(){
            expect(DeviceAnalysisHelper).to.exist;
            expect(DeviceAnalysisHelper).to.be.an('function');
        });

        it('should expect two parameters', function(){
            expect(DeviceAnalysisHelper.length).to.equal(2);
        });

        it('should return an object', function(){
            expect(new DeviceAnalysisHelper()).to.be.an('object');
        });
    });
});