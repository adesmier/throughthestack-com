import React     from 'react';
import PropTypes from 'prop-types';


const CSSLoadingSpinner = props => {
    const { size } = props
    return <div className={`loading-spinner ${size}`}></div>
};

CSSLoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired
}

CSSLoadingSpinner.defaultProps = {
    size: 'medium'
}


export default CSSLoadingSpinner;
