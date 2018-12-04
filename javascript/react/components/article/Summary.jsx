import React     from 'react';
import PropTypes from 'prop-types';


const Summary = props => {
    const { postData, isOnBlogPage } = props;
    const { heading, url, title, date, time } = postData;

    const headingSubStr = heading.substring(0, 120) + '...';

    return (
        <summary className="article-summary">
            <a href={url}>
                <h3 className="article-title"><strong><em>{title}</em></strong></h3>
                <div className="article-meta">
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    <span className="article-meta-data" href="#">{date}</span>
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    <span className="article-meta-data" href="#">{time} read</span>
                </div>
                {
                    isOnBlogPage && (
                        <p className="article-heading">{headingSubStr}</p>
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
