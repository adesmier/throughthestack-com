import Preact from 'preact';
import Blog       from './pages/Blog';

//expose preact api globally in order to call react comps from legacy js
window.Preact = Preact;

//setup react comps globally in order to be called later from legacy js
window.searchComponent = require('./pages/Search').default;


//load the blog post grid
const blogGridEl = document.getElementById('blog__react-root');
if(blogGridEl) Preact.render(<Blog />, blogGridEl);
