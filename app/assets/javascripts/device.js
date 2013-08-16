(function(){

    var
        test,

        tests = {},

        cookieExists = document.cookie.indexOf('device=') > -1,

        saveDevice = function(tests){
            return $.ajax({
                url: '/device',
                type: cookieExists ? 'PUT': 'POST',
                data: {
                    tests: tests,
                    useragent: window.navigator.userAgent
                }
            });
        };

    Modernizr.addTest("screen",function() {
        return {
            windowHeight:  window.innerHeight > 0 ? window.innerHeight : screen.width,
            windowWidth: window.innerWidth > 0 ? window.innerWidth : screen.width,
            colorDepth: screen.colorDepth
        };
    });

    for(test in Modernizr){
        if(Modernizr.hasOwnProperty(test)){
            if(typeof Modernizr[test] === 'function' || test.charAt(0) === '_'){
                continue;
            }
            tests[test] = Modernizr[test];
        }
    }

    saveDevice(tests).done(function(){
        console.log(tests);
    });
}());