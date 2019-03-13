import { PureComponent, Fragment }    from 'react';
import PropTypes                      from 'prop-types';

import UrlUtils                       from '../../../modules/UrlUtils';

import FontAwesomeBtn                 from '../buttons/FontAwesomeBtn';
import HeaderTitle                    from './HeaderTitle';
import EnhancedHeaderTitleForBlogPost from './EnhancedHeaderTitleForBlogPost';

const START_RAF_OFFSET  = 200;
const SKEW_LAYER_HEIGHT = 450;
const SKEW_FIXED_HEIGHT = 50;
const TITLE_FIXED_YPOS  = -100;
const MAX_SKEW_DEGREES  = 10;

const SEARCH_ICON_BOTTOM_OFFSET  = 398;
const CALCULATE_ICON_STYLES_INIT = 9;
const BOTTOM_OFFSET_MULTIPLIER   = 4;


export default class Header extends PureComponent {

    static propTypes = {
        pageType: PropTypes.string.isRequired,
    }

    state = {
        requestAF:        undefined,
        headerFixed:      false,
        skewLayerHeight:  SKEW_LAYER_HEIGHT,
        skewLayerDeg:     10,
        titleTranslatePx: 0
    }


    //--- LIFECYCLE FUNCTIONS ---

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);

        const scrollYOffset = window.pageYOffset;

        let skewLayerHeight; let skewLayerDeg; let titleTranslatePx;
        let headerFixed = false;

        if(scrollYOffset <= START_RAF_OFFSET) {
            [skewLayerHeight, skewLayerDeg, titleTranslatePx]
                = this._calculateSkewTranslate(scrollYOffset);
        } else {
            //fix header and remove skew
            headerFixed       = true,
            skewLayerHeight   = SKEW_FIXED_HEIGHT,
            skewLayerDeg      = 0,
            titleTranslatePx  = TITLE_FIXED_YPOS
        }

        this.setState({
            headerFixed,
            skewLayerHeight,
            skewLayerDeg,
            titleTranslatePx
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }


    //--- FUNCTION DECLARATIONS ---

    scrollHandler = () => {
        const { requestAF } = this.state;
        const scrollYOffset = window.pageYOffset;

        let newRequestAF = undefined; let headerFixed = false;
        let skewLayerHeight; let skewLayerDeg; let titleTranslatePx;

        if(requestAF) window.cancelAnimationFrame(requestAF);
    
        if(scrollYOffset <= START_RAF_OFFSET) {

            newRequestAF = window.requestAnimationFrame(() => {
                [skewLayerHeight, skewLayerDeg, titleTranslatePx]
                    = this._calculateSkewTranslate(scrollYOffset);

                this.setState({
                    headerFixed,
                    skewLayerHeight,
                    skewLayerDeg,
                    titleTranslatePx,
                });
            });
            
        } else {
            headerFixed = true; skewLayerHeight = SKEW_FIXED_HEIGHT;
            skewLayerDeg = 0; titleTranslatePx = TITLE_FIXED_YPOS;

            this.setState({
                headerFixed,
                skewLayerHeight,
                skewLayerDeg,
                titleTranslatePx,
            });
        }

        this.setState({ requestAF: newRequestAF });
    }

    renderTitle() {
        const { pageType } = this.props;

        //pageType is currently only set for post pages
        switch(pageType) {
            case 'blogpost':
                const postTitle = UrlUtils.getPostTitleFromUrl();
                return (
                    <EnhancedHeaderTitleForBlogPost
                        searchQuery={postTitle}
                        resultsPage={0}
                        className={'site-header__title-post'}
                    />
                )
            default:
                const pageBreadcrumbs = UrlUtils.getPageBreadcrumbs();
                return (
                    <HeaderTitle {...pageBreadcrumbs}
                        className={'site-header__title-main'}
                    />
                )
        }
    }

    _calculateSkewTranslate = scrollYOffset => {
        const newDegrees = MAX_SKEW_DEGREES - (scrollYOffset / 20);
        const newHeight  = SKEW_LAYER_HEIGHT - (scrollYOffset);
        const newYPos    = (scrollYOffset / 2) * -1;

        return [
            newHeight,
            Number.parseFloat(newDegrees).toFixed(1),
            Number.parseFloat(newYPos).toFixed(1)
        ];
    }

    //skewLayerDeg runs from 10 to 0 so can use this for styles calculation
    _calculateSearchIconStyles() {
        const { skewLayerDeg } = this.state;
        let opacity; let bottom;

        if(skewLayerDeg <= CALCULATE_ICON_STYLES_INIT) {
            const opacityFloat =
                (CALCULATE_ICON_STYLES_INIT - skewLayerDeg) / CALCULATE_ICON_STYLES_INIT;
            opacity = opacityFloat.toFixed(2);
            bottom  = Math.trunc(skewLayerDeg) * BOTTOM_OFFSET_MULTIPLIER;
        } else {
            opacity = 1;
            bottom  = SEARCH_ICON_BOTTOM_OFFSET;
        }

        return [opacity, bottom];
    }


    //--- RENDER ---

    render() {
        const {
            headerFixed, skewLayerHeight, skewLayerDeg, titleTranslatePx
        } = this.state;

        const [opacity, bottom] = this._calculateSearchIconStyles();

        let skewClasses = ['site-header__skew-top-layer'];
        if(headerFixed) skewClasses.push('site-header__skew-fixed');

        return (
            <Fragment>
                <div>
                    <div
                        className={skewClasses.join(' ')}
                        style={{
                            height: skewLayerHeight,
                            transform: `skewY(${skewLayerDeg}deg)`
                        }}
                    >
                        <div
                            className="site-header__search-icon-wrapper"
                            style={{
                                transform: `skewY(-${skewLayerDeg}deg)`,
                                opacity,
                                bottom
                            }}
                        >
                            <FontAwesomeBtn
                                faIcon={'fa-search'}
                                customClass={'site-header__search-icon'}
                                onClick={() => {console.log('click search')}}
                            />
                        </div>
                    </div>
                    <FontAwesomeBtn
                        faIcon={'fa-user-circle-o'}
                        customClass={'site-header__login-icon'}
                        onClick={() => {console.log('click')}}
                    />
                    <div
                        className="site-header__title-wrapper"
                        style={{
                            transform: `translateY(${titleTranslatePx}px)`
                        }}
                    >
                        {this.renderTitle()}
                    </div>
                </div>
                <div className="site-header__skew-background"></div>
            </Fragment>
        )
    }

}