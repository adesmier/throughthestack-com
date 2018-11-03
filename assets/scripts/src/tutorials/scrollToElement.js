;(function(w, d){

    /**
     * Returns the elements distance from the top of the DOM
     * @param {DOM Element} element the element to get distance for
     */
    w.getElementDistanceFromTop = function(element){
        var yPos = 0;
    
        while(element){
            yPos += (element.offsetTop);
            element = element.offsetParent;
        }
    
        return yPos;
    };

    /**
     * Removes a class from a list of elements if it exists
     * @param {NodeList} elementList list of dom elements to target
     * @param {string} className the class to remove
     */
    w.removeClassFromMultiple = function(elementList, className){
        elementList.forEach(function(element){
            if(element.classList.contains(className)){
                element.classList.remove(className);
            }
        });
    }

    /**
     * Scrolls to the target element on click and applies the passed class name
     * @param {DOM Element} clickedElement the clicked element
     * @param {string} targetElementId target elements id
     * @param {string} classToggle what classs to add/remove
     */
    w.scrollToElement = function(clickedElement, targetElementId, classToggle){

        if(!clickedElement.classList.contains(classToggle)){
            var element = d.getElementById(targetElementId);
            var chapterHdrs = d.querySelectorAll('.'+clickedElement.className);

            //we need to remove the toggle class from all other elements first
            w.removeClassFromMultiple(chapterHdrs, classToggle);

            //now lets toggle the class and scroll to the target element
            clickedElement.classList.toggle(classToggle);
            w.scroll({
                top: getElementDistanceFromTop(element),
                left: 0,
                behavior: 'smooth'
            });

        } else {
            //don't bother doing anything if the clicked element already
            //has the toggle class
            return;
        }

    }

})(window, document);
