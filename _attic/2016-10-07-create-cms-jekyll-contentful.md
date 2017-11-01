---
layout: tutorials
title: Create a CMS for Jekyll using Contentful and Codeship
category: tutorials
image: assets/images/posts/tutorials/cms-jekyll-contentful-header.jpg
thumbnail: assets/images/posts/tutorials/50x50.jpg
time: 30 min
comments: true
heading: Jekyll is a powerful tool that will allow you to build a static site. But when it comes to end users adding and managing content it can become tricky due to the lack of a CMS. Contentful serves as an API driven CMS solution and when integrated with Codeship and Bitbucket you can create yourself a full website deployment pipeline.
tags: [jekyll, contentful, codeship]
sections:
    Intro: |
        I found myself in this dilemma on a recent project. I created the site in Jekyll and was originally using Github to host the code - intending on using [Github Pages](https://pages.github.com/) to host the actual site. This would have worked well as there are solutions such as [Prose](http://prose.io/) which enables a UI for creating markdown files and with GitHubs ability to upload new files from the web interface you could effectively use GitHub as the CMS for Jekyll.<br /><br />

        However, I needed there to be a password protected part of the site and it appeared that GitHub pages didn’t support this. OAuth wasn’t a viable solution in this case and I only required basic auth to restrict some pages from the site.<br /><br />

        So I found myself moving over to rivals, BitBucket, as there is an extension called [Aerobatic](https://www.aerobatic.com/) that allowed for site hosting and supports basic auth. Boom! But now I’d lost the CMS solution that GitHub and Prose provided and couldn’t see any alternative within BitBucket. Back to square one…<br /><br />

        Maybe not! Step in Contentful and Codeship. [Contentful](https://www.contentful.com) market themselves as an API first CMS, meaning that content makers can use the intuitive interface provided by Contentful to add content and then developers can use it’s API to pull the raw data into whatever site or application they’re building. It’s a great way of separating the content from the presentation layer.<br /><br />

        Contentful would then send a notification to [Codeship](https://codeship.com/), a continuous integration platform, whenever content was added or edited. Codeship would grab the new data, re-build the site and upload it to BitBucket, leaving the final stage for Aerobatic to host the site.<br /><br />

        Anyway, there’s the, not so brief, setup - onwards with the tutorial!

    Prerequisites: |
        This tutorial works on the assumption that you are familiar with Jekyll and it’s file structure and have a working Jekyll site utilising markdown files for posts in the ```_posts``` folder. There are some great tutorials over at [Jekyll Tips](http://jekyll.tips/) for further information on Jekyll.

    The Jekyll Site: |
        The Jekyll site in this tutorial is for a [music composer](http://www.ianarber.com/). The user would be wanting to regularly add new news posts and update their credit listing themselves. Both these data types are stored as categories in the _posts folder. This contains the following structure<br /><br />

        One of the goals of the Contentful CMS would be to allow the user to add either news or credit posts via the Contentful interface and that data would then be pulled into the site - removing the need for the end user to open a code editor and the dreaded terminal!

    Conclusion: |
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


---
