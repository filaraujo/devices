var chai = require('chai'),
    expect = chai.expect;

var deviceAnalysisController = require('../app/controllers/device.analysis.controller');


describe('Device Analysis Controller', function(){
    describe('put route', function(){
        it('should export a put object', function(){
            expect(deviceAnalysisController.put).to.exist;
            expect(deviceAnalysisController.put).to.be.an('function');
        });

        describe('should', function(){

        });
    });
});