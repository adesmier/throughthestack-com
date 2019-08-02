import React from 'react';

const AlgoliaSearchUtils = require('../../../modules/AlgoliaSearchUtils');
//NOTE: algolia indice hardcoded for now
const algoliaSearch = new AlgoliaSearchUtils('new_sort_by_date', true);


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
                const newSearchResults = await this._getSearchResults(this.props);
                this.setState({
                    searchResults: concatResults
                                    ? this._combineSearchResults(newSearchResults)
                                    : searchResults
                });
            }
        }


        //--- FUNCTION DECLARATIONS ---

        /**
         * Makes an api request to algolia to the defined index using the passed
         * search parameters
         * @param {object} passedProps the props of the wrapped component 
         */
        async _getSearchResults(passedProps) {
            const { searchQuery, resultsPage, searchParams } = passedProps;

            let search = { query: searchQuery, page: resultsPage };
            if(searchParams) {
                //add any additional query parameters
                search = Object.assign({}, search, searchParams);
            }

            console.log('params', search);

            try {
                const searchResults = await algoliaSearch.searchIndex(search);
                console.log('recentPostResults', searchResults);
                return searchResults;
            } catch(e) {
                console.error(e);
                throw e; //TODO: throw for now
            }
        }

        /**
         * Combines the existing search results with the new one, concatinating
         * the hits array
         * @param {object} newSearchResults new search results from Algolia
         */
        _combineSearchResults(newSearchResults) {
            const { searchResults } = this.state;
            const { hits } = searchResults;
            const newHits = newSearchResults.hits;

            //no new posts so return existsing search results
            if(newHits.length === 0) return searchResults;

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
                    searchResults={searchResults}
                />
            );
        }

    }
}


export default GetBlogPostSearchResultsHOC;
