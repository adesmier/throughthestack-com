import React from 'react';


export default class SubCategoryBanner extends React.Component {

    subCatElement = React.createRef();

    state = { imageTranslateDirection: undefined }


    //--- LIFECYCLE FUNCTIONS ---

    //--- FUNCTION DEFINITIONS ---

    calculateMouseEntryPosition = e => {
        const element = this.subCatElement.current;
        let imageTranslateDirection;

        const elemBounding = element.getBoundingClientRect();
        const elementLeftEdge = elemBounding.left;
        const elementTopEdge = elemBounding.top;
        const elementRightEdge = elemBounding.right;
        const elementBottomEdge = elemBounding.bottom;

        const mouseX = e.pageX;
        const mouseY = e.pageY;

        const topEdgeDist = Math.abs(elementTopEdge - mouseY);
        const bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);
        const leftEdgeDist = Math.abs(elementLeftEdge - mouseX);
        const rightEdgeDist = Math.abs(elementRightEdge - mouseX);
        
        const minDistance = Math.min(
            topEdgeDist,
            bottomEdgeDist,
            leftEdgeDist,
            rightEdgeDist
        );

        switch(minDistance) {
            case leftEdgeDist:
                imageTranslateDirection = 'right';
                break;
            case rightEdgeDist:
                imageTranslateDirection = 'left';
                break;
            case topEdgeDist:
                imageTranslateDirection = 'down';
                break;
            case bottomEdgeDist:
                imageTranslateDirection = 'up';
                break;
        }

        this.setState({ imageTranslateDirection });
    }

    clearImageTranslateClass = e => {
        this.setState({ imageTranslateDirection: undefined });
    }


    //--- RENDER ---

    render() {
        const { imageTranslateDirection } = this.state;


        return (
            <div
                ref={this.subCatElement}
                className="blog__blog-post-flexgrid-wrapper grid-card multi-width-card sub-category-wrapper"
                onMouseEnter={this.calculateMouseEntryPosition} onMouseLeave={this.clearImageTranslateClass}
            >
                <h2>React</h2>
                <figure className="">
                    <img
                        className={imageTranslateDirection}
                        src="/assets/images/reactBackground.jpg"
                        alt="react"
                    />
                    <figcaption>
                        <h3>React <span>Tutorials</span></h3>
                        <p>The best react tutorials on the planet</p>
                    </figcaption>			
                </figure>
            </div>
        )
    }

}
