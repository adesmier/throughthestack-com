import React             from 'react';
import PropTypes         from 'prop-types';

import CSSLoadingSpinner from './CSSLoadingSpinner';


const DynamicButton = props => {
    const { text, hoverIcon, loading, disabled, onClick } = props;

    let btnStyles = [`fa ${hoverIcon}`];
    if(loading) btnStyles.push('loading');
    if(disabled) btnStyles.push('disabled');

    return (
        <div className='dynamic-btn-wrapper'>
            <button
                className={btnStyles.join(' ')}
                onClick={onClick}
                disabled={disabled}
            >
            {
                loading ? (
                    <CSSLoadingSpinner size={'small'} />
                ) : (
                    <span>{text}</span>
                )
            }
            </button>
        </div>
    );
}

DynamicButton.propTypes = {
    text:      PropTypes.string.isRequired,
    hoverIcon: PropTypes.string.isRequired,
    loading:   PropTypes.bool.isRequired,
    disabled:  PropTypes.bool,
    onClick:   PropTypes.func.isRequired
}

DynamicButton.defaultProps = {
    disabled: false
}


export default DynamicButton;
