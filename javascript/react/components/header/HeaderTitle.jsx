import React      from 'react';
import PropTypes  from 'prop-types';

const ROOT_PAGE_TITLE = 'Through the Stack';


const HeaderTitle = props => {
    const { pageTitle, pageSubtitle } = props;

    const titleLength = pageTitle.length;
    let titleSpans = [];

    for(let i = 0; i < titleLength; i++) {
        if(pageTitle.charAt(i) === ' ') {
            titleSpans.push(<span key={i}> </span>);
        } else {
            titleSpans.push(<span key={i}>{pageTitle.charAt(i)}</span>);
        }
    }

    //MarvinVisions font only used on root pages
    const fontClass = pageTitle === ROOT_PAGE_TITLE ? (
        'site-header__title-main'
    ) : ('site-header__title-post');

    return (
        <div className={fontClass}>
            {titleSpans}
        </div>
    )
}

HeaderTitle.propTypes = {
    pageTitle:    PropTypes.string.isRequired,
    pageSubtitle: PropTypes.string,
}


export default HeaderTitle;
