import React                       from 'react';
import PropTypes                   from 'prop-types';

import HeaderTitle                 from './HeaderTitle';
import GetBlogPostSearchResultsHOC from '../hocs/GetBlogPostSearchResultsHOC';


const EnhancedHeaderTitleForBlogPost = props => {
    const { searchResults } = props;
    const post = searchResults.hits[0];

    return (
        <React.Fragment>
            <HeaderTitle {...props} pageTitle={post.title}/>
            <div>{post.time}</div>
        </React.Fragment>
    )
}

EnhancedHeaderTitleForBlogPost.propTypes = {
    searchQuery:  PropTypes.string.isRequired,
    resultsPage:  PropTypes.number.isRequired,
    className:    PropTypes.string,
}


export default GetBlogPostSearchResultsHOC(
    EnhancedHeaderTitleForBlogPost,
    false
);
