(function(){

    var
        test,

        tests = {},

        saveDevice = function(tests){
            return $.ajax({
                url: '/device',
                type: 'POST',
                data: tests
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