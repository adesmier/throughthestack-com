;(function(w, d){

    w.menuPreviewModifier = function(menuItemId){

        var previewPaneId = 'index__header-nav-preview-pane';
        var previewText = '<p>Select an icon to see menu</p>';
        var pane = d.getElementById(previewPaneId);

        if(menuItemId === 0 && pane.innerHTML === previewText) return;

        switch(menuItemId) {
            case 1:
                previewText = '<h4>Home</h4><p>View the home page</p>';
                break;
            case 2:
                previewText = '<h4>About</h4><p>View the home page</p>';
                break;
            case 3:
                previewText = '<h4>Blog</h4><p>View the home page</p>';
                break;
            case 4:
                previewText = '<h4>Demos</h4><p>View the home page</p>';
                break;
            case 5:
                previewText = '<h4>Portfolio</h4><p>View the home page</p>';
                break;
        }

        pane.classList.add('fadeText');
        pane.innerHTML = previewText;

        setTimeout(function(){
            pane.classList.toggle('fadeText');
        }, 200);
    }

})(window, document);
