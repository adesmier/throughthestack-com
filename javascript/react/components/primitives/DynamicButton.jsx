import React from 'react';
import PropTypes from 'prop-types';


const DynamicButton = props => {
    const { disabled } = props;

    let styles = `dynamic-btn-wrapper ${disabled ? 'disabled' : null}`;

    return (
        <div className={styles}>
            <button className={`fa ${props.hoverIcon}`} onClick={props.onClick}>
                <span>{props.text}</span>
            </button>
        </div>
    );
}

DynamicButton.propTypes = {
    text:      PropTypes.string.isRequired,
    hoverIcon: PropTypes.string.isRequired,
    disabled:  PropTypes.bool.isRequired,
    loading:   PropTypes.bool.isRequired,
    onClick:   PropTypes.func.isRequired
}

DynamicButton.defaultProps = {
    disabled: false,
    loading:  false
}


export default DynamicButton;
