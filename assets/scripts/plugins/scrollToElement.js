;(function(w, d){

    w.getElementDistanceFromTop = function(element){
        var yPos = 0;
    
        while(element){
            yPos += (element.offsetTop);
            element = element.offsetParent;
        }
    
        return yPos;
    };

    w.scrollToElement = function(clickedElement, targetElementId, classToggle){
        var element = d.getElementById(targetElementId);
        var chapterHdrs = d.querySelectorAll('.'+clickedElement.className);

        //we need to remove the active-chapter class from all other elements first
        chapterHdrs.forEach(function(element){
            element.classList.remove('active-chapter');
        });

        //if we pass a class then add it to the clicked element
        if(classToggle){
            if(!clickedElement.classList.contains(classToggle)){
                clickedElement.classList.toggle(classToggle);
                w.scroll({
                    top: getElementDistanceFromTop(element),
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

})(window, document);
