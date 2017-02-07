$(function(){

    $('.article-summary p').text(function(index, currentText){
        return currentText.substr(0, 150) + '...';
    });

    //$('.tutorial-section .article-summary h3').text(function(index, currentText){
    //    return currentText.substr(0, 30) + '...';
    //});

    //$('.tutorial-section .article-summary p').text(function(index, currentText){
    //    return currentText.substr(0, 50) + '...';
    //});

    var stickyOffset = $('.sticky-element').offset().top;

    $(window).scroll(function(){
        var sticky = $('.sticky-element'),
            scroll = $(window).scrollTop();

        if (scroll >= stickyOffset){
            sticky.addClass('sticky-class grid-card full-width-card');
            sticky.find('#post-intro-section-left-content, #post-intro-section-right-content').addClass('post-intro-content-hover');
        } else {
            sticky.removeClass('sticky-class grid-card full-width-card');
            sticky.find('#post-intro-section-left-content, #post-intro-section-right-content').removeClass('post-intro-content-hover');
        }
    });


});
