import React                       from 'react';
import PropTypes                   from 'prop-types';

import GetBlogPostSearchResultsHOC from '../components/hocs/GetBlogPostSearchResultsHOC';
import LoadingSpinnerHOC           from '../components/hocs/LoadingSpinnerHOC';

import CSSLoadingSpinner           from '../components/primitives/CSSLoadingSpinner';
import SubCategoryBanner           from '../components/SubCategoryBanner';
import Article                     from '../components/article/Article';
import Tags                        from '../components/article/Tags';


class BlogPostGrid extends React.Component {

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

        if(resultsPage === prevResultsPage && loading) {
            resultsLoadedCb(postData);
        }
    }


    //--- LIFECYCLE FUNCTIONS ---

    render() {
        const { postData } = this.props;

        const posts = postData.hits;
        const renderedPosts = posts.map(post => {
            return (
                <div
                    key={post.objectID}
                    className="blog__blog-post-flexgrid-wrapper grid-card hover multi-width-card"
                >
                    <Article
                        postData={post}
                        isOnBlogPage={true}
                    />
                    <Tags tags={post._tags} />
                </div>
            );
        });

        return (
            <React.Fragment>
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
                    <React.Fragment>
                        {renderedPosts}
                    </React.Fragment>
                </section>
                {/* {this.renderChildBtn()} */}
            </React.Fragment>
        );
    }

}


export default LoadingSpinnerHOC(GetBlogPostSearchResultsHOC(BlogPostGrid), CSSLoadingSpinner);
