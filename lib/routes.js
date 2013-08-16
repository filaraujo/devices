var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller'),
    analysis = require('../app/controllers/device.analysis.controller');

app.get('/device', device.get.byAgent, device.view.profile);
app.post('/device', device.post, analysis.post);

app.get('/device/:device', device.get.byHash, device.view.profile);
app.delete('/device/:device', device.delete.byHash);

app.put('/device/:device/analysis', device.get.byAgent, analysis.put);

app.get('/devices', device.get.all, device.view.list);
app.delete('/devices', device.delete.all);




app.get( '/components/*', device.get.byAgent, function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.render('components/'+req.params, {
        device: res.device || {}
    });
});

app.get( '/demo/*', function(req, res){
    res.render('demo/'+req.params, {});
});