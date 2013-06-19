Polymer.register(this, {
    backdrop: true,
    fullscreen: false,
    index: 0,
    presentor: false,
    overview: false,

    /**
     * slide states
     * @type {Object}
     */
    states: {
        '-2': 'far-past',
        '-1': 'past',
        '0': 'current',
        '1': 'next',
        '2': 'far-next'
    },

    /**
     * polymer init
     */
    ready: function(){
        this.slides = this.$.content.getDistributedNodes();
        this.presentor = !!window.opener;

        this.slides.forEach(function(i, index, slides){
            i.index = (index+1) + '/'+ slides.length;
        });

        // event binding
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('popstate', this.onPopState.bind(this), false);
        window.addEventListener('message', this.onMessage.bind(this), false);

        // init states
        this.addBaseTarget();
        this.onPopState();
        this.updateSlides();
    },

    /**
     * add base target to force links to open in new tab
     */
    addBaseTarget: function(){
        var base = document.createElement('base');
        base.target = '_blank';
        document.head.appendChild(base);
    },

    /**
     * set index to next
     */
    nextSlide: function(){
        if(this.index >= this.slides.length -1 || this.slides[this.index].nextItem()){
            return;
        }
        this.index++;
        window.history.pushState({hash: (this.index+1)}, "", "#"+(this.index+1));
        this.updateSlides();
    },

    /**
     * on key down handler
     */
    onKeyDown: function(e){
        if(/^(input|textarea)$/i.test(e.target.nodeName) || e.target.isContentEditable){
            return false;
        }

        // prevent keys in presentor
        if(this.presentor){
            if([80].indexOf(e.keyCode) >= 0){
                return false;
            }
            window.opener.postMessage({keyCode: e.keyCode}, '*');
        }

        switch(e.keyCode){
            case 32: // space
            case 34: // pagedown
            case 39: // right arrow
            case 40: // down arrow
                this.nextSlide();
                e.preventDefault();
                break;

            case 8:  // backspace
            case 33: // pageup
            case 37: // left arrow
            case 38: // up arrow
                this.previousSlide();
                e.preventDefault();
                break;

            case 13: // enter
            case 27: // escape
                if(!this.overview){
                    this.toggleOverview();
                }
                break;

            case 79: // letter O
                this.toggleOverview();
                break;

            case 80: // letter P
                this.toggleController();
                break;

            case 70: // letter F
                this.toggleFullScreen();
                break;
        }
    },

    /**
     * offset slides
     */
    offsetSlides: function(){
        var scope = this;

        this.slides.forEach(function(i, index){
            i.offset = (index - scope.index) * 105;
        });

        this.previousIndex = this.index;
        this.$.viewport.setAttribute('style','-webkit-transform: translate3d(0%,0,-2000px); transform: translate3d(0%,0,-2000px); -webkit-transition: none; transition: none;');

        // set timeout to remove transform
        if(!this.overview){
            this.asyncMethod(function(){
                this.slides.forEach(function(i){
                    i.offset = 0;
                });
                this.$.viewport.removeAttribute('style');
            });
        }
    },

    onMessage: function(e){
        var data = e.data,
            evt;

        if(data.keyCode){
            evt = document.createEvent('Event');
            evt.initEvent('keydown', true, true);
            evt.keyCode = data.keyCode;
            document.dispatchEvent(evt);
        }
    },

    /**
     * on pop state handler
     */
    onPopState: function(e){
        var hash = parseInt(document.location.hash.substr(1),10),
            state = 'replaceState';

        switch(true){
            case !hash:
            case hash <= 0:
                hash = 1;
                break;
            case hash > this.slides.length:
                hash = this.slides.length;
                break;
            default:
                state = 'pushState';
                break;
        }

        window.history[state]({hash: hash}, "", "#"+hash);
        this.index = hash-1;

        // prevent onload popstate triggering update
        if(e){
            this.updateSlides();
        }
    },

    /**
     * set index to previous
     */
    previousSlide: function(){
        if(this.index === 0){
            return;
        }
        this.index--;
        window.history.pushState({hash: (this.index+1)}, "", "#"+(this.index+1));
        this.updateSlides();
    },

    /**
     * toggleFullScreen
     */
    toggleFullScreen: function(){
        this.fullscreen = !this.fullscreen;

        if(this.fullscreen){
            document.body.requestFullScreen = document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen;
            document.body.requestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            return;
        }

        document.cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen;
        document.cancelFullScreen();
    },

    /**
     * toggle controller
     */
    toggleController: function(){
        this.controlled = !this.controlled;

        if(this.controlled){
            this.popup = window.open(location.href, 'controller', 'menubar=no,location=yes,resizable=yes,scrollbars=no,status=no');
            return;
        }
        this.popup.close();
    },

    /**
     * toggle on overview mode
     */
    toggleOverview: function(){
        this.overview = !this.overview;
        this.offsetSlides();
        this.updateSlides();
    },

    /**
     * update slidedeck
     */
    updateSlides: function(){
        var scope = this,
            overviewOffset;

        this.slides.forEach(function(i, index){
            var state = scope.states[index - scope.index];

            i.state = state ? 'ui-slide-'+state : '';
            i.overview = scope.overview;
            i.presentor = scope.presentor;

            if(state === 'current'){
                i.loaded = true;
                scope.backdrop = i.backdrop;
            }
        });

        if(this.overview){
            overviewOffset = (this.index - this.previousIndex) * -105;
            scope.$.viewport.setAttribute('style','-webkit-transform: translate3d('+overviewOffset+'%,0,-2000px); transform: translate3d('+overviewOffset+'%,0,-2000px);');
        }
    }
});