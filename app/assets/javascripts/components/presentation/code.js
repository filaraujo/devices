Polymer.register(this, {
    title: '',
    language: undefined,
    ready: function(){
        var code;

        this.language = this.getAttribute('language') || undefined;

        if(this.language){
            code = hljs.highlight(this.language, this.textContent);
        }  else {
            code = hljs.highlightAuto(this.textContent);
            this.language = code.language;
        }

        this.$.code.innerHTML = code.value;
    }

});