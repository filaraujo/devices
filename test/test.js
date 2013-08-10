
var chai = require('chai'),
    should = chai.should();

var deviceAnalysisController = require('../app/controllers/device.analysis.controller');


describe('Device Analysis Controller', function(){
    describe('put route', function(){
        it('should exist', function(){
            should.exist(deviceAnalysisController.put);
        });
    });
});