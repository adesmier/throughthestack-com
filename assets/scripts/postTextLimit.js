;(function(){
 
    document.querySelectorAll('.article-heading').forEach(function(heading){
        var headingText = heading.textContent;
        headingText = headingText.substring(0, 120);
        var finalHeading = headingText + '...';
        
        heading.innerHTML = finalHeading;
    });
    
})();
    