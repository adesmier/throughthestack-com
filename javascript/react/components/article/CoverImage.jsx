import React              from 'react';
import PropTypes          from 'prop-types';

import CategoryIconOverlay from '../../components/article/CategoryIconOverlay';


const CoverImage = props => {
    const { postData, isOnBlogPage } = props;
    let backgroundStyle;

    if(isOnBlogPage) {
        backgroundStyle = { backgroundImage: `url('${postData.image}')` };
    } else {
        backgroundStyle = { backgroundImage: `url('${postData.thumbnail}')` };
    }

    return (
        <a
            className={isOnBlogPage ? '' : 'article-thumbnail-link'}
            href={postData.url}
        >
            <figure
                className={
                    isOnBlogPage ? 'blog-post-thumbnail' : 'article-thumbnail'
                }
                style={backgroundStyle}
            >
                <CategoryIconOverlay category={postData.category} />
            </figure>
        </a>
    );
}

CoverImage.propTypes = {
    postData:     PropTypes.object.isRequired,
    isOnBlogPage: PropTypes.bool.isRequired
}


export default CoverImage;
