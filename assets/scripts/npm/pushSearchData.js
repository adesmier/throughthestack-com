const path              = require('path');
const algolia           = require('algoliasearch');
const PostExportActions = require('./postExportActions');

const postsDir    = path.join(__dirname, '../../../_posts');
const postCategories = [
    'devbytes',
    'tutorials'
];

const postActions = new PostExportActions();

postCategories.forEach(iteratePosts)








function iteratePosts(category) {
    let categoryPath = path.join(postsDir, category);

    //iterate through posts in a category folder
    postActions.getPostsInFolder(categoryPath).then(posts => {

        for(let post of posts) {
            let postPath = path.join(postsDir, category, post);
            //get the posts front matter as a cleaned object
            postActions.getFrontMatter(postPath).then(matter => {
                //if the post is already indexed, check if the new object matches
                //the cached one. If not then it has been modified so update the
                //algolia db
                const indexed = postActions.isPostIndexed(matter);

                if(indexed.exists){
                    console.log('indexed', indexed)
                    console.log(JSON.stringify(matter))
                } else {
                    console.log('not indexed', indexed)
                }


            });

        }

    }).catch(err => console.error('getPostsInFolder failed:', err))
}









// let test = path.join(postsDir, postCategories[0]);




// let bye = hello.isPostIndexed(test);

// console.log(bye);







// const algoliasearch = require('algoliasearch');

// const client = algoliasearch(
//     'J62GWLVE45',
//     'ff2adcf30b62f4a6f6b12473eec30c90'
// );

// const index = client.initIndex('test');

// const jsonObj = {
//     title: 'Create a CMS for Jekyll using Contentful and Codeship',
//     category: 'tutorials',
//     heading: 'Jekyll is not a powerful tool that will allow you to build a static site. But when it comes to end users adding and managing content it can become tricky due to the lack of a CMS. Contentful serves as an API driven CMS solution and when integrated with Codeship and Bitbucket you can create yourself a full website deployment pipeline.',
//     tags: [
//         'jekyll',
//         'contentful',
//         'codeship',
//         'aerobatic'
//     ],
//     slug: 'create-cms-jekyll-using-contentful-codeship'
// }

// index.addObjects([jsonObj], (err, content) => {
//     if(err) {
//         console.err(err);
//     } else {
//         console.log(content);
//     }
// });


