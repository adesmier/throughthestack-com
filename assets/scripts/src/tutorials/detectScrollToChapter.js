;(function(w, d){

    //get all anchor tags in the post content
    var chapterAnchorHdrs = d.querySelectorAll('.post-chapter-links');
    //get all h6 tags in the chapter secltion
    var chapterSelectionHdrs = d.querySelectorAll('.post-section-chapter-headings');
    var scrollingActive;

    w.addEventListener('scroll', function(){

        w.clearTimeout(scrollingActive);
        //we only want the callback of the scroll event to fire after
        //scrolling has ended, so lets wait 100ms before runing this
        scrollingActive = setTimeout(function(){

            for(var i = 0; i < chapterAnchorHdrs.length; i++){
                var elementTop = getElementDistanceFromTop(chapterAnchorHdrs[i]);

                if(chapterAnchorHdrs[i+1]){
                    var nextElementTop = getElementDistanceFromTop(chapterAnchorHdrs[i+1]);
                    //we need to target the chapter selector headings
                    //so lets form the id out of the anchor id
                    var id = chapterAnchorHdrs[i].id.replace(/anchor/g, 'chapter');
                    var headerElement = d.getElementById(id);

                    //so we need to check if the distance scrolled is >= to the
                    //current elements top offset. It also has to be less than the
                    //next element so that we only target a single anchor element
                    if(w.pageYOffset >= elementTop && w.pageYOffset < nextElementTop){
                        if(!headerElement.classList.contains('active-chapter')){

                            //we need to remove the active-chapter class
                            //from all other header elements first as these might
                            //also have been added via the onclick event
                            w.removeClassFromMultiple(chapterSelectionHdrs, 'active-chapter');
                            headerElement.classList.add('active-chapter');

                        }
                    }
                } else { //last element in list as there is no next element

                    var id = chapterAnchorHdrs[i].id.replace(/anchor/g, 'chapter');
                    //well get the height of the elements parent instead to use
                    //as our check to target the single anchor element
                    var parentHeight = chapterAnchorHdrs[i].parentElement.offsetHeight;
                    var headerElement = d.getElementById(id);

                    if(w.pageYOffset >= elementTop && w.pageYOffset < (w.pageYOffset + parentHeight)){
                        if(!headerElement.classList.contains('active-chapter')){
                            w.removeClassFromMultiple(chapterSelectionHdrs, 'active-chapter');
                            headerElement.classList.add('active-chapter');
                        }
                    }

                }
            }

        }, 100);

    });

})(window, document);
