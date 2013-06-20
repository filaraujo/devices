Polymer.register(this, {
    backdrop: true,
    background: true,
    build: true,
    center: false,
    loaded: false,
    items: [],
    offset: 0,
    overview: false,
    state: '',
    type: false,
    vcenter: false,

    /**
     * polymer init
     */
    ready: function(){
        if(this.build){
            this.buildItems();
        }
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
            j.classList.add('ui-slide-item','ui-slide-item-pending');

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
            if(i.classList.contains('ui-slide-item-pending')){
                i.classList.remove('ui-slide-item-pending');
                return true;
            }
            if(!i.classList.contains('ui-slide-item-done')){
                i.classList.add('ui-slide-item-done');
            }
        });
    }
});