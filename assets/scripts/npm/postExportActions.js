const fs           = require('fs');
const _            = require('lodash');
const matter       = require('gray-matter');

/**
 * Declare private methods as a Symbol object
 * https://medium.com/@davidrhyswhite/private-members-in-es6-db1ccd6128a5
 */
const _readPost            = Symbol('_readPost');
const _getPostUrl          = Symbol('_getPostUrl');
const _cleanFrontMatter    = Symbol('_cleanFrontMatter');


module.exports = class PostExportActions {
    constructor() {
        //read in our local cached posts
        this._indexedPosts = require(
            '../../../_data/jsonexport/indexedPosts.json'
        );
    }

    // ------ PRIVATE METHODS ------

    /**
     * Reads in a post at a the given directory
     * @private
     * @param {string} dir Full path to the post
     */
    [_readPost](dir) {
        let prom = new Promise((resolve, reject) => {
            fs.readFile(dir, 'utf8', (err, post) => {
                if(err) reject(err);
                else resolve(post);
            });
        });
        return prom;
    }

    /**
     * Generates the relative url of the post
     * @private
     * @param {string} category Category of the post
     * @param {string} dir Full path to the post
     */
    [_getPostUrl](category, dir) {
        let dateRemoved = dir.replace(/.*[0-9]{4}-[0-9]{2}-[0-9]{2}-/g, '');
        let postSlug = dateRemoved.replace(/.md$/g, '');
        let url = `/blog/${category}/${postSlug}`;
        return url;
    }

    /**
     * Cleans up the object returned by matter() and adds ObjectId needed by
     * Algolia
     * @private
     * @param {string} matter The front matter of the post as an object
     * @param {string} dir Full path to the post
     */
    [_cleanFrontMatter](matter, dir) {
        const { id, title, category, time, heading, tags } = matter.data;
        let cleanedMatter = {
            ObjectId: id,
            title,
            category,
            time,
            heading,
            tags,
            url: this[_getPostUrl](category, dir)
        };
        return cleanedMatter;
    }

    // ------ PUBLIC METHODS ------

    /**
     * Returns the file names of posts at the given directory
     * @param {string} dir The directory to read 
     */
    getPostsInFolder(dir) {
        let prom = new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if(err) reject(err);
                else resolve(files);
            });
        });
        return prom;
    }

    /**
     * First reads in the post of the given dir then parses the front matter
     * and returns a cleaned json object
     * @param {string} dir Full path to the post
     */
    getFrontMatter(dir) {
        let prom = new Promise((resolve, reject) => {
            this[_readPost](dir).then(postData => {
                const postMatter = matter(postData);
                //we have the entire front matter, now strip out sections
                const cleanedMatter = this[_cleanFrontMatter](postMatter, dir);
                resolve(cleanedMatter);
            }).catch(err => reject(err))
        });
        return prom;



    }

    /**
     * Checks if the given post is already indexed locally and if so checks if
     * the new data matches the cache
     * @param {bject} data The cleaned data of the post
     */
    isPostIndexed(data) {
        if(this._indexedPosts[data.ObjectId]) {
            if(_.isEqual(this._indexedPosts[data.ObjectId], data)) {
                return { exists: true, modified: false };
            } else {
                console.log(this._indexedPosts[data.id]);
                return { exists: true, modified: true };
            }
        } else {
            return { exists: false, modified: null };
        }
    }

    /**
     * Adds a new post to the index
     * @param {*} postPath 
     * @param {*} data 
     */
    addNewPostToIndex(data) {
        this._indexedPosts[data.url] = data;
        console.log(this._indexedPosts);
    }

    /**
     * Writes out the updated index into _data/jsonexport/indexPosts.json
     */
    writeOutIndex() {

    }
}
