;(function(w, d){

    /**
     * Launches the fullscreen search overlay react component - called from legacy
     * header.html file
     */
    w.renderSearchComponent = function(){
        ReactDOM.render(
            React.createElement(window.searchComponent, {}),
            d.getElementById('index__react-search-component')
        );
    }

})(window, document);
