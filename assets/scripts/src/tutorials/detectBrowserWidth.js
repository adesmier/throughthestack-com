;(function(w, d){

    var contentsWrapper = d.getElementById('post-section-wrapper-chapters');
    var childGridCard = contentsWrapper.getElementsByClassName('grid-card')[0];
    var resizeActive;

    //hacky version of _.debounce()
    w.addEventListener('resize', function(){

        w.clearTimeout(resizeActive);

        resizeActive = setTimeout(function(){
            var currentWidth = w.outerWidth;

            //seems to give width 10px larger than what chrome dev tools says
            //so lets compensate for now
            currentWidth = currentWidth - 10;

            //match the media query width for post-section-wrapper-chapters element
            if(currentWidth <= 1100 && !childGridCard.classList.contains('invert-colours')){
                childGridCard.classList.add('invert-colours');
            } else if(currentWidth > 1100 && childGridCard.classList.contains('invert-colours')){
                childGridCard.classList.remove('invert-colours');
            }

        }, 100);

    });

})(window, document);
