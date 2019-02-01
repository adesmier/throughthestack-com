import React, { Component, Fragment } from 'react';



export default class Header extends Component {

    header = React.createRef();
    title  = React.createRef();

    request = undefined;

    //--- LIFECYCLE FUNCTIONS ---

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }


    //--- FUNCTION DECLARATIONS ---

    scrollHandler = () => {
        var scrollYOffset = window.pageYOffset;
    
        if(scrollYOffset <= 200) {
            if(this.header.current.classList.contains('fixed')) {
                this.header.current.classList.remove('fixed');
            }
    
            if(this.request) window.cancelAnimationFrame(this.request);
    
            this.request = window.requestAnimationFrame(this.reqCb);
        } else {
            this.header.current.style.transform = 'skewY(0deg)';
            if(!this.header.current.classList.contains('fixed')) {
                this.header.current.classList.add('fixed');
            }
            
        }
    }

    reqCb = () => {
        var maxDegress = 10;
        var newDegrees = maxDegress - (scrollYOffset / 20);
        var newHeight = 450 - (scrollYOffset);

        this.header.current.style.height = newHeight + 'px';
        this.header.current.style.transform = 'skewY(' + newDegrees + 'deg)';


        this.title.current.style.transform = 'translateY(-' + (scrollYOffset/2) + 'px)';
    }


    render() {
        return (
            <Fragment>
                <div id="header" className="header" ref={this.header}>
                    <div id="skew" className="skew"></div>
                    <div id="title" ref={this.title}>
                        <div className="title-openasset">OpenAsset</div>
                        <div className="title-image">Image</div>
                        <div className="title-management">Management</div>
                    </div>
                </div>
                <div id="background" className="background"></div>
            </Fragment>
        )
    }


}