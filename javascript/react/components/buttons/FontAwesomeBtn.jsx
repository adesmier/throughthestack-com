import React      from 'react';
import PropTypes  from 'prop-types';


const FontAwesomeBtn = props => {
    const { iconStyle, icon, onClick, customClass } = props;

    let faStyle;
    switch(iconStyle) {
        case 'solid':
            faStyle = 'fas';
            break;
        case 'regular':
            faStyle = 'far';
            break;
        case 'light':
            faStyle = 'fal';
            break;
        case 'brand':
            faStyle = 'fab';
            break;
    }

    let classes = [`${faStyle} ${icon}`];
    if(customClass) classes.push(customClass);

    return <i className={classes.join(' ')} onClick={onClick}></i>
}

FontAwesomeBtn.propTypes = {
    iconStyle:   PropTypes.oneOf(['solid', 'regular', 'light', 'brand']),
    icon:        PropTypes.string.isRequired,
    onClick:     PropTypes.func.isRequired,
    customClass: PropTypes.string
}

FontAwesomeBtn.defaultProps = {
    iconStyle: 'solid'
}


export default FontAwesomeBtn;
