import React             from 'react';

import GetBlogPostSearchResultsHOC from '../components/hocs/GetBlogPostSearchResultsHOC';
import LoadingSpinnerHOC from '../components/hocs/LoadingSpinnerHOC';

import CSSLoadingSpinner from '../components/primitives/CSSLoadingSpinner';
import SubCategoryBanner from '../components/SubCategoryBanner';
import Article           from '../components/article/Article';
import Tags              from '../components/article/Tags';


class Blog extends React.Component {

    render() {
        const { posts } = this.props;

        if(!posts) return null;

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
            </React.Fragment>
        );
    }

}


export default LoadingSpinnerHOC(GetBlogPostSearchResultsHOC(Blog), CSSLoadingSpinner);
