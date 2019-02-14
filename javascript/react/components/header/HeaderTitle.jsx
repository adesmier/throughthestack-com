import React      from 'react';
import PropTypes  from 'prop-types';


const HeaderTitle = props => {
    const { titleText, fontType } = props;

    const titleLength = titleText.length;
    let titleSpans = [];

    for(let i = 0; i < titleLength; i++) {
        if(titleText.charAt(i) === ' ') {
            titleSpans.push(<span key={i}> </span>);
        } else {
            titleSpans.push(<span key={i}>{titleText.charAt(i)}</span>);
        }
    }

    const fontClass = fontType === 'MarvinVisions' ? (
        'site-header__title-main'
    ) : ('site-header__title-post');

    return (
        <div className={fontClass}>
            {titleSpans}
        </div>
    )
}

HeaderTitle.propTypes = {
    titleText: PropTypes.string.isRequired,
    fontType:  PropTypes.oneOf(['MarvinVisions', 'Patua'])
}

HeaderTitle.defaultProps = {
    fontType: 'MarvinVisions'
}


export default HeaderTitle;
