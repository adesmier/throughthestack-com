import React   from 'react';

import Article from '../components/Article/Article';
import Tags    from '../components/Article/Tags';

const AlgoliaActions = require('../../algoliasearch/modules/algoliaActions');


export default class Blog extends React.Component {

    // state = { posts: [] }
    state = { posts: [
        {
            "objectID": "15",
            "title": "A song can make or ruin a persons day if they let it get to them",
            "category": "devbytes",
            "heading": "By default, Jekyll will organise your posts in date order when looping through them. However you may want, for example, your most popular posts to go first and then the rest organised by date order. In this DevByte we'll look at customising the loop order using liquid.",
            "image": "/assets/images/posts/devbytes/devbytes-jekyll.jpg",
            "thumbnail": "/assets/images/posts/devbytes/devbytes-jekyll-thumb.jpg",
            "unix_date": 1478649600,
            "friendly_date": "09 Nov 2016",
            "time": "5 min",
            "_tags": [
                "hosting",
                "css",
                "babel",
                "ubuntu"
            ],
            "url": "/blog/devbytes/a-song-can-make-or-ruin-a-persons-day-if-they-let-it-get-to-them"
        },
        {
            "objectID": "17",
            "title": "My Mum tries to be cool by saying that she likes all the same things",
            "category": "devbytes",
            "heading": "By default, Jekyll will organise your posts in date order when looping through them. However you may want, for example, your most popular posts to go first and then the rest organised by date order. In this DevByte we'll look at customising the loop order using liquid.",
            "image": "/assets/images/posts/devbytes/devbytes-jekyll.jpg",
            "thumbnail": "/assets/images/posts/devbytes/devbytes-jekyll-thumb.jpg",
            "unix_date": 1470610800,
            "friendly_date": "08 Aug 2016",
            "time": "5 min",
            "_tags": [
                "compression",
                "gatsby",
                "css"
            ],
            "url": "/blog/devbytes/my-mum-tries-to-be-cool-by-saying-that-she-likes-all-the-same-things"
        },
        {
            "objectID": "19",
            "title": "The clock within this blog and the clock on my laptop are 1 hour",
            "category": "devbytes",
            "heading": "By default, Jekyll will organise your posts in date order when looping through them. However you may want, for example, your most popular posts to go first and then the rest organised by date order. In this DevByte we'll look at customising the loop order using liquid.",
            "image": "/assets/images/posts/devbytes/devbytes-jekyll.jpg",
            "thumbnail": "/assets/images/posts/devbytes/devbytes-jekyll-thumb.jpg",
            "unix_date": 1466463600,
            "friendly_date": "21 Jun 2016",
            "time": "5 min",
            "_tags": [
                "babel"
            ],
            "url": "/blog/devbytes/the-clock-within-this-blog-and-the-clock-on-my-laptop-are-1-hour"
        }
    ] }


    //--- LIFECYCLE FUNCTIONS ---

    async componentDidMount() {
        const algoliaActions = new AlgoliaActions('sort_by_date_', true);

        try {
            let recentPostResults = await algoliaActions.searchIndex('google');

            console.log(recentPostResults.hits);


            // this.setState({ posts: recentPostResults.hits });
        } catch(e) {
            console.error(e);
        }

    }


    render() {
        const { posts } = this.state;

        console.log('state', posts);

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
            renderedPosts.length === 0 ? (
                <div>Loading posts...</div>
            ) : (
                <section
                    id="blog__blog-post-section-wrapper"
                    className="row section multi-card-flex-container"
                >
                    {renderedPosts}
                </section>
            )
        );

    }
}
