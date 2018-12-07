import { Component, Fragment } from 'react';

import BlogPostGrid            from '../components/BlogPostGrid';
import DynamicButton           from '../components/primitives/DynamicButton';

const RESULTS_PER_LOAD = 6;


export default class Blog extends Component {

    state = {
        resultsPageIndex:        0,
        currentPage:             undefined,
        initialLoadResultsCount: undefined,
        loading:                 false,
        noMorePostsToLoad:       false
    };


    //--- LIFECYCLE FUNCTIONS ---

    //on mount get the page param value that will be used to determine how many
    //results to return on the first load. means navigating back to blog page
    //will load the same number of results. can't use URL object as not supported
    //in IE11 :(
    componentDidMount() {
        const searchParamStr = window.location.search;

        if(searchParamStr.startsWith('?page=')) {
            const equalsIndex = searchParamStr.indexOf('=');
            const currentPage = searchParamStr.substring(equalsIndex + 1);

            //if query value starts with 0 then just use RESULTS_PER_LOAD
            const onlyNumsRegEx = /^[1-9]{1}[0-9]*$/g;
            const regExResult   = onlyNumsRegEx.test(currentPage);

            if(regExResult) {
                return this.setState({
                    initialLoadResultsCount: RESULTS_PER_LOAD * currentPage,
                    currentPage: Number(currentPage)
                });
            }
        }

        window.history.replaceState(null, null, '?page=1');

        this.setState({
            initialLoadResultsCount: RESULTS_PER_LOAD,
            currentPage: 0
        });
    }

    //--- FUNCTION DECLARATIONS ---

    loadMoreClickHandler = () => {
        const { resultsPageIndex, currentPage, initialLoadResultsCount } = this.state;

        let nextResultsIndex;
        if(initialLoadResultsCount) {
            //after initial load we'll only get our set number of results
            nextResultsIndex = initialLoadResultsCount / RESULTS_PER_LOAD;
        } else {
            //so now just increment results index as normal
            nextResultsIndex = resultsPageIndex + 1;
        }

        //keep the url in sync. no need to use pushState() as the results will
        //already be loaded
        const nextPage = currentPage + 1;
        window.history.replaceState(null, null, `?page=${nextPage}`);

        this.setState({
            resultsPageIndex: nextResultsIndex,
            currentPage: nextPage,
            initialLoadResultsCount: null,
            loading: true
        });
    }

    resultsLoadedHandler = searchResults => {
        const { resultsPageIndex } = this.state;
        const { nbHits, nbPages, hitsPerPage } = searchResults;
        let noMorePostsToLoad = false;

        //we've got all results on first search
        if(hitsPerPage >= nbHits) noMorePostsToLoad = true;
        //we've reached the last page of results
        if((resultsPageIndex + 1) >= nbPages) noMorePostsToLoad = true;

        this.setState({ loading: false, noMorePostsToLoad });
    }


    //--- RENDER ---

    render() {
        const {
            resultsPageIndex,
            initialLoadResultsCount,
            loading,
            noMorePostsToLoad
        } = this.state;

        if(typeof initialLoadResultsCount === 'undefined') return null;

        return (
            <Fragment>
                <BlogPostGrid
                    searchQuery={''}
                    searchParams={
                        initialLoadResultsCount
                        ? { hitsPerPage: initialLoadResultsCount }
                        : null
                    }
                    resultsPage={resultsPageIndex}
                    loading={loading}
                    resultsLoadedCb={this.resultsLoadedHandler}
                />
                {
                    noMorePostsToLoad ? null : (
                        <DynamicButton
                            text={'Load More'}
                            hoverIcon={'fa-arrow-down'}
                            loading={loading}
                            onClick={this.loadMoreClickHandler}
                        />
                    )
                }
            </Fragment>
        );
    }
}
