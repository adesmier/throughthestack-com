
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

}
