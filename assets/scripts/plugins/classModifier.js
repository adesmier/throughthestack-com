;(function(w, d){

    w.toggleClass = function(elementId, classToAdd){
        d.getElementById(elementId).classList.toggle(classToAdd);
    }

})(window, document);
