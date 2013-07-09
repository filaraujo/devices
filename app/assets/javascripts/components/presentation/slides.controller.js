modules.push(
    function(){
        var
            /**
             * on post message
             * dispatch and event with the keycode
             */
            onMessage = function(e){
                var data = e.data,
                    evt;

                if(data.keyCode){
                    evt = document.createEvent('Event');
                    evt.initEvent('keydown', true, true);
                    evt.keyCode = data.keyCode;
                    evt.metaKey = data.metaKey;
                    document.dispatchEvent(evt);
                }
            },

            /**
             * send key strokes to opener,
             * restrict P
             */
            sendKeys = function(e){
                e = e.detail;
                window.opener.postMessage({keyCode: e.keyCode, metaKey: e.metaKey}, '*');
            },

            /**
             * toggle controller
             */
            toggleController = function(){
                this.controlled = !this.controlled;

                if(this.controlled){
                    this.popup = window.open(location.href, 'controller', 'menubar=no,location=yes,resizable=yes,scrollbars=no,status=no');
                    return;
                }
                this.popup.close();
            },

            /**
             * toggle notes
             */
            toggleNotes = function(){
                var slide = this.slides[this.index];

                if(!slide.notesEnabled && !!slide.notes){
                    slide.notesEnabled = !slide.notesEnabled;
                    return;
                }

                slide.notesEnabled = false;
            };

        this.controlled = false;
        this.presentor = !!window.opener;

        // bind events
        this.addEventListener('togglenotes', toggleNotes.bind(this), false);
        this.addEventListener('togglecontroller', toggleController.bind(this), false);
        this.addEventListener('sendkeys', sendKeys.bind(this), false);
        window.addEventListener('message', onMessage, false);
    }
);