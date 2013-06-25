Polymer.register(this, {
    backdrop: true,
    background: true,
    center: false,
    loaded: false,
    items: false,
    notes: false,
    notesEnabled: false,
    offset: 0,
    overview: false,
    state: '',
    type: false,
    vcenter: false,

    /**
     * polymer init
     */
    ready: function(){
        if(this.items){
            this.buildItems();
        }

        if(this.notes){
            this.buildNotes();
        }
    },

    /**
     * build items
     */
    buildItems: function(){
        var selector = this.items,
            fx = this.getAttribute('items-fx');

        if(!selector){
            return false;
        }

        this.items = this.querySelectorAll(selector);

        this.items.forEach(function(j){
            j.classList.add('ui-slide-item-pending');

            if(fx){
                j.classList.add('ui-slide-item-'+fx);
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
                note: note.innerHTML
            };
        });
    },

    /**
     * next item
     */
    nextItem: function(){
        if(!this.items.length || this.overview){
            return false;
        }

        return Array.prototype.some.call(this.items, function(i){
            i.classList.remove('ui-slide-item-current');

            if(i.classList.contains('ui-slide-item-pending')){
                i.classList.remove('ui-slide-item-pending');
                i.classList.add('ui-slide-item-current');
                return true;
            }
            if(!i.classList.contains('ui-slide-item-done')){
                i.classList.add('ui-slide-item-done');
            }
        });
    }
});