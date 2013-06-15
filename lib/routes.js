var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller');

app.get( '/device', device.getAllDevices, device.getDeviceByAgent, device.view.profile);
app.post( '/device', device.postDevice);
app.get( '/device/:device', device.getDeviceByHash, device.view.profile);
app.get( '/devices', device.getAllDevices, device.view.list);



app.get( '/components/:component*', function(req, res){
    console.log(req.params)
    res.render('components/'+req.params.component, {});
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