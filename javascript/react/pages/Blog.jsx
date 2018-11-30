import { Component, Fragment } from 'react';

import BlogPostGrid            from '../components/BlogPostGrid';
import DynamicButton           from '../components/primitives/DynamicButton';


export default class Blog extends Component {

    state = { resultsPage: 0, btnLoading: false };

    clickHandler = () => {
        const { resultsPage } = this.state;

        this.setState({
            resultsPage: resultsPage + 1,
            btnLoading: true
        });
    }


    render() {
        const { resultsPage, btnLoading } = this.state;

        return (
            <Fragment>
                <BlogPostGrid
                    searchQuery={''}
                    resultsPage={resultsPage}
                    loading={btnLoading}
                >
                    <DynamicButton
                        text={'Load More'}
                        hoverIcon={'fa-arrow-down'}
                        onClick={this.clickHandler}
                    />
                </BlogPostGrid>
            </Fragment>
        );
    }
}
