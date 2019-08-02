import React               from 'react';
import PropTypes           from 'prop-types';

import CategoryIconOverlay from './CategoryIconOverlay';


const CoverImage = props => {
    const { postData, isOnBlogPage } = props;
    const { image, thumbnail, url, category } = postData;
    let backgroundStyle;

    if(isOnBlogPage) {
        backgroundStyle = { backgroundImage: `url('${image}')` };
    } else {
        backgroundStyle = { backgroundImage: `url('${thumbnail}')` };
    }

    return (
        <a
            className={isOnBlogPage ? '' : 'article-thumbnail-link'}
            href={url}
        >
            <figure
                className={
                    isOnBlogPage ? 'blog-post-thumbnail' : 'article-thumbnail'
                }
                style={backgroundStyle}
            >
                <CategoryIconOverlay category={category} />
            </figure>
        </a>
    );
}

CoverImage.propTypes = {
    postData:     PropTypes.object.isRequired,
    isOnBlogPage: PropTypes.bool.isRequired
}


export default CoverImage;
