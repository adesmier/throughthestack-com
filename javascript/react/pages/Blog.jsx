import React             from 'react';

import GetBlogPostSearchResultsHOC from '../components/HOCs/GetBlogPostSearchResultsHOC';
import SubCategoryBanner from '../components/SubCategoryBanner';
import Article           from '../components/Article/Article';
import Tags              from '../components/Article/Tags';

const AlgoliaActions = require('../../algoliasearch/modules/algoliaActions');


class Blog extends React.Component {

    render() {
        const { posts } = this.props;

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
                {
                    renderedPosts.length === 0 ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <React.Fragment>
                            {renderedPosts}
                        </React.Fragment>
                    )
                }
                </section>
            </React.Fragment>
        );
    }

}

export default GetBlogPostSearchResultsHOC(Blog);

// export default class Blog extends React.Component {

//     state = { posts: [] }


//     //--- LIFECYCLE FUNCTIONS ---

//     async componentDidMount() {
//         const algoliaActions = new AlgoliaActions('sort_by_date_', true);

//         try {
//             let recentPostResults = await algoliaActions.searchIndex('');
//             this.setState({ posts: recentPostResults.hits });
//         } catch(e) {
//             console.error(e);
//         }

//     }


//     //--- RENDER ---

//     render() {
//         const { posts } = this.state;

//         const renderedPosts = posts.map(post => {
//             return (
//                 <div
//                     key={post.objectID}
//                     className="blog__blog-post-flexgrid-wrapper grid-card hover multi-width-card"
//                 >
//                     <Article
//                         postData={post}
//                         isOnBlogPage={true}
//                     />
//                     <Tags tags={post._tags} />
//                 </div>
//             );
//         });

//         return (
//             <React.Fragment>
//                 {/* <section
//                     className="blog__blog-post-section-wrapper row section multi-card-flex-container"
//                 >
//                     <SubCategoryBanner />
//                     <SubCategoryBanner />
//                     <SubCategoryBanner />
//                 </section> */}
//                 <section
//                     className="blog__blog-post-section-wrapper row section multi-card-flex-container"
//                 >
//                 {
//                     renderedPosts.length === 0 ? (
//                         <div className="loading-spinner"></div>
//                     ) : (
//                         <React.Fragment>
//                             {renderedPosts}
//                         </React.Fragment>
//                     )
//                 }
//                 </section>
//             </React.Fragment>
//         );
//     }

// }
