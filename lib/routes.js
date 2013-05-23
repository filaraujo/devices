var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller');

app.get( '/', device.getAllDevices, device.getDevice, device.view.index);
// app.get( '/metrics', controllers.device.metrics );
app.post( '/device', device.postDevice);