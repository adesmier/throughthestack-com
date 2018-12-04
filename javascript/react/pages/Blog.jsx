import { Component, Fragment } from 'react';

import BlogPostGrid            from '../components/BlogPostGrid';
import DynamicButton           from '../components/primitives/DynamicButton';


export default class Blog extends Component {

    state = { resultsPage: 0, loading: false, noMorePostsToLoad: false };


    //--- FUNCTION DECLARATIONS ---

    loadMoreClickHandler = () => {
        const { resultsPage } = this.state;
        this.setState({ resultsPage: resultsPage + 1, loading: true });
    }

    resultsLoadedHandler = postData => {
        const { resultsPage } = this.state;
        const { nbPages } = postData;
        let noMorePostsToLoad = false;

        if((resultsPage + 1) === nbPages) noMorePostsToLoad = true;

        this.setState({ loading: false, noMorePostsToLoad });
    }


    //--- RENDER ---

    render() {
        const { resultsPage, loading, noMorePostsToLoad } = this.state;

        return (
            <Fragment>
                <BlogPostGrid
                    searchQuery={''}
                    resultsPage={resultsPage}
                    loading={loading}
                    resultsLoadedCb={this.resultsLoadedHandler}
                />
                {
                    noMorePostsToLoad ? null : (
                        <DynamicButton
                            text={'Load More'}
                            hoverIcon={'fa-arrow-down'}
                            loading={loading}
                            onClick={this.loadMoreClickHandler}
                        />
                    )
                }
            </Fragment>
        );
    }
}
