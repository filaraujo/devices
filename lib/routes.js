var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller');

app.get( '/device', device.getAllDevices, device.getDeviceByAgent, device.view.profile);
app.post( '/device', device.postDevice);
app.get( '/device/:device', device.getDeviceByHash, device.view.profile);
app.get( '/devices', device.getAllDevices, device.view.list);



app.get( '/components/layout/:ui?', function(req, res){
    res.render('components/layout/'+req.params.ui, {});
});

app.get( '/components/tabs', function(req, res){
    res.render('components/tabs', {});
});

app.get( '/playground', function(req, res){
    res.render('playground', {
        title: ''
    });
});