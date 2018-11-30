import React from 'react';

const AlgoliaActions = require('../../../algoliasearch/modules/algoliaActions');
//NOTE: algolia indice hardcoded for now
const algoliaActions = new AlgoliaActions('sort_by_date_', true);


/**
 * Takes a component and enhances it with a componentDidMount func that queries
 * the Algolia api using the passed parameters. Returns the new component with
 * the additional post data prop
 * @param {ReactComponent} WrappedComponent 
 */
const GetBlogPostSearchResultsHOC = (WrappedComponent) => {
    return class GetBlogPostSearchResultsHOC extends React.Component {

        static displayName = 
            `GetBlogPostSearchResultsHOC(${WrappedComponent.name || 'Component'})`;

        state = { searchResults: undefined }

        
        //--- LIFECYCLE FUNCTIONS ---

        async componentDidMount() {
            console.log('hoc did mount');
            const searchResults = await this._getSearchResults(this.props);
            this.setState({ searchResults });
        }

        async componentDidUpdate(prevProps) {
            const { searchQuery, resultsPage } = this.props;
            const prevSearchQuery = prevProps.searchQuery;
            const prevResultsPage = prevProps.resultsPage;

            console.log('hoc did update');

            //search query has changed so get new results from algolia
            if(searchQuery !== prevSearchQuery || resultsPage !== prevResultsPage) {
                const searchResults = await this._getSearchResults(this.props);
                this.setState({ searchResults });
            }
        }


        //--- FUNCTION DECLARATIONS ---

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
            }
        }


        //--- RENDER ---

        render() {
            const { searchResults } = this.state;

            console.log('hoc render');

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
