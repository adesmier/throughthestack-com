const ROOT_TITLE = 'Through the Stack';

export default class UrlUtils {

    /**
     * Returns an object of param => value entrires based on the current url
     */
    static getUrlParamsHash() {
        //remove the starting ?
        const fullSearchParamStr = window.location.search.substring(1);

        if(fullSearchParamStr) {
            const searchParamsArr = fullSearchParamStr.split('&');
            let paramsObj = {};

            searchParamsArr.forEach(param => {
                const paramToValue = param.split('=');
                paramsObj[window.decodeURI(paramToValue[0])]
                    = window.decodeURI(paramToValue[1]);
            });

            return paramsObj;
        } else {
            return null;
        }
    }

    /**
     * Returns a search param string based on the passed param => value object
     * @param {object} paramsObject hash of param => value entires
     */
    static createUrlSearchParamString(paramsObject) {
        const entries = Object.entries(paramsObject);
        let paramsStr = '?';

        for(const [param, value] of entries) {
            paramsStr = paramsStr + param + '=' + value + '&';
        }

        const finalAmpDropped = paramsStr.slice(0, -1);

        return window.encodeURI(finalAmpDropped);
    }

    /**
     * Appends a new param-value to the end of the current url search string
     * @param {string} newParam the new param and value to append the current
     * search string
     */
    static appendToUrlParamString(newParam) {
        const newUrlStr = window.location.search + newParam;
        return window.encodeURI(newUrlStr);
    }

    /**
     * Returns the current url path as a formatted string to display in the
     * page header
     * @returns {object} contains site name and any sub-paths
     */
    static getPageBreadcrumbs() {
        const currLocation = window.location.pathname;
        let breadcrumbPath = '';

        if(currLocation === '/') {
            return { pageTitle: ROOT_TITLE }
        } else {
            currLocation
                .split('/')
                .filter(breadcrumb => breadcrumb !== '')
                .forEach(breadcrumb => {
                    return breadcrumbPath += breadcrumb + ' | ';
                });

            return {
                pageTitle:    ROOT_TITLE,
                pageSubtitle: breadcrumbPath
            }
        }
    }

    /**
     * Gets the name of the post from the current url string
     * @returns {string} the dash-seperated name of the current post - can
     * guarantee a single result from algolia
     */
    static getPostTitleFromUrl() {
        const currLocation = window.location.pathname;
        const pathTokens = currLocation
            .split('/')
            .filter(token => token !== '');

        //post title is always last part of url path
        return pathTokens[pathTokens.length - 1];
    }

}
