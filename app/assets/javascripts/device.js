(function(){

    var
        features,

        // cookieExists = document.cookie.indexOf('device=') > -1,

        saveDevice = function(features){
            return $.ajax({
                url: '/device',
                type: 'POST',
                data: {
                    features: features,
                    useragent: window.navigator.userAgent
                }
            });
        };

        console.log(window.navigator.userAgent);


    features = [
        // css
        { 'css.animations': Modernizr.cssanimations },
        { 'css.background.repeatround': Modernizr.bgrepeatround },
        { 'css.background.repeatspace': Modernizr.bgrepeatspace },
        { 'css.background.size': Modernizr.backgroundsize },
        { 'css.background.sizecover': Modernizr.bgsizecover },
        { 'css.border.image': Modernizr.borderimage },
        { 'css.border.radius': Modernizr.borderradius },
        { 'css.box.sizing': Modernizr.boxsizing },
        { 'css.box.shadow': Modernizr.boxshadow },
        { 'css.checked': Modernizr.checked },
        { 'css.filters': Modernizr.cssfilters },
        { 'css.layouts.displaytable': Modernizr['display-table'] },
        { 'css.layouts.displayrunin': Modernizr['display-runin'] },
        { 'css.layouts.columns': Modernizr.csscolumns },
        { 'css.layouts.flexbox': Modernizr.flexbox },
        { 'css.layouts.positionsticky': Modernizr.csspositionsticky },
        { 'css.transforms.2d': Modernizr.csstransforms },
        { 'css.transforms.3d': Modernizr.csstransforms3d },
        { 'css.transitions': Modernizr.csstransitions },
        { 'css.units.rem': Modernizr.cssremunit },
        { 'css.units.vh': Modernizr.cssvhunit },
        { 'css.units.vmin': Modernizr.cssvminunit },
        { 'css.units.vmax': Modernizr.cssvmaxunit },
        { 'css.units.vw': Modernizr.cssvwunit },

        // device
        { 'device.color.depth': screen.colorDepth },
        { 'device.screen.height': window.innerHeight > 0 ? window.innerHeight : screen.width },
        { 'device.screen.width': window.innerWidth > 0 ? window.innerWidth : screen.width },


        //html
        { 'html.input.properties.autocomplete': Modernizr.input.autocomplete },
        { 'html.input.properties.autofocus': Modernizr.input.autofocus },
        { 'html.input.properties.list': Modernizr.input.list },
        { 'html.input.properties.max': Modernizr.input.max },
        { 'html.input.properties.min': Modernizr.input.min },
        { 'html.input.properties.multiple': Modernizr.input.multiple },
        { 'html.input.properties.pattern': Modernizr.input.pattern },
        { 'html.input.properties.placeholder': Modernizr.input.placeholder },
        { 'html.input.properties.required': Modernizr.input.required },
        { 'html.input.properties.step': Modernizr.input.step },
        { 'html.input.types.color': Modernizr.inputtypes.color },
        { 'html.input.types.date': Modernizr.inputtypes.date },
        { 'html.input.types.datetime': Modernizr.inputtypes.datetime },
        { 'html.input.types.datetimelocal': Modernizr.inputtypes['datetime-local'] },
        { 'html.input.types.email': Modernizr.inputtypes.email },
        { 'html.input.types.file': Modernizr.fileinput },
        { 'html.input.types.month': Modernizr.inputtypes.month },
        { 'html.input.types.number': Modernizr.inputtypes.number },
        { 'html.input.types.range': Modernizr.inputtypes.range },
        { 'html.input.types.search': Modernizr.inputtypes.search },
        { 'html.input.types.tel': Modernizr.inputtypes.tel },
        { 'html.input.types.time': Modernizr.inputtypes.time },
        { 'html.input.types.url': Modernizr.inputtypes.url },
        { 'html.input.types.week': Modernizr.inputtypes.week },

        // javascript
        { 'javascript.fullscreen': Modernizr.fullscreen },
        { 'javascript.postmessage': Modernizr.postmessage }
    ];


    console.log(features);

    saveDevice(features).done(function(){
        console.log(features);
    });
}());