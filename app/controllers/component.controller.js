var logger = require('winston').loggers.get('system'),
    component = {
        view: {}
    };



component.view.get = function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.render('components/'+req.params, {
        device: res.device || {}
    });

    logger.info('Component loaded: ' + req.params);
};

module.exports = component;