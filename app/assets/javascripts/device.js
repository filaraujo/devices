(function(){

    var

        deviceId,

        asyncFeatures = ['dataworkers'],

        saveDevice = function(){
            var method = 'POST',
                url = '/device';

            if(deviceId){
                method = 'PUT';
                url = '/analysis/'+deviceId;
            }

            return $.ajax({
                url: url,
                type: method,
                data: {
                    features: setFeatures(),
                    useragent: window.navigator.userAgent
                }
            }).done(function(res){
                if(res.id){
                    window.location = '/device/'+res.id;
                }
            });
        },

        setFeatures = function(){
            return [
                // css
                { 'css.animation': Modernizr.cssanimations },
                { 'css.background.repeatround': Modernizr.bgrepeatround },
                { 'css.background.repeatspace': Modernizr.bgrepeatspace },
                { 'css.background.size': Modernizr.backgroundsize },
                { 'css.background.sizecover': Modernizr.bgsizecover },
                { 'css.border.image': Modernizr.borderimage },
                { 'css.border.radius': Modernizr.borderradius },
                { 'css.box.shadow': Modernizr.boxshadow },
                { 'css.box.sizing': Modernizr.boxsizing },
                { 'css.calc': Modernizr.csscalc },
                { 'css.checked': Modernizr.checked },
                { 'css.filter': Modernizr.cssfilters },
                { 'css.layout.displayrunin': Modernizr['display-runin'] },
                { 'css.layout.displaytable': Modernizr['display-table'] },
                { 'css.layout.columns': Modernizr.csscolumns },
                { 'css.layout.flexbox': Modernizr.flexbox },
                { 'css.layout.positionsticky': Modernizr.csspositionsticky },
                { 'css.transform.2d': Modernizr.csstransforms },
                { 'css.transform.3d': Modernizr.csstransforms3d },
                { 'css.transition': Modernizr.csstransitions },
                { 'css.unit.rem': Modernizr.cssremunit },
                { 'css.unit.vh': Modernizr.cssvhunit },
                { 'css.unit.vmin': Modernizr.cssvminunit },
                { 'css.unit.vmax': Modernizr.cssvmaxunit },
                { 'css.unit.vw': Modernizr.cssvwunit },

                // device
                { 'device.color.depth': screen.colorDepth },
                { 'device.screen.height': window.innerHeight > 0 ? window.innerHeight : screen.width },
                { 'device.screen.width': window.innerWidth > 0 ? window.innerWidth : screen.width },

                //html
                { 'html.input.property.autocomplete': Modernizr.input.autocomplete },
                { 'html.input.property.autofocus': Modernizr.input.autofocus },
                { 'html.input.property.list': Modernizr.input.list },
                { 'html.input.property.max': Modernizr.input.max },
                { 'html.input.property.min': Modernizr.input.min },
                { 'html.input.property.multiple': Modernizr.input.multiple },
                { 'html.input.property.pattern': Modernizr.input.pattern },
                { 'html.input.property.placeholder': Modernizr.input.placeholder },
                { 'html.input.property.required': Modernizr.input.required },
                { 'html.input.property.step': Modernizr.input.step },
                { 'html.input.type.color': Modernizr.inputtypes.color },
                { 'html.input.type.date': Modernizr.inputtypes.date },
                { 'html.input.type.datetime': Modernizr.inputtypes.datetime },
                { 'html.input.type.datetimelocal': Modernizr.inputtypes['datetime-local'] },
                { 'html.input.type.email': Modernizr.inputtypes.email },
                { 'html.input.type.file': Modernizr.fileinput },
                { 'html.input.type.month': Modernizr.inputtypes.month },
                { 'html.input.type.number': Modernizr.inputtypes.number },
                { 'html.input.type.range': Modernizr.inputtypes.range },
                { 'html.input.type.search': Modernizr.inputtypes.search },
                { 'html.input.type.tel': Modernizr.inputtypes.tel },
                { 'html.input.type.time': Modernizr.inputtypes.time },
                { 'html.input.type.url': Modernizr.inputtypes.url },
                { 'html.input.type.week': Modernizr.inputtypes.week },

                // javascript
                { 'javascript.fullscreen': Modernizr.fullscreen },
                { 'javascript.postmessage': Modernizr.postmessage },
                { 'javascript.worker.blob': Modernizr.blobworkers },
                { 'javascript.worker.data': Modernizr.dataworkers },
                { 'javascript.worker.shared': Modernizr.sharedworkers },
                { 'javascript.worker.web': Modernizr.webworkers }
            ];
        };

    deviceId = (window.location.href.match(/\/device\/([a-z0-9]+)$/) || [])[1] || undefined;

    /*
     * iterate through asyncFeatures and create a deferred object for each
     * resolve when Modernizr asyncTest completion is fired, or after 500ms
     */
    asyncFeatures = asyncFeatures.map(function(feature){
        var dfd = $.Deferred();
        Modernizr.on(feature, function(){
            dfd.resolve();
        });
        setTimeout(function(){
            if(dfd.state() !== 'resolved'){
                console.log('Modernizr feature ' + feature +' resolved by a timeout');
                dfd.resolve();
            }
        }, 500);
        return dfd.promise();
    });

    /*
     * create a promise that when all asyncFeatures promises are fullfilled, save the device
     */
    $.when.apply($, asyncFeatures)
        .done(saveDevice);

}());