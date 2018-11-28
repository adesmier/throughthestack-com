import React from 'react';


const LoadingSpinnerHOC = (WrappedComponent, LoadingComponent) => {
    return class LoadingSpinnerHOC extends WrappedComponent {

        static displayName = WrappedComponent.name || 'Component';

        render() {
            const elementTree = super.render();

            if(!elementTree) return <LoadingComponent />

            return elementTree;
        }

    }
}

export default LoadingSpinnerHOC;
