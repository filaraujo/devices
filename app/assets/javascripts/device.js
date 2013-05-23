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