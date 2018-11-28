import React from 'react';
import PropTypes  from 'prop-types';


export default class DelayRenderer extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        delay:    PropTypes.number
    };

    static defaultProps = { delay: 1000 };

    state = { show: false };


    //--- LIFECYCLE FUNCTIONS ---

    componentDidMount() {
        const { delay } = this.props;

        this._timeout = window.setTimeout(() => {
            this.setState({ show: true })
        }, delay);
    }

    componentWillUnmount() {
        window.clearTimeout(this._timeout);
    }


    //--- RENDER ---

    render() {
        const { children } = this.props;
        const { show }     = this.state;

        if(show) return children;

        return null;
    }

}
