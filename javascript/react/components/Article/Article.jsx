import React      from 'react';
import PropTypes  from 'prop-types';

import CoverImage from '../../components/Article/CoverImage';
import Summary    from '../../components/Article/Summary';


const Article = props => {
    const { isOnBlogPage } = props;

    return (
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
    );
}

Article.propTypes = {
    postData:     PropTypes.object.isRequired,
    isOnBlogPage: PropTypes.bool.isRequired
}


export default Article;
