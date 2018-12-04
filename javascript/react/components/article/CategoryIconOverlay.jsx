import React     from 'react';
import PropTypes from 'prop-types';


const CategoryIconOverlay = props => {
    const { category } = props;
    let niceCategoryTitle; let iconType;

    switch(category) {
        case 'frontend':
            niceCategoryTitle = 'Frontend';
            iconType = 'fa fa-desktop';
            break;
        case 'backend':
            niceCategoryTitle = 'Backend';
            iconType = 'fa fa-server';
            break;
        case 'buildtestconfig':
            niceCategoryTitle = 'Build, Test & Config';
            iconType = 'fa fa-cogs';
            break;
        case 'clouddatabase':
            niceCategoryTitle = 'Cloud & Database';
            iconType = 'fa fa-database';
            break;
        case 'networkhardware':
            niceCategoryTitle = 'Network & Hardware';
            iconType = 'fa fa-hdd-o';
            break;
    }

    return (
        <div className={'article-category-display'}>
            <i className={iconType}></i>
            <span>{niceCategoryTitle}</span>
        </div>
    );
}

CategoryIconOverlay.propTypes = {
    category: PropTypes.string.isRequired
}


export default CategoryIconOverlay;
