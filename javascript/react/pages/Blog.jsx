import React        from 'react';

import BlogPostGrid from '../components/BlogPostGrid';


export default class Blog extends React.Component {
    render() {
        return (
            <BlogPostGrid
                searchQuery={''}
                resultsPage={9}
            />
        );
    }
}
