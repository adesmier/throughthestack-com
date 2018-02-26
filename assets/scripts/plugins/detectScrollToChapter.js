;(function(w, d){

    var chapterHdrs = d.querySelectorAll('.post-chapter-links');
    var scrollingActive;

    w.addEventListener('scroll', function(){

        //only run the scroll callback when scrolling finishes so we
        //only run the for loop after a timeout
        //https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
        w.clearTimeout(scrollingActive);

        scrollingActive = setTimeout(function(){
            for(var i = 0; i < chapterHdrs.length; i++){
                var elementTop = getElementDistanceFromTop(chapterHdrs[i]);
    
                if(chapterHdrs[i+1]){
                    var nextElementTop = getElementDistanceFromTop(chapterHdrs[i+1]);
                    //we need to target the chapter selector headings
                    //so lets form the id out of the anchor id
                    var id = chapterHdrs[i].id.replace(/anchor/g, 'chapter');
                    var element = d.getElementById(id);

                    if(w.pageYOffset >= elementTop && w.pageYOffset < nextElementTop){
                        console.log('Just passed ' + id);
                        if(!element.classList.contains('active-chapter')){
                            console.log('Adding class ');
                            console.log(element);
                            element.classList.add('active-chapter');
                        }
                    } else {
                        console.log('Element: ' + element.id);
                        element.classList.remove('active-chapter');
                    }

                } else {
                    if(w.pageYOffset > elementTop){
                        var id = chapterHdrs[i].id.replace(/anchor/g, 'chapter');
                        console.log('Just passed ' + id);
                        if(!element.classList.contains('active-chapter')){
                            element.classList.add('active-chapter');
                        }
                    } else {
                        element.classList.remove('active-chapter');
                    }
                }
            }
        }, 66);

    });

})(window, document);
