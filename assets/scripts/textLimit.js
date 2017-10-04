;(function($){

    $('.article-summary p').text(function(index, currentText){
        return currentText.substr(0, 150) + '...';
    });

    //$('.tutorial-section .article-summary h3').text(function(index, currentText){
    //    return currentText.substr(0, 30) + '...';
    //});

    //$('.tutorial-section .article-summary p').text(function(index, currentText){
    //    return currentText.substr(0, 50) + '...';
    //});

    // var $sticky = $('.sticky-element');
    // var $leftContent = $sticky.find('#post-intro-section-left-content');
    // var $rightContent = $sticky.find('#post-intro-section-right-content');
    // var stickyOffset = $sticky.offset().top;

    // $(window).scroll(function(){
    //     var scroll = $(window).scrollTop();

    //     if (scroll >= stickyOffset){
    //         $sticky.addClass('sticky-class grid-card full-width-card');

    //         if(!$leftContent.hasClass('post-intro-section-dummy')){
    //             $leftContent.addClass('post-intro-content-hover');
    //         }
    //         if(!$rightContent.hasClass('post-intro-section-dummy')){
    //             $rightContent.addClass('post-intro-content-hover');
    //         }

    //     } else {
    //         $sticky.removeClass('sticky-class grid-card full-width-card');
    //         $leftContent.removeClass('post-intro-content-hover');
    //         $rightContent.removeClass('post-intro-content-hover');
    //     }
    // });


})(jQuery);
