Polymer.register(this, {
    open: false,
    fx: 'slide',
    ready: function(){
        var self = this;

        this.fx = ['slide','pan','meny','parallax'].indexOf(this.fx) > -1 ? this.fx : 'slide';

        window.addEventListener('keydown', function(e){
            switch(e.keyCode){
                case 39:
                    self.open = true;
                    break;
                case 37:
                    self.open = false;
                    break;
                default:
                    break;
            }
        });
    }
});