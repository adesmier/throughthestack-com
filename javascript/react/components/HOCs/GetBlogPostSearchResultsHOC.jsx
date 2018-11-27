import React from 'react';

const AlgoliaActions = require('../../../algoliasearch/modules/algoliaActions');


const GetBlogPostSearchResultsHOC = WrappedComponent => {
    class GetBlogPostSearchResultsHOC extends React.Component {

        state = { posts: undefined }

        //--- LIFECYCLE FUNCTIONS ---

        async componentDidMount() {
            //NOTE: algolia indice hardcoded for now
            const algoliaActions = new AlgoliaActions('sort_by_date_', true);

            try {
                let recentPostResults = await algoliaActions.searchIndex('');
                this.setState({ posts: recentPostResults.hits });
            } catch(e) {
                console.error(e);
            }

        }


        //--- RENDER ---

        render() {
            const { posts } = this.state;

            if(!posts) {
                return <div className="loading-spinner"></div>
            } else {
                return <WrappedComponent {...this.props} posts={posts} />
            }
        }
    }

    GetBlogPostSearchResultsHOC.displayName =
        `GetBlogPostSearchResultsHOC(${WrappedComponent.name || 'Component'})`;

    return GetBlogPostSearchResultsHOC;
}

export default GetBlogPostSearchResultsHOC;
