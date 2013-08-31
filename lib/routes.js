var app = module.parent.exports.app,
    device = require('../app/controllers/device.controller'),
    analysis = require('../app/controllers/device.analysis.controller'),
    view = require('../app/controllers/view.controller');

/**
 * /device routes
 */
app.get('/device', device.get.byAgent, device.view.capture);
// app.get('/device/new', );
app.post('/device', device.post, analysis.post);
app.get('/device/:device', device.get.byHash, analysis.get.byHash, device.view.profile);
// app.get('/device/:device/edit', );
// app.put('/device/:device', );
app.delete('/device/:device', device.delete.byHash);


/**
 * devices routes
 */
app.get('/devices', device.get.all, device.view.list);
app.get('/devices/browser', device.get.browsers, device.view.list);
app.get('/devices/system', device.get.systems, device.view.list);
app.delete('/devices', device.delete.all);


/**
 * analysis routes
 */
app.get('/analysis', device.get.byAgent, analysis.put.features);
// app.get('/analysis/new', );
// app.post('/analysis', );
// app.get('/analysis/:analysis', );
// app.get('/analysis/:analysis/edit', );
 app.put('/analysis/:device', device.get.byHash, analysis.put.features);
// app.delete('/analysis/:analysis', );


/**
 * analyses routes
 */
// app.get('/analyses', );
app.delete('/analyses', analysis.delete.all);



/**
 * Misc routes
 */
app.get('/components/*', device.get.byAgent, view.component);
app.get('/demo/*', view.demo);