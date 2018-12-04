import { Component, Fragment }     from 'react';
import PropTypes                   from 'prop-types';

import GetBlogPostSearchResultsHOC from '../components/hocs/GetBlogPostSearchResultsHOC';
import LoadingSpinnerHOC           from '../components/hocs/LoadingSpinnerHOC';

import CSSLoadingSpinner           from '../components/primitives/CSSLoadingSpinner';
import SubCategoryBanner           from '../components/SubCategoryBanner';
import Article                     from '../components/article/Article';


class BlogPostGrid extends Component {

    static propTypes = {
        searchQuery:     PropTypes.string.isRequired,
        resultsPage:     PropTypes.number.isRequired,
        loading:         PropTypes.bool.isRequired,
        resultsLoadedCb: PropTypes.func.isRequired,
        searchParams:    PropTypes.object,
        postData:        PropTypes.object,
    };

    static defaultProps = {
        searchQuery: '',
        resultsPage: 0
    };


    //--- LIFECYCLE FUNCTIONS ---

    componentDidUpdate(prevProps) {
        const { resultsPage, loading, postData, resultsLoadedCb } = this.props;
        const prevResultsPage = prevProps.resultsPage;

        //we've arleady retreived new results, so after the render notify our
        //parent that the loading button styles need updating
        if(resultsPage === prevResultsPage && loading) {
            resultsLoadedCb(postData);
        }
    }


    //--- RENDER ---

    render() {
        const { postData } = this.props;

        const posts = postData.hits;
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
                    className="blog__blog-post-section-wrapper row section multi-card-flex-container"
                >
                    <Fragment>
                        {renderedPosts}
                    </Fragment>
                </section>
                {/* {this.renderChildBtn()} */}
            </Fragment>
        );
    }

}


export default LoadingSpinnerHOC(GetBlogPostSearchResultsHOC(BlogPostGrid, true), CSSLoadingSpinner);
