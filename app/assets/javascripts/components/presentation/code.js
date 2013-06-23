Polymer.register(this, {
    type: undefined,
    ready: function(){
        var code = this.$.content.getDistributedNodes();
        code.forEach(function(c){
            hljs.highlightBlock(c.parentNode);
        });
    }

});