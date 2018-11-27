import React from 'React';

const LoadingSpinnerHOC = WrappedComponent => {
    return props => <WrappedComponent {...props} />
}

export default LoadingSpinnerHOC;
