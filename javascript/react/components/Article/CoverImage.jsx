import Preact from 'preact';
// import PropTypes from 'prop-types';


const CoverImage = props => {
    const { postData, isOnBlogPage } = props;
    let backgroundStyle;

    if(isOnBlogPage) {
        backgroundStyle = { backgroundImage: `url('${postData.image}')` };;
    } else {
        backgroundStyle = { backgroundImage: `url('${postData.thumbnail}')` };;
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
            </figure>
        </a>
    );
}

// CoverImage.propTypes = {
//     postData:     PropTypes.object.isRequired,
//     isOnBlogPage: PropTypes.bool.isRequired
// }


export default CoverImage;
