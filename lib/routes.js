var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller');

app.get( '/device', device.getAllDevices, device.getDeviceByAgent, device.view.profile);
app.post( '/device', device.postDevice);
app.get( '/device/:device', device.getDeviceByHash, device.view.profile);
app.get( '/devices', device.getAllDevices, device.view.list);



app.get( '/components/*', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.render('components/'+req.params, {});
});

app.get( '/components/modal', function(req, res){
    res.render('components/modal', {});
});

app.get( '/playground', function(req, res){
    res.render('playground', {
        title: ''
    });
});

app.get( '/presentation', function(req, res){
    res.render('presentation', {
        title: ''
    });
});