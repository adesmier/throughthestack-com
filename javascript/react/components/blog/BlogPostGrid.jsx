import React, { Component, Fragment } from 'react';
import PropTypes                      from 'prop-types';

import GetBlogPostSearchResultsHOC    from '../hocs/GetBlogPostSearchResultsHOC';
import LoadingSpinnerHOC              from '../hocs/LoadingSpinnerHOC';

import CSSLoadingSpinner              from '../primitives/CSSLoadingSpinner';
import SubCategoryBanner              from './SubCategoryBanner';
import Article                        from '../article/Article';


class BlogPostGrid extends Component {

    static propTypes = {
        searchQuery:     PropTypes.string.isRequired,
        resultsPage:     PropTypes.number.isRequired,
        loading:         PropTypes.bool.isRequired,
        resultsLoadedCb: PropTypes.func.isRequired,
        searchParams:    PropTypes.object,
        searchResults:   PropTypes.object,
    };

    static defaultProps = { searchQuery: '' };

    sectionWrapper = React.createRef();


    //--- LIFECYCLE FUNCTIONS ---

    componentDidMount() {
        const { resultsLoadedCb, searchResults } = this.props;

        const height = this.sectionWrapper.current.scrollHeight;

        resultsLoadedCb(searchResults, height);
    }

    componentDidUpdate(prevProps) {
        const { resultsPage, loading, resultsLoadedCb, searchResults } = this.props;
        const prevResultsPage = prevProps.resultsPage;

        //we've arleady retreived new results, so after the render notify our
        //parent that the loading button styles need updating
        if(resultsPage === prevResultsPage && loading) {
            const height = this.sectionWrapper.current.scrollHeight;
            resultsLoadedCb(searchResults, height);
        }
    }


    //--- RENDER ---

    render() {
        const { searchResults } = this.props;

        const posts = searchResults.hits;
        const renderedPosts = posts.map(post => {
            return <Article key={post.objectID} postData={post} isOnBlogPage={true} />
        });

        return (
            <Fragment>
                {/* <section
                    className="blog__blog-post-section-wrapper row section multi-card-flex-container"
                >
                    <SubCategoryBanner />
                    <SubCategoryBanner />
                    <SubCategoryBanner />
                </section> */}
                <section
                    id="blog__blog-post-section-wrapper"
                    ref={this.sectionWrapper}
                    className="blog__blog-post-section-wrapper row section multi-card-flex-container"
                >
                    <Fragment>
                        {renderedPosts}
                    </Fragment>
                </section>
            </Fragment>
        );
    }

}


export default LoadingSpinnerHOC(
    GetBlogPostSearchResultsHOC(BlogPostGrid, true),
    CSSLoadingSpinner
);
