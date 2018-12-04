import React      from 'react';
import PropTypes  from 'prop-types';

import CoverImage from './CoverImage';
import Summary    from './Summary';
import Tags       from './Tags';


const Article = props => {
    const { postData, isOnBlogPage } = props;
    const { _tags } = postData;

    return (
        <div
            className="blog__blog-post-flexgrid-wrapper grid-card hover multi-width-card"
        >
            <article className={isOnBlogPage ? '' : 'latest-post-preview'}>
                <div
                    className={
                        isOnBlogPage ? 'blog-post-inner-wrapper': 'article-inner-wrapper'
                    }
                >
                    <CoverImage {...props} />
                    <Summary {...props} />
                </div>
            </article>
            <Tags tags={_tags} />
        </div>
    );
}

Article.propTypes = {
    postData:     PropTypes.object.isRequired,
    isOnBlogPage: PropTypes.bool.isRequired
}


export default Article;
