import React  from 'react';
import PropTypes from 'prop-types';


const Summary = props => {
    const { postData, isOnBlogPage } = props;

    const heading = postData.heading.substring(0, 120) + '...';

    return (
        <summary className="article-summary">
            <a href={postData.url}>
                <h3 className="article-title"><strong><em>{postData.title}</em></strong></h3>
                <div className="article-meta">
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    <span className="article-meta-data" href="#">{postData.date}</span>
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    <span className="article-meta-data" href="#">{postData.time} read</span>
                </div>
                {
                    isOnBlogPage && (
                        <p className="article-heading">{heading}</p>
                    )
                }
            </a>
        </summary>
    );
}

Summary.propTypes = {
    postData:     PropTypes.object.isRequired,
    isOnBlogPage: PropTypes.bool.isRequired
}


export default Summary;
