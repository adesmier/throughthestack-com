import React      from "react";
import ReactDOM   from 'react-dom';
import Blog       from './pages/blog/Blog';

//expose react api globally in order to call react comps from legacy js
window.React    = React;
window.ReactDOM = ReactDOM;

//setup react comps globally in order to be called later from legacy js
window.searchComponent = require('./pages/search/Search').default;



//TODO: check if we're on the home/blog page
ReactDOM.render(
    <Blog />,
    document.getElementById('blog__react-root')
);
