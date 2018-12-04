import React from 'react';

/**
 * Checks if the passed component has returned null. If so, returns the passed
 * loading component.
 * https://blog.callstack.io/sweet-render-hijacking-with-react-bb2b81d8d9be
 * @param {ReactComponent} WrappedComponent 
 * @param {ReactComponent} LoadingComponent 
 */

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
