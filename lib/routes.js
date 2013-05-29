var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller');

app.get( '/device', device.getAllDevices, device.getDeviceByAgent, device.view.index);
app.get( '/device/:device', device.getDeviceByHash, device.view.index);
// app.get( '/metrics', controllers.device.metrics );
app.post( '/device', device.postDevice);