modules.push(
    function(){
        /**
         * toggle full screen
         */
        function toggleFullScreen(){
            this.fullscreen = !this.fullscreen;

            if(this.fullscreen){
                document.body.requestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                return;
            }

            document.cancelFullScreen();
        };


        this.fullscreen = false;
        this.addEventListener('togglefullscreen', toggleFullScreen);

        // normalize api
        document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen,
        document.body.requestFullScreen = document.body.requestFullScreen || document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen;
    }
);