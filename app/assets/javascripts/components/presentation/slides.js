Polymer.register(this, {
    backdrop: true,
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
        var scope = this;

        this.slides = this.$.content.getDistributedNodes();

        this.slides.forEach(function(i, index, slides){
            i.index = (index+1) + '/'+ slides.length;
        });

        modules.forEach(function(module){
            module.bind(scope)();
        });

        // event binding
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('popstate', this.onPopState.bind(this), false);

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
        if(this.slides[this.index].nextItem() || this.index >= this.slides.length -1){
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

        if(this.presentor){
            this.fire('sendkeys', e);
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
                if(this.overview){
                    this.toggleOverview();
                }
                break;

            case 79: // letter O
                this.toggleOverview();
                break;

            case 78: // letter N
                this.fire('togglenotes', {});
                break;

            case 80: // letter P
                this.fire('togglecontroller', {});
                break;

            case 70: // letter F
                this.fire('togglefullscreen', {});
                break;

            case 82:
                if(e.metaKey){
                    window.location.reload();
                }
                break;
        }
    },

    /**
     * offset slides
     */
    offsetSlides: function(){
        var scope = this;

        this.slides.forEach(function(i, index){
            i.$.slide.style.left = ((index - scope.index) * 105 ) + '%';
        });

        this.previousIndex = this.index;
        this.$.viewport.setAttribute('style','-webkit-transform: translate3d(0%,0,-2000px); transform: translate3d(0%,0,-2000px); -webkit-transition: none; transition: none;');

        // set timeout to remove transform
        if(!this.overview){
            this.asyncMethod(function(){
                this.slides.forEach(function(i){
                    i.$.slide.removeAttribute('style');
                });
                this.$.viewport.removeAttribute('style');
            }, 0);
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
                scope.backdrop = i.backdrop;
            }
        });


        if(this.overview){
            overviewOffset = (this.index - this.previousIndex) * -105;
            scope.$.viewport.setAttribute('style','-webkit-transform: translate3d('+overviewOffset+'%,0,-2000px); transform: translate3d('+overviewOffset+'%,0,-2000px);');
        }
    }
});