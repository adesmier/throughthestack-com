import React from 'react';

const AlgoliaActions = require('../../../algoliasearch/modules/algoliaActions');


const GetBlogPostSearchResultsHOC = WrappedComponent => {
    return class GetBlogPostSearchResultsHOC extends React.Component {

        static displayName = 
            `GetBlogPostSearchResultsHOC(${WrappedComponent.name || 'Component'})`;

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

            if(!posts) return null;

            return <WrappedComponent {...this.props} posts={posts} />
        }

    }
}

export default GetBlogPostSearchResultsHOC;
