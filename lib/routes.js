var app = module.parent.exports.app,
    component = require('../app/controllers/component.controller'),
    device = require('../app/controllers/device.controller'),
    analysis = require('../app/controllers/device.analysis.controller');

app.get('/device', device.get.byAgent, device.view.profile);
app.post('/device', device.post, analysis.post);

app.get('/device/:device', device.get.byHash, device.view.profile);
app.delete('/device/:device', device.delete.byHash);

app.get('/analysis', device.get.byAgent, analysis.put.features);
app.delete('/analyses', analysis.delete.all);
// app.put('/device/:device/analysis', device.get.byAgent, analysis.put);

app.get('/devices', device.get.all, device.view.list);
app.delete('/devices', device.delete.all);
app.delete('/analysis', analysis.delete.all);


app.get( '/components/*', device.get.byAgent, component.view.get);

app.get( '/demo/*', function(req, res){
    res.render('demo/'+req.params, {});
});