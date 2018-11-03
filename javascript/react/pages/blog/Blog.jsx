import React   from 'react';

import Article from '../../components/Article/Article';
import Tags    from '../../components/Article/Tags';


export default class Blog extends React.Component {

    state = {
        posts: [
            {
                "objectID": 1,
                "title": "Create a CMS for Jekyll using Contentful and Codeship",
                "category": "tutorials",
                "heading": "Jekyll is a powerful tool that will allow you to build a static site. But when it comes to end users adding and managing content it can become tricky due to the lack of a CMS. Contentful serves as an API driven CMS solution and when integrated with Codeship and Bitbucket you can create yourself a full website deployment pipeline.",
                "image": "/assets/images/posts/tutorials/cms-jekyll-contentful/header.jpg",
                "thumbnail": "/assets/images/posts/tutorials/cms-jekyll-contentful/thumbnail.jpg",
                "date": "07 Oct 2016",
                "time": "30 min",
                "_tags": [
                    "jekyll",
                    "contentful",
                    "codeship",
                    "aerobatic"
                ],
                "url": "/blog/tutorials/create-cms-jekyll-using-contentful-codeship"
            },
            {
                "objectID": 2,
                "title": "Customise the Order of a Jekyll Post Loop",
                "category": "devbytes",
                "heading": "By default, Jekyll will organise your posts in date order when looping through them. However you may want, for example, your most popular posts to go first and then the rest organised by date order. In this DevByte we'll look at customising the loop order using liquid.",
                "image": "/assets/images/posts/devbytes/devbytes-jekyll.jpg",
                "thumbnail": "/assets/images/posts/devbytes/devbytes-jekyll-thumb.jpg",
                "date": "02 Jan 2016",
                "time": "5 min",
                "_tags": [
                    "jekyll",
                    "blog",
                    "liquid"
                ],
                "url": "/blog/devbytes/customise-order-jekyll-post-loop"
            },
            {
                "objectID": 3,
                "title": "My Windows Subsystem for Linux Development Setup",
                "category": "devbytes",
                "heading": "With the Windows Subsystem for Linux now becoming a full feature in Windows 10, you'll really be able to harness the power of having a full version of Linux running behind the scenes to provide compilation and tooling support for your development projects.",
                "image": "/assets/images/posts/devbytes/devbytes-wsl.jpg",
                "thumbnail": "/assets/images/posts/devbytes/devbytes-wsl-thumb.jpg",
                "date": "12 Jan 2018",
                "time": "5 min",
                "_tags": [
                    "windows",
                    "wsl",
                    "build",
                    "tooling"
                ],
                "url": "/blog/devbytes/windows-subsystem-dev-setup"
            }
        ]
    }


    render() {
        const { posts } = this.state;

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
            <section
                id="blog__blog-post-section-wrapper"
                className="row section multi-card-flex-container"
            >
                {renderedPosts}
            </section>
        );
    }
}
