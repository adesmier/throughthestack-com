import React from 'react';

const AlgoliaActions = require('../../../algoliasearch/modules/algoliaActions');

/**
 * Takes a component and enhances it with a componentDidMount func that queries
 * the Algolia api using the passed parameters. Returns the new component with
 * the additional post data prop
 * @param {ReactComponent} WrappedComponent 
 * @param {Object} searchObj 
 */
const GetBlogPostSearchResultsHOC = (WrappedComponent, searchObj) => {
    return class GetBlogPostSearchResultsHOC extends React.Component {

        static displayName = 
            `GetBlogPostSearchResultsHOC(${WrappedComponent.name || 'Component'})`;

        state = { posts: undefined }

        
        //--- LIFECYCLE FUNCTIONS ---

        async componentDidMount() {
            const { searchQuery, resultsPage, searchParams } = this.props;
            //NOTE: algolia indice hardcoded for now
            const algoliaActions = new AlgoliaActions('sort_by_date_', true);

            let search = { query: searchQuery, page: resultsPage };
            if(searchParams) {
                //add any additional query parameters
                search = Object.assign({}, search, searchParams);
            }

            try {
                let searchResults = await algoliaActions.searchIndex(search);
                console.log('recentPostResults', searchResults);
                this.setState({ posts: searchResults.hits });
            } catch(e) {
                console.error(e);
            }
        }


        //--- RENDER ---

        render() {
            const { posts } = this.state;

            if(!posts) return null;

            return <WrappedComponent {...this.props} posts={posts} />
        }

    }
}

export default GetBlogPostSearchResultsHOC;
