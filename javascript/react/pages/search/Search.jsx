import React   from 'react';
import { unmountComponentAtNode } from 'react-dom';


export default class Search extends React.Component {

    state = {}

    componentWillUnmount() {
        console.log('unmount called')
    }

    close() {
        const searchEl = document.getElementById('index__react-search-component');
        unmountComponentAtNode(searchEl);
    }

    render() {
        return (
            <div id="search__search-root">
                <div onClick={this.close}>Close</div>
            </div>
        );
    }
}
