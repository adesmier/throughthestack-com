import Preact from 'preact';

const AlgoliaActions = require('../../algoliasearch/modules/algoliaActions');


export default class Search extends Preact.Component {

    state = { closing: false, results: null }


    //--- LIFECYCLE FUNCTIONS ---

    async componentDidMount() {
        this.searchEl = document.getElementById('index__react-search-component');

        //we need to listen for end of searchClosing animation to fade out the
        //search componenet before unmount
        this.searchEl.addEventListener('animationend', this.handleSearchClosing);



        const algoliaActions = new AlgoliaActions('posts', true);

        try {
            let results = await algoliaActions.searchIndex('esorivnaeoicnrev');
            this.setState({ results });
        } catch(e) {
            console.error(e);
        }

    }

    componentWillUnmount() {
        console.log('unmount called');
        this.searchEl.removeEventListener('animationend', this.handleSearchClosing);
    }


    //--- FUNCTION DEFINITIONS ---

    handleSearchClosing = e => {
        const evtName = e.animationName;
        if(evtName === 'searchClosing') {
            //unmountComponentAtNode() not available in Preact
            //https://github.com/developit/preact/issues/1151
            Preact.render(null, this.searchEl, window.searchComponentNode);
        }
    }

    close = () => {
        this.setState({ closing: true });
    }


    //--- RENDER ---

    render() {
        const { closing, results } = this.state;

        console.log(results);

        return (
            <div id="search__search-root" className={closing ? 'searchClosing' : null}>
                <div onClick={this.close}>Close</div>
                {/* <p>{results.hits}</p> */}
            </div>
        );
    }
    
}
