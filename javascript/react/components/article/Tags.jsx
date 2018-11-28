import React  from 'react';
import PropTypes from 'prop-types';


const Tags = props => {
    const { tags } = props;

    const renderedTags = tags.map((tag, index) => (
        <a
            key={index}
            className="tag-name"
            href={`/blog/?search=${tag}`}
        >
            {tag}
        </a>
    ));

    return (
        <div className="article-tags">
            <i className="fa fa-tags" aria-hidden="true"></i>
            {renderedTags}
        </div>
    );
}

Tags.propTypes = {
    tags: PropTypes.array.isRequired
}


export default Tags;
