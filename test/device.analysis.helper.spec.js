var chai = require('chai'),
    expect = chai.expect;


var DeviceAnalysisHelper = require('../app/helpers/device.analysis.helper');

describe('Device Analysis Helper', function() {
    var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.41 Safari/537.36',
        device = {
            _id: '131313123'
        };

    describe('put route', function() {

        var dFunc = function(ua, props) {
            return function() {
                new DeviceAnalysisHelper(ua, props);
            }
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
                expect(dFunc(ua)).to.throw();
            });

            it('if device reference is passed without an id hash', function() {
                expect(dFunc({})).to.throw();
            });
        });

        describe('should return a analysis object', function() {
            it('if a valid user agent and features object is passed', function() {
                expect(dFunc(ua, {})).to.not.throw();
                expect(new DeviceAnalysisHelper(device)).to.be.an('object');
            });
            it('if a valid device reference is passed', function() {
                expect(dFunc(device)).to.not.throw();
                expect(new DeviceAnalysisHelper(device)).to.be.an('object');
            });
        });

    });
});