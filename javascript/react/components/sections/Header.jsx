import { PureComponent, Fragment } from 'react';

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
                    </div>
                    <div
                        className="site-header__title"
                        style={{
                            transform: `translateY(${titleTranslatePx}px)`
                        }}
                    >
                        <div>OpenAsset</div>
                        <div>Image</div>
                        <div>Management</div>
                    </div>
                </div>
                <div className="site-header__skew-background"></div>
            </Fragment>
        )
    }

}