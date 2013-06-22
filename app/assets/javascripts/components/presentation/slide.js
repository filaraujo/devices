Polymer.register(this, {
    backdrop: true,
    background: true,
    center: false,
    loaded: false,
    items: [],
    notes: false,
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

        this.hasNotes = !!this.$.notes.getDistributedNodes().length;
    },

    /**
     * build items
     */
    buildItems: function(){
        var selector = this.getAttribute('items'),
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