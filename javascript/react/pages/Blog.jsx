import { Component, Fragment } from 'react';

import BlogPostGrid            from '../components/BlogPostGrid';
import DynamicButton           from '../components/primitives/DynamicButton';


export default class Blog extends Component {

    state = { resultsPage: 0, loading: false, disabled: false };


    //--- FUNCTION DECLARATIONS ---

    clickHandler = () => {
        const { resultsPage } = this.state;

        this.setState({
            resultsPage: resultsPage + 1,
            loading: true
        });
    }

    resultsLoadedHandler = postData => {
        const { resultsPage } = this.state;
        const { nbPages } = postData;
        let disabled = false;

        if((resultsPage + 1) === nbPages) disabled = true;

        this.setState({ loading: false, disabled });
    }


    //--- RENDER ---

    render() {
        const { resultsPage, loading, disabled } = this.state;

        return (
            <Fragment>
                <BlogPostGrid
                    searchQuery={''}
                    resultsPage={resultsPage}
                    loading={loading}
                    resultsLoadedCb={this.resultsLoadedHandler}
                />
                <DynamicButton
                    text={'Load More'}
                    loading={loading}
                    disabled={disabled}
                    hoverIcon={'fa-arrow-down'}
                    onClick={this.clickHandler}
                />
            </Fragment>
        );
    }
}
