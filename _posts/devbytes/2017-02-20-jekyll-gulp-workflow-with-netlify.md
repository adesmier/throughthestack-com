---
layout: tutorials
title: Deploying to Netlify using Jekyll and Gulp
category: tutorials
image: assets/images/posts/tutorials/cms-jekyll-contentful/header.jpg
thumbnail: assets/images/50x50.jpg
time: 20 min
comments: true
heading: Netlify is a great solution that will allow you to host a static website, for free! Here were going to look at how to deploy your Jekyll based website to Netlify using the Gulp task runner.
tags: [netlify, jekyll, gulp]
sections:
    Intro: |
        With the [popularity of static sites](https://www.netlify.com/blog/2016/05/02/top-ten-static-website-generators/) on the rise, there are a growing number of hosting solutions for them. You can decide to take the rather archaic approach and FTP your static files up to a 'GoDaddy' server. Or chose a more sophisticated solution like GitHub Pages or [Netlify](https://www.netlify.com) to host your files.<br /><br />

        By choosing one of these you get to take advantage of git integration - so you can version your website code in git, push the changes and the results will be deployed. Most hosting sites also utilise a content delivery network (CDN) - your content is distributed around the world so your global visitors are able to access your site faster.<br /><br />

        Netlify has both of these features as well as a host of others such as, custom domain setup, form generation and password protection. It's a great cost-effective solution to host your static site and with the company being only a few years old, it's growing in popularity massively with new features and tool sets being added frequently.<br /><br />

        It's definitely at the forefront of the ['serverless'](https://en.wikipedia.org/wiki/Serverless_computing) movement. This is the idea where web and app creators don't have to bother about provisioning their infrastructure. They can deploy to something like Netlify and this looks after everything backend wise like DNS, CDN, scaling, freeing up time for the developer to concentrate on their app. It's a movement that's really fascinating and something that has great potential.<br /><br />

        Today we're going to be looking at how we can use some of the feature of Netlify to host our Jekyll site. We'll be using [Gulp](http://gulpjs.com/) to package our assets, such as our CSS files, building the site with Jekyll and then deploying the site to Netlify.<br /><br />

    Prerequisites: |
        We'll need a base Jekyll project to get up and running. You can clone the jeykll-base-template repo which includes the gulp file we'll be going through. We'll also assuming a working knowledge of Gulp, how to install it and it's main principles. I learned all of these for various articles, one being ... which is great at stepping through the gulp tooling process for beginners.

    Jekyll Config Files: |
        We'll be creating 2 Jekyll config.yml files - one for dev builds for our development environment and one for our live builds onto Netlify. Within these two files you can put anything that will be specific to either your dev or live build - the main thing in my config file is the URL variable

        ```yaml
        ---
        url: https://www.adesmier.com

        ---
        ```

        URL is used throughout the site to build up the canoclial URL for each page. This will obviously be something like 'localhost' on my dev build. We can then pass these files into different gulp tasks so that to correct Jekyll site for our environment is built.<br /><br />

    The Gulp Task: |
        Let's take  look at our first gulp task - this will be to build out jekyll site

        ```javascript
        var cp = require('child_process');

        gulp.task('jekyll-build', function (done){
            return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
                .on('close', done);
        });
        ```

    Chaining Gulp Tasks: |
    The Default Gulp Tasks: |
    Netlify Gulp Task: |
    Deploying To Netlify: |

---
