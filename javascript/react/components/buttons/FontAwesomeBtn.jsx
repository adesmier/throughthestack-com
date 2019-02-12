import React      from 'react';
import PropTypes  from 'prop-types';


const FontAwesomeBtn = props => {
    const { faIcon, onClick, customClass } = props;

    let classes = [`fa ${faIcon}`];
    if(customClass) classes.push(customClass);

    return <i className={classes.join(' ')} onClick={onClick}></i>
}

FontAwesomeBtn.propTypes = {
    faIcon:      PropTypes.string.isRequired,
    onClick:     PropTypes.func.isRequired,
    customClass: PropTypes.string
}


export default FontAwesomeBtn;
