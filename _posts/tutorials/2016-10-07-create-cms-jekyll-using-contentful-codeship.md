---
layout: tutorials
title: Create a CMS for Jekyll using Contentful and Codeship
category: tutorials
image: assets/images/tutorials/cms-jekyll-contentful/header.jpg
thumbnail: assets/images/50x50.jpg
time: 30 min
comments: true
heading: Jekyll is a powerful tool that will allow you to build a static site. But when it comes to end users adding and managing content it can become tricky due to the lack of a CMS. Contentful serves as an API driven CMS solution and when integrated with Codeship and Bitbucket you can create yourself a full website deployment pipeline.
tags: [jekyll, contentful, codeship]
sections:
    Intro: |
        I found myself in this dilemma on a recent project. I created a site in Jekyll and was originally using GitHub to host the code - intending on using [GitHub Pages](https://pages.github.com/) to host the actual site. This would have worked well as there are solutions such as [Prose](http://prose.io/) which provides a UI for editing markdown files and with GitHubs ability to upload new files from the web interface you could effectively use GitHub as the CMS for Jekyll.<br /><br />

        However, I needed there to be a password protected part of the site and it appeared that GitHub pages didn’t support this. OAuth wasn’t a viable solution in this case and I only required basic auth to restrict some pages from the site.<br /><br />

        >*Top Tip:* If you’re using BitBucket to host your Jekyll code then the [Aerobatic](https://www.aerobatic.com/) extension can provide a great, free, hosting solution that comes with the ability to enable basic auth for individual pages.

        <br />When researching CMS solutions for Jekyll, I came across [Contentful](https://www.contentful.com). They market themselves as an API first CMS meaning that content makers can use the intuitive interface provided by Contentful to add content, then developers can use it’s API to pull the raw data into the site or application they’re building. It’s a great way of separating the content from the presentation layer.<br /><br />

        Contentful would then send a notification to [Codeship](https://codeship.com/), a continuous integration platform, whenever content was added or edited. Codeship would grab the new data, re-build the site and upload it to BitBucket, leaving the final stage for Aerobatic to host the site.<br /><br />

        Anyway, that's the setup - onwards with the tutorial!

    Prerequisites: |
        This tutorial works on the assumption that you are familiar with Jekyll and it’s file structure and have a working Jekyll site utilising markdown files for posts in the *_posts* folder. You also have your code checked into a BitBucket repo. There are some great tutorials over at [Jekyll Tips](http://jekyll.tips/) for further information on Jekyll, although I will be putting together my own 'Getting Started with Jekyll' tutorial.

    The Jekyll Site: |
        The Jekyll site in this tutorial is for a [music composer](http://www.ianarber.com/). The user would be wanting to regularly add new news posts and update their credit listing themselves. Both these data types are stored as categories in the *_posts* folder. This contains the following structure:

        ```bash
        project-name/
        ├── _posts/
        |     ├── credits/
        |     |   ├── 2015-05-27-credit-one.md
        |     |   ├── 2015-05-23-credit-two.md
        |     |   └── 2015-05-23-another-credit.md
        |     ├── news/
        |     |   ├── 2015-04-20-news-one.md
        |     |   ├── 2015-04-25-news-two.md
        |     |   └── 2015-04-25-another-news-post.md
        ```

        One of the goals of the Contentful CMS would be to allow the user to add either news or credit posts via the Contentful interface and that data would then be pulled into the site - removing the need for the end user to open a code editor or the terminal.<br /><br />

        As well as the posts we have the images the YAML front matter references, for example:

        ```yaml
        ---
        image_cover: /assets/img/credits-grid/kia.jpg
        image_social: /assets/img/credits-grid/opengraph/kia.jpg

        ---
        ```

        These are currently stored in BitBucket, so we would now want the user to load these into Contentful and have Codeship pull information related to those images into the posts MD file when building the site. The rest of the site acts like a normal Jekyll site using the default folder structure.<br /><br />

        Next we’ll setup a Contentful account and begin adding data via their CMS.


    Setting up Contentful: |
        You can setup a free Contentful account by heading over to their [site](https://www.contentful.com). The free account is fairly generous and should be enough to satisfy small sites. With the free account you can add up to 1000 posts (called entries) and are allowed up to 15 different types of posts (called content types).<br /><br />

        Some might find the limitation on 100 assets i.e. images, audio files, PDF's etc an issue. In this case you might want to pull non-blog related images such as background images, profile images etc from BitBucket so that the user only uploads blog related images to Contentful.<br /><br />

        <div class="notice-update" markdown="1">
        *Update:* Contentful have now updated their free subscription to include [10,000 records](https://www.contentful.com/pricing/). Records encompass posts entries and assets so this allows a lot more room for your posts and images.
        </div><br />

        **Step 1 - Setup your Space<br />**
        Once signed up, choose a blank template and you can start creating your first [Space](https://www.contentful.com/developers/docs/concepts/data-model/). A Space is essentially a project in Contentful, so a Space can map directly to the name of your site (in my case ianarber.com)<br /><br />

        **Step 2 - Setup your Content Type<br />**
        Within a Space you then have content types. Content Types relate to different kinds of posts the user might add. In this case there are two: news posts and credit posts. All of your content types make up what’s known as your Content Model in Contentful. Below you can see the two content types I've created for News and Credit posts.

        ![contentful content model example](/assets/images/tutorials/cms-jekyll-contentful/contentful-content-model.jpg "Logo Title Text 1")

        **Step 3 - Create your Fields<br />**
        Now that you have your first Content Type you can start adding fields that will be used to indicate how a user will add data and what type of data they can add. These can be anything from a single line field to media upload field.

        ![contentful content type fields example](/assets/images/tutorials/cms-jekyll-contentful/contentful-field-types.jpg "Logo Title Text 1")

        **Step 4 - Add Entries and Assets<br />**
        For my Content Type - Credit Post - I've added 19 fields. Now you can start creating entires and uploading images and media. All you images and media will reside in the Media section which you can then link to an entry. Below you can see all the media files that I've uploaded to Contentful

        ![contentful media uploads example](/assets/images/tutorials/cms-jekyll-contentful/contentful-media-uploads.jpg "Logo Title Text 1")

        Once you have uploaded some content into Contentful we can use their API to pull that information into our Jekyll build. This is where the fun starts...!

    Pull Data into Jekyll: |
        Contentful provides an [extension for Jekyll](https://github.com/contentful/jekyll-contentful-data-import) that allows you to pull your data that you have in Contentful into a Yaml data file that it will create in the *_data* folder of your Jekyll project.<br /><br />

        Once you have this data file it can be used in Jekyll by accessing it via the ```site.data``` variable or, in this case, we are going to convert each entry in the file to a posts *.md* file and place it in the Jekyll *_posts* folder. The below diagram gives you an overview of the dataflow of our deployment pipeline:<br />

        ![contentful jekyll dataflow overview](/assets/images/tutorials/cms-jekyll-contentful/dataflow.png "Logo Title Text 1")

        The site build will be run on Codeship which will then push the result back to BitBucket to the *aerobatic* branch so that it can be deployed to Aerobatics CDN servers. An update on Contentful or code push to BitBucket will trigger the build which will then run through a *Rakefile* that steps through the build process (which we'll come onto later).<br /><br />

        >*Client Side API*: The workflow we're using here means that the site is rebuilt when there has been a new entry or change in Contentful as the API call is made during the site build. You could also call the Contentful API from the client side meaning that the post data is pull in and parsed on page load. I'll be covering this in a future tutorial.

        <br />**Step 1 - Configure Gemfile<br />**
        First let's setup the Contentful Jekyll extension. To do this we'll need to add the following to our Gemfile:

        ```ruby
        group :jekyll_plugins do
            gem "jekyll-contentful-data-import"
        end
        ```

        If you're using [Bundler](http://bundler.io/) to manage your Gems then just run ```bundle install``` to update your installed gems. This will install any necessary dependencies for the Contentful import gem. Before we run the Contentful gem we first need to add our Contentful Spaces ID and access token to our Jekyll config.<br /><br />

        **Step 2 - Obtain Contentful API Key<br />**
        Return to the Contentful interface and go to APIs and click Website Key - this is a pre-configured access key that will allow access to your Space:

        ![contentful space api key](/assets/images/tutorials/cms-jekyll-contentful/contentful-api-key.jpg "Logo Title Text 1")

        We're after the *Content Delivery API* and the *Spaces ID* values. Once you've copied those, we can enter them into our *_config.yml* file like so:

        ```yaml
        contentful:
            spaces:
              - posts:
                    space: <your_spaces_id>
                    access_token: <your_access_token>
        ```

        **Step 3 - Run the Contentful Gem<br />**
        The *posts* value specifies the name of the output file which will be placed into *_data/contentful/spaces/posts.yml* Now we're all set to run the Contentful gem with the command ```jekyll contentful```<br /><br />

        >If you're using Bundler it's preferable to call ```bundle exec jekyll contentful``` as this will run the command in the context of the current bundle

        <br />Now we have all our Contentful data in a yaml file we can feed into Jekyll

    Creating the Posts: |
        Our aim here is to take our yaml data and convert it into markdown files so Jekyll sees it as posts. Annoyingly the Contentful gem only creates data files, rather than posts, so we're going to use a Ruby script to parse the yaml file and create post files for each entry. This ruby script will be run as a pre-Jekyll build step on Codeship.<br /><br />

        Now, I'm in no way a Ruby programmer so I admit I watched a really helpful learn Ruby in one [video tutorial](https://www.youtube.com/watch?v=Dji9ALCgfpM&t=1824s) in order to write this script (thank you Derek Banas!). The [gist](https://gist.github.com/adesmier/5efe9cebe9e059717a4b83866f0ba9a2) of this script is to loop through all credit posts and output the data to the front matter/body of the post file that will be created in the *_posts* folder.

        ```ruby
        #create credit posts in _posts/credits
        begin
        	#create filename for post MD file in the format 'yyyy-mm-dd-some-title.md'
        	credits_date = "#{postData['creditPost'][credits_counter]['credit_date']}".partition('T').first
        	title_slug = "#{postData['creditPost'][credits_counter]['title']}".downcase.gsub(" ", "-")
        	filename = credits_date + "-" + title_slug + ".md"

        	#create post file and append YAML front matter data
        	File.open("_posts/credits/#{filename}", "w") do |f|
        		f.puts "---"
        		f.puts "layout: credit-info"
        		f.puts "category: credits"
        ```

        The excerpt above is the beginning of the loop through the credit posts. We're creating the file name for the post by parsing through ```creditPost``` key using the ```credits_counter``` variable. We then use this name to open a file and then simply call ```f.puts``` to output key:value pairs into the front matter. This is done for all credit posts and then the same operation is run for news articles. Admittedly it's not the most efficent script but not too bad for a first time Ruby programmer eh?!<br /><br />

        If you wish to use the script you will need to tweak it to your needs as at the moment it's purpose built for the Content Types and Fields I created. Once completed you will have your data as Jekyll-parsable posts files in your *_posts* (and any subfolders you specify).<br /><br />

        >**Dev vs. Live Builds:** For your development build you can run the Contentful gem and script on your own machine so that you can fully build and test the site locally. For live deployment we don't need to check in the post files into BitBucket as these will be created on Codeship for us and then pushed to the aerobatic deploy branch.

    Building the Site with Codeship: |
        Ok we're almost there! We have our Jekyll post files courtesy of the Contentful gem and the Ruby script. Now we can setup a [Codeship](https://codeship.com) account using our BitBucket details and link our repo to a new project.

        ![codeship link bitbucket repository](/assets/images/tutorials/cms-jekyll-contentful/codeship-link-bitbucket.jpg "Logo Title Text 1")

        **Step 1 - Create Codeship Project<br />**
        Enter your repo clone URL and click Connect. On the next screen, select Basic Infrastructure. Next chose Ruby from the 'Select your technology' drop down:

        ![codeship select your technology](/assets/images/tutorials/cms-jekyll-contentful/codeship-select-ruby.jpg "Logo Title Text 1")

        **Step 2 - Configure Deployment<br />**
        Scroll down the page and delete the test commands and click 'Save and go to dashboard'. Now we need to add our own custom Rakefile that will contain all of our build steps. Go to Project Settings in the top right and select Deployment. We're going to chose our master branch to trigger the deployment, so enter 'master' and click save.

        ![codeship deployment settings](/assets/images/tutorials/cms-jekyll-contentful/codeship-deployment-settings.jpg "Logo Title Text 1")

        Choose 'custom script' and enter the following as your deployment commands:

        ```ruby
        rake generate
        rake publish
        ```

        **Step 3 - Setup Rakefile<br />**
        This will run our two [Rakefile](https://gist.github.com/adesmier/80c398f30a762810b8d40f484e2a9802) tasks in turn - ```Generate``` will call the Contentful gem and pull in post data, then the ruby script will be run to create the post files. Finally, the Jekyll site will be built. ```Publish``` will then push the generated *_site* folder back to BitBucket into the aerobatic branch ready for deployment.<br /><br />

        Let's take a closer look at the Publish task:

        ```ruby
        task :publish do
            Dir.mktmpdir do |tmp|
                system "mv _site/* #{tmp}"
                system "git checkout -b aerobatic"
                system "rm -rf *"
                system "mv #{tmp}/* ."
                system 'git config --global user.email "user@email.co.uk"'
                system 'git config --global user.name "User Name"'
                system "git add ."
                system "git commit -am 'Rebuild triggered from Contentful webhook --skip-ci'"
                system "git remote add bb git@bitbucket.org:ianarber/ianarber.git"
                system "git push -f bb aerobatic"
            end
        ```

        Here we are checking out the aerobatic branch of our repo and then pushing the *_site* folder that was generated on the Codeship server instance as part of the Generate task. The ```--skip-ci``` switch on line 10 tells Codeship not to build the code that is pushed into the aerobatic branch.<br /><br />

        **Step 4 - Configure SSH Keys<br />**
        Upon linking your BitBucket account to Codeship, a deployment SSH key is added to your repo in BitBucket. As we need to push code back to BitBucket, we need to add an account-level SSH key that will provide write access rather than the read-only repo level key. First we need to delete the deployment key in our BitBucket repo:

        ![bitbucket delete deployment key](/assets/images/tutorials/cms-jekyll-contentful/bitbucket-deployment-key.jpg "Logo Title Text 1")

        Next copy the public SSH key from your Codeship General Project Settings and paste this into a new account-level SSH key in BitBucket:

        ![bitbucket create new ssh key](/assets/images/tutorials/cms-jekyll-contentful/bitbucket-new-ssh-key.jpg "Logo Title Text 1")

        **Step 5 - Test your Build<br />**
        Now everything is in place to run our first build. Check in a new file to your master branch, you can use the Rakefile for this, and watch the build kick-off within Codeship. If all goes well then you'll see a lot of green ticks and your build will be a success!

        ![codeship build results](/assets/images/tutorials/cms-jekyll-contentful/codeship-build-results.jpg "Logo Title Text 1")

        Awesome! If you've made it this far then we only have two components of our deployment pipeline left to Configure:
        * Setting up the Aerobatic BitBucket add-on and configuring deployment
        * Adding a webhook to Contentful to trigger a build in Codeship when content is added/changed

    Configuring Aerobatic: |
        Now that we have our site built it's ready to be deployed. We'll be using the [Aerobatic hosting](https://www.aerobatic.com/) solution for this. They have a handy integration into BitBucket that you can add from the integration settings of your BitBucket account:

        ![aerobatic addon for bitbucket](/assets/images/tutorials/cms-jekyll-contentful/aerobatic-bitbucket-addon.jpg "Logo Title Text 1")

        With a free Aerobatic account you can deploy up to two sites. Back on your repo page you'll have a new option on the left menu to configure Aerobatic:

        ![aerobatic configuration](/assets/images/tutorials/cms-jekyll-contentful/aerobatic-configure-site.jpg "Logo Title Text 1")

        Enter the name of your site and choose the *aerobatic* branch for deploy. Leave the deploy directory as the root. You can also chose whether you want to add your own domain or just use a subdomain of aerobatic.io. Hit Create Website and watch the magic work!

        ![aerobatic site deploy procedure](/assets/images/tutorials/cms-jekyll-contentful/aerobatic-deploy-site.gif "Logo Title Text 1")

        If all went as expected your site will be pushed to production and you can click the link next to the production indicator to view your site. Aerobatic uses a network of content delivery servers to deploy your site so you can guarantee the best performance no matter where in the world you access your site.<br /><br />

        >**Auto-Jekyll Builds:** Aerobatic is actually capable of performing [automated Jekyll builds](https://www.aerobatic.com/blog/automated-continuous-deployment-of-jekyll-sites) However, at the moment this doesn't allow for a pre-build step which we need to run the ruby script. Therefore, the Codeship approach allows for this extra build step to take place

    Webhooks in Contentful: |
        So now our site should be live and kicking! We've currently got our deploy pipeline setup so that when we check in a file to our master branch this will trigger a re-build of our site and deploy the updated files. This works when we make changes to the codebase such as css or script changes. But what if the user updates or adds a post in Contentful? There's nothing setup yet that will notify Codeship to pull the new files. This is where webhooks come in...<br /><br />

        **Step 1 - Locate Build ID and API Key**<br />
        All builds in Codeship are given a build ID number. You can locate this number from the URL of the build on the project page in Codeship. It should look something like *https://app.codeship.com/projects/{project_id}/builds/{build_id}* Also make a note of your project ID.

        ![codeship build id and api key](/assets/images/tutorials/cms-jekyll-contentful/codeship-build-id-api-key.jpg "Logo Title Text 1")

        Next you'll need to locate your personal API key for your Codeship account. You can find this in your Account Settings. You should now have three bits of infornmation.<br /><br />

        **Step 2 - Create 'Restart Build' URL**<br />
        Now we can use the [Codeship API](https://documentation.codeship.com/basic/getting-started/api/) to create a URL that, when called, will restarted our build:

        ```bash
        curl -i -X POST https://codeship.com/api/v1/builds/:build_id/restart.json?api_key=valid_api_key
        ```

        When running the above curl command you're telling Codeship to re-build the build specified with the 'build_id' value. It's this URL we can use in Contentful that will act as our webhook.<br /><br />

        **Step 3: Create Contentful Webhook**<br />
        With this URL we can add this to a new webhook in Contentful. In Contentful go to Settings -> Webhooks. Click Add Webhook and enter a name and your URL:

        ![contentful webhook configuration](/assets/images/tutorials/cms-jekyll-contentful/contentful-webhook-config.jpg "Logo Title Text 1")

        The settings at the bottom specify when the webhook is called. Make sure you only select certain events otherwise the webhook will be triggered for every event like asset uploads and auto-saving which you don't want. I'd suggest to only tick *Publish* and *Unpublish* for entires, that way only finished-public/unpublishing articles will trigger a re-build.<br /><br />

        <div class="notice-warn" markdown="1">
        *Update the Build ID:* Currently Codeship can only re-build existing builds. A new build will be created when you push new code into your BitBucket repo. At the this point you MUST remember to update your build ID number in your webhook URL so that when it is called, Codeship will re-build the most recent build. Contentful provide a [Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/) that will allow you to update webhooks so this could provide a useful tool to automate this process.
        </div><br />

        <hr>

        <br />And there you have it! You now have a working CMS that your clients can use to update their Jekyll-based site..<br /><br />

        You can continue developing the site in your dev environment - your clients will see the changes you make as soon as you push them and they can edit and add content such as blog posts, photos and other media.<br /><br />

        Whats more, you can host this all for free and make use of CDN servers to deploy the site.
---
