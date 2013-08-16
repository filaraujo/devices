var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    deviceMock = require('../test/mocks/device.mock.js');

var deviceAnalysisController = require('../app/controllers/device.analysis.controller'),
    DeviceAnalysisHelper = require('../app/helpers/device.analysis.helper');


describe('Device Analysis Controller', function(){
    var post = deviceAnalysisController.post;

    describe('post route', function(){
        it('should export a post object', function(){
            expect(post).to.exist;
            expect(post).to.be.an('function');
        });

        it('should expect two parameters', function() {
            expect(post.length).to.equal(2);
        });

        it('should create a new device analysis object', function(){
            // DeviceAnalysisHelper = sinon.spy();

            // post({},{
            //     device: deviceMock
            // });

            // console.log(DeviceAnalysisHelper.called)
            // expect(DeviceAnalysisHelper.called).to.be.true;
        });
    });

    describe('put route', function(){
        var put = deviceAnalysisController.put;

        it('should export a put object', function(){
            expect(put).to.exist;
            expect(put).to.be.an('function');
        });

        it('should expect two parameters', function() {
            expect(put.length).to.equal(2);
        });
    });
});