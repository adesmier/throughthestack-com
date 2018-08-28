const algoliasearch = require('algoliasearch');


module.exports = class AlgoliaActions {
    constructor(index) {
        const appId  = process.env.ALGOLIA_APP_ID;
        const apiKey = process.env.ALGOLIA_ADMIN_API_KEY;
        this.client = algoliasearch(appId, apiKey);
        this.index  = this.client.initIndex(index);
    }

    // ------ PUBLIC METHODS ------

    addNewObjects(objects) {
        let prom = new Promise((resolve, reject) => {
            this.index.addObjects(objects, (err, content) => {
                if(err) reject(err);
                else {
                    const success = 'Added record to Algolia: ' + JSON.stringify(content);
                    resolve(success);
                }
            });
        });
        return prom;
    }

    updateExistingObjects(objects) {
        let prom = new Promise((resolve, reject) => {
            this.index.saveObjects(objects, (err, content) => {
                if(err) reject(err);
                else {
                    const success = 'Updated record in Algolia: ' + JSON.stringify(content);
                    resolve(success);
                }
            });
        });
        return prom;
    }
}
