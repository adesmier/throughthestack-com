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
        searchQuery:  PropTypes.string.isRequired,
        resultsPage:  PropTypes.number.isRequired,
        searchParams: PropTypes.object,
        postData:     PropTypes.object,
        loading:      PropTypes.bool
    };

    static defaultProps = {
        searchQuery: '',
        resultsPage: 0
    };

    state ={ btnLoading: false };


    //--- LIFECYCLE FUNCTIONS ---

    componentDidMount() {
        console.log('blogpost mount');
    }

    componentDidUpdate(prevProps) {
        console.log('blogpost did update');
        // const { searchQuery, resultsPage, loading, postData } = this.props;
        // const { btnLoading } = this.state;
        // const prevSearchQuery = prevProps.searchQuery;
        // const prevResultsPage = prevProps.resultsPage;
        // const prevPostData = prevProps.postData;

        // console.log('resultsPage', resultsPage);
        // console.log('prevResultsPage', prevResultsPage);
        // console.log('btnLoading', btnLoading);

        // if(resultsPage === prevResultsPage && btnLoading) {
        //     console.log('setting to false');
        //     this.setState({ btnLoading: false });
        // } else if(resultsPage !== prevResultsPage && !btnLoading) {
        //     console.log('setting to true');
        //     this.setState({ btnLoading: true });
        // }

        // if(postData.page === prevPostData.page) {
        //     this.setState({ loading: false });
        // }
        
        // if(searchQuery === prevSearchQuery && postData.page !== prevPostData.page) {
        //     console.log('in here!!!!');
        //     this.setState({ loading: false });
        // }
    }


    //--- FUNCTION DECLARATIONS ---

    renderChildBtn() {
        const { resultsPage, postData, loading, children } = this.props;
        const { btnLoading } = this.state;
        const { nbPages } = postData;
        let disabled = false;

        if((resultsPage+1) === nbPages) disabled = true;

        const newChildBtn = React.Children.map(children, child => {
            return React.cloneElement(child, { disabled, loading });
        });

        return newChildBtn;
    }


    //--- LIFECYCLE FUNCTIONS ---

    render() {
        const { postData, children } = this.props;

        console.log('blog post render');

        // if(!postData) return null;

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
                {this.renderChildBtn()}
            </React.Fragment>
        );
    }

}


export default LoadingSpinnerHOC(GetBlogPostSearchResultsHOC(BlogPostGrid), CSSLoadingSpinner);
