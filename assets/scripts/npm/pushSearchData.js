const path              = require('path');
const algolia           = require('algoliasearch');
const PostExportActions = require('./postExportActions');

const postsDir       = path.join(__dirname, '../../../_posts');
const postCategories = [
    'devbytes',
    'tutorials'
];

const postActions = new PostExportActions();


postCategories.forEach(async category => {
    const categoryPath = path.join(postsDir, category);
    //get all posts paths in a category folder
    const posts = await postActions.getPostsInFolder(categoryPath);
    
    for(let post of posts) {
        const postPath = path.join(postsDir, category, post);
        //matter will only contain properties the need to be indexed, large
        //properties will have been removed to keep to algolia limits
        const matter = await postActions.getFrontMatter(postPath);
        const indexed = postActions.isPostIndexed(matter);

        //if the post exists and is unmodified in our local cache then it has
        //already been indexed, so don't query algolia
        if(indexed.exists && index.modified) {
            //the post has been modified so update the algolia index
            if(matter.serieslink) {
                const seriesMatter = await combineSeriesMatter(matter.serieslink);
                matter.seriesposts = seriesMatter;
            }
            //TODO: update algolia index

            console.log('POSTS EXISTS BUT IS MODIFIED');
            console.log(matter);

            //now update our local cache
            // postActions.addNewPostToIndex(matter);
        } else if(!indexed.exists) {
            //if the post is part of a series then combine the matter of all the
            //related series posts and add to this posts matter
            if(matter.serieslink) {
                const seriesMatter = await combineSeriesMatter(matter.serieslink);
                matter.seriesposts = seriesMatter;
            }
            //TODO: add to algolia index

            console.log('POSTS DOES NOT EXIST');
            console.log(matter);


            // postActions.addNewPostToIndex(matter);
        }
        
    }
});


async function combineSeriesMatter(seriesLink) {
    const seriesPath = path.join(postsDir, `series/${seriesLink}`);
    const seriesPosts = await postActions.getPostsInFolder(seriesPath);
    let seriesMatterArray = [];

    for(let seriesPost of seriesPosts) {
        const seriesPostPath = path.join(seriesPath, seriesPost);
        const seriesMatter = await postActions.getFrontMatter(seriesPostPath);
        seriesMatterArray.push(seriesMatter);
    }

    return seriesMatterArray;
}




