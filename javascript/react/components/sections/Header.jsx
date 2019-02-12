import { PureComponent, Fragment } from 'react';

import FontAwesomeBtn from '../buttons/FontAwesomeBtn';

const START_RAF_OFFSET  = 200;
const SKEW_LAYER_HEIGHT = 450;
const SKEW_FIXED_HEIGHT = 50;
const TITLE_FIXED_YPOS  = -100;


export default class Header extends PureComponent {

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

    _calculateSkewTranslate = scrollYOffset => {
        const maxDegress = 10;
        const newDegrees = maxDegress - (scrollYOffset / 20);
        const newHeight  = SKEW_LAYER_HEIGHT - (scrollYOffset);
        const newYPos    = (scrollYOffset / 2) * -1;

        return [newHeight, newDegrees, newYPos];
    }

    renderSiteTitle() {
        return (
            <Fragment>
                <span>t</span>
                <span>h</span>
                <span>r</span>
                <span>o</span>
                <span>u</span>
                <span>g</span>
                <span>h</span><br />
                <span>t</span>
                <span>h</span>
                <span>e</span><br />
                <span>s</span>
                <span>t</span>
                <span>a</span>
                <span>c</span>
                <span>k</span>
            </Fragment>
        );
    }


    //--- RENDER ---

    render() {
        const {
            headerFixed, skewLayerHeight, skewLayerDeg, titleTranslatePx
        } = this.state;

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
                            style={{transform: `skewY(-${skewLayerDeg}deg)`}}
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
                        className="site-header__title"
                        style={{
                            transform: `translateY(${titleTranslatePx}px)`
                        }}
                    >
                        {this.renderSiteTitle()}
                    </div>
                </div>
                <div className="site-header__skew-background"></div>
            </Fragment>
        )
    }

}