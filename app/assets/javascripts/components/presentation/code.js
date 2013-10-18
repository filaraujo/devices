Polymer('ui-code', {
    heading: '',
    language: undefined,
    created: function(){
        var code;

        this.language = this.getAttribute('language') || undefined;

        if(this.language){
            code = hljs.highlight(this.language, this.textContent);
        }  else {
            code = hljs.highlightAuto(this.textContent);
            this.language = code.language;
        }

        this.$.code.innerHTML = code.value;

        if(this.heading){
            console.warn('ui-code: heading disabled due to polymer bug: polymer#0.0.20131010');
        }
    }

});