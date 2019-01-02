import { Component, Fragment } from 'react';

import UrlUtils                from '../../modules/UrlUtils';

import BlogPostGrid            from '../components/BlogPostGrid';
import SubCategoryBanner       from '../components/SubCategoryBanner';
import DynamicButton           from '../components/primitives/DynamicButton';

const RESULTS_PER_LOAD     = 6;
const BUTTON_HEIGHT_OFFSET = 90;


export default class Blog extends Component {

    state = {
        resultsPageIndex:        0,
        containerHeight:         0,
        paramsHash:              undefined,
        currentPage:             undefined,
        initialLoadResultsCount: undefined,
        initialResultsLoaded:    false,
        loading:                 false,
        noMorePostsToLoad:       false
    };


    //--- LIFECYCLE FUNCTIONS ---

    //on mount get the page param value that will be used to determine how many
    //results to return on the first load. means navigating back to blog page
    //will load the same number of results. can't use URL object as not supported
    //in IE11 :(
    componentDidMount() {
        const paramsHash = UrlUtils.getUrlParamsHash();

        if(paramsHash) {
            if(paramsHash['page']) {
                const currentPage = paramsHash['page'];
                //if query value starts with 0 then just use RESULTS_PER_LOAD
                const onlyNumsRegEx = /^[1-9]{1}[0-9]*$/g;
                const regExResult   = onlyNumsRegEx.test(currentPage);

                //current page param is not valid so set to 1
                if(!regExResult) {
                    let paramsCopy = Object.assign({}, paramsHash);
                    paramsCopy['page'] = 1;
                    const modifiedPageValue =
                        UrlUtils.createUrlSearchParamString(paramsCopy);
                    window.history.replaceState(null, null, modifiedPageValue);
                }

                return this.setState({
                    initialLoadResultsCount: regExResult
                                                ? RESULTS_PER_LOAD * currentPage
                                                : RESULTS_PER_LOAD,
                    currentPage: regExResult ? Number(currentPage) : 1,
                    paramsHash
                });
            } else {
                //no page param so set a default, keeping other existing params
                const newUrlParamStr = UrlUtils.appendToUrlParamString('&page=1');
                window.history.replaceState(null, null, newUrlParamStr);
            }
        } else {
            window.history.replaceState(null, null, '?page=1');
        }

        this.setState({
            initialLoadResultsCount: RESULTS_PER_LOAD,
            currentPage: 1,
            paramsHash: paramsHash || { page: '1' }
        });
    }


    //--- FUNCTION DECLARATIONS ---

    loadMoreClickHandler = () => {
        const {
            resultsPageIndex,
            currentPage,
            paramsHash,
            initialLoadResultsCount
        } = this.state;

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
        let paramsCopy = Object.assign({}, paramsHash);
        paramsCopy['page'] = nextPage;

        const nextPageValue = UrlUtils.createUrlSearchParamString(paramsCopy);
        window.history.replaceState(null, null, nextPageValue);

        this.setState({
            resultsPageIndex: nextResultsIndex,
            currentPage: nextPage,
            initialLoadResultsCount: null,
            paramsHash: paramsCopy,
            loading: true
        });
    }

    resultsLoadedHandler = (searchResults, blogWrapperHeight) => {
        const { resultsPageIndex } = this.state;
        const { nbHits, nbPages, hitsPerPage } = searchResults;
        let noMorePostsToLoad = false;

        //we've got all results on first search
        if(hitsPerPage >= nbHits) noMorePostsToLoad = true;
        //we've reached the last page of results
        if((resultsPageIndex + 1) >= nbPages) noMorePostsToLoad = true;

        this.setState({
            containerHeight:      blogWrapperHeight + BUTTON_HEIGHT_OFFSET,
            loading:              false,
            initialResultsLoaded: true,
            noMorePostsToLoad
        });
    }

    renderLoadMoreButton() {
        const {
            initialResultsLoaded,
            noMorePostsToLoad,
            loading
        } = this.state;

        if(initialResultsLoaded && !noMorePostsToLoad) {
            return (
                <DynamicButton
                    text={'Load More'}
                    hoverIcon={'fa-arrow-down'}
                    loading={loading}
                    onClick={this.loadMoreClickHandler}
                />
            )
        } else {
            return null;
        }
    }


    //--- RENDER ---

    render() {
        const {
            resultsPageIndex,
            containerHeight,
            initialLoadResultsCount,
            loading,
            paramsHash
        } = this.state;

        if(typeof initialLoadResultsCount === 'undefined') return null;

        const searchQuery = paramsHash['search'] || '';

        return (
            <div
                id="blog__blog-posts-results-container"
                style={{ height: containerHeight }}
            >
                <BlogPostGrid
                    searchQuery={searchQuery}
                    searchParams={
                        initialLoadResultsCount
                        ? { hitsPerPage: initialLoadResultsCount }
                        : null
                    }
                    resultsPage={resultsPageIndex}
                    loading={loading}
                    resultsLoadedCb={this.resultsLoadedHandler}
                />
                {this.renderLoadMoreButton()}
            </div>
        );
    }
}
