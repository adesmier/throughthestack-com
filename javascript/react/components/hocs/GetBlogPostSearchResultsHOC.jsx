import React from 'react';

const AlgoliaActions = require('../../../algoliasearch/modules/algoliaActions');
//NOTE: algolia indice hardcoded for now
const algoliaActions = new AlgoliaActions('sort_by_date_', true);


/**
 * Takes a component and enhances it with a componentDidMount func that queries
 * the Algolia api using the passed parameters. Returns the new component with
 * the additional post data prop
 * @param {ReactComponent} WrappedComponent
 * @param {boolean} concatResults always return previous results merged with new
 */
const GetBlogPostSearchResultsHOC = (WrappedComponent, concatResults = false) => {
    return class GetBlogPostSearchResultsHOC extends React.Component {

        static displayName = 
            `GetBlogPostSearchResultsHOC(${WrappedComponent.name || 'Component'})`;

        state = { searchResults: undefined }

        
        //--- LIFECYCLE FUNCTIONS ---

        async componentDidMount() {
            const searchResults = await this._getSearchResults(this.props);
            this.setState({ searchResults });
        }

        async componentDidUpdate(prevProps) {
            const { searchQuery, resultsPage } = this.props;
            const prevSearchQuery = prevProps.searchQuery;
            const prevResultsPage = prevProps.resultsPage;

            //search query has changed so get new results from algolia
            if(searchQuery !== prevSearchQuery || resultsPage !== prevResultsPage) {
                const searchResults = await this._getSearchResults(this.props);
                this.setState({
                    searchResults: concatResults
                                    ? this._combineSearchResults(searchResults)
                                    : searchResults
                });
            }
        }


        //--- FUNCTION DECLARATIONS ---

        /**
         * Makes an api request to algolia to the defined index using the passed
         * search parameters
         * @param {object} passedProps 
         */
        async _getSearchResults(passedProps) {
            const { searchQuery, resultsPage, searchParams } = passedProps;

            let search = { query: searchQuery, page: resultsPage };
            if(searchParams) {
                //add any additional query parameters
                search = Object.assign({}, search, searchParams);
            }

            try {
                const searchResults = await algoliaActions.searchIndex(search);
                console.log('recentPostResults', searchResults);
                return searchResults;
            } catch(e) {
                console.error(e);
                throw e; //TODO: throw for now
            }
        }

        _combineSearchResults(newSearchResults) {
            const { searchResults } = this.state
            const { hits } = searchResults;
            const newHits = newSearchResults.hits;
            const combinedHits = hits.concat(newHits);

            let newSearchResultsObj = Object.assign({}, newSearchResults);
            newSearchResultsObj.hits = combinedHits;

            return newSearchResultsObj;
        }


        //--- RENDER ---

        render() {
            const { searchResults } = this.state;

            if(!searchResults) return null;

            return (
                <WrappedComponent {...this.props}
                    postData={searchResults}
                />
            );
        }

    }
}


export default GetBlogPostSearchResultsHOC;
