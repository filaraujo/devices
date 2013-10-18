/**
 * register polymer element
 */
Polymer('ui-slide', {
    backdrop: true,
    background: true,
    center: false,
    loaded: false,
    items: [],
    notes: [],
    notesEnabled: false,
    offset: 0,
    overview: false,
    state: '',
    vcenter: false,

    /**
     * polymer init
     */
    created: function(){
        if(this.items.length){
            this.buildItems();
        }

        if(this.notes.length){
            this.buildNotes();
        }
    },

    /**
     * build items
     */
    buildItems: function(){
        var selectors = this.items.split(','),
            scope = this,
            fx = this.getAttribute('items-fx');

        if(!selectors.length){
            return false;
        }

        //build in order of selectors
        this.items = [];

        selectors.forEach(function(selector){
            scope.items.push.apply(scope.items, scope.querySelectorAll(selector));
        });

        this.items.forEach(function(j, index){
            j.classList.add('ui-slide-item-pending');

            if(fx){
                j.classList.add('ui-slide-item-'+fx);
            }

            if(index === 0){
                j.classList.add('ui-slide-item-next');
            }
        });
    },

    buildNotes: function(){
        var selector = this.notes,
            notes;

        if(!selector){
            return false;
        }

        notes = this.querySelectorAll(selector);

        this.notes = Array.prototype.map.call(notes, function(note){
            note.classList.add('ui-slide-note');
            return {
                note: note.textContent
            };
        });
    },

    loadSlide: function(){
        var els = this.querySelectorAll('[data-src]');

        Array.prototype.forEach.call(els, function(el){
            el.src = el.getAttribute('data-src');
            el.removeAttribute('data-src');
        });

        this.loaded = true;
    },

    /**
     * next item
     */
    nextItem: function(){
        if(!this.items.length || this.overview){
            return false;
        }

        return Array.prototype.some.call(this.items, function(i, index, items){
            i.classList.remove('ui-slide-item-current');
            i.classList.remove('ui-slide-item-next');

            if(items.length > index + 1){
                items[index+1].classList.add('ui-slide-item-next');
            }

            if(i.classList.contains('ui-slide-item-pending')){
                i.classList.remove('ui-slide-item-pending');
                i.classList.add('ui-slide-item-current');
                return true;
            }
            if(!i.classList.contains('ui-slide-item-done')){
                i.classList.add('ui-slide-item-done');
            }
        });
    },

    /**
     * state change handler
     */
    stateChanged: function(){
        if(/ui-slide-next|ui-slide-current|ui-slide-past/.test(this.state) && !this.loaded){
            this.loadSlide();
        }
    }
});