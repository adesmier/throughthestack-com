import React      from 'react';
import PropTypes  from 'prop-types';


const HeaderTitle = props => {
    const { pageTitle, pageSubtitle, className } = props;

    const titleLength = pageTitle.length;
    let titleSpans = [];

    for(let i = 0; i < titleLength; i++) {
        if(pageTitle.charAt(i) === ' ') {
            titleSpans.push(<span key={i}> </span>);
        } else {
            titleSpans.push(<span key={i}>{pageTitle.charAt(i)}</span>);
        }
    }

    return (
        <React.Fragment>
            <div className={className}>
                {titleSpans}
            </div>
            <div>{pageSubtitle}</div>
        </React.Fragment>
    )
}

HeaderTitle.propTypes = {
    pageTitle:    PropTypes.string.isRequired,
    pageSubtitle: PropTypes.string,
    className:    PropTypes.string,
}


export default HeaderTitle;
