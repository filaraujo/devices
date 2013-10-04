Polymer('ui-layout', {
    state: 'closed',
    val: 'slide',
    enteredView: function(){
        var scope = this;

        this.type = ['slide','pan','meny','parallax','over'].indexOf(this.type) > -1 ? this.type : 'slide';

        this.addEventListener('open', this.open);
        this.addEventListener('close', this.close);

        window.addEventListener('keydown', function(e){
            switch(e.keyCode){
                case 39:
                    scope.fire('open', {});
                    break;
                case 37:
                    scope.fire('close', {});
                    break;
                default:
                    break;
            }
        });
    },
    close: function(){
        this.state = 'close';
    },
    open: function(){
        this.state = 'open';
    }
});

