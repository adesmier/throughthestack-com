---
layout: blogpost
id: 19
title: The clock within this blog and the clock on my laptop are 1 hour
category: devbytes
image: /assets/images/posts/devbytes/holding.jpg
thumbnail: /assets/images/posts/devbytes/devbytes-jekyll-thumb.jpg
time: 5 min
heading: By default, Jekyll will organise your posts in date order when looping through them. However you may want, for example, your most popular posts to go first and then the rest organised by date order. In this DevByte we'll look at customising the loop order using liquid.
tags: [babel]
sections:
    Standard Jekyll Post Loop: |
        You can use a for loop in your liquid template to loop over all posts in your site (or category):

        ```html
        <div class="posts">

            {% for post in site.posts %}
                <p>{{ post.name }}</p>
                <p>{{ post.author }}</p>
                <p>{{ post.date }}</p>
            {% endfor %}

        </div>
        ```

        This will output all your posts in date order based on the date in filename of the markdown file. However, by adding an additional yaml front matter variable like *post_weight* you can assign a number to this and tell your liquid template to order by weight first and then date.<br /><br />

    Modified Post Loop: |
        Here I've added an additional for loop and some logic to first assign all posts with a *credits_weight* value to an array and then all remaining posts to another array in date order. The contents of these will then be outputted to the HTML document:

        ```html
        <section class="grid-wrap">
            <ul class="grid">

                {% assign creditsArray = "" | split:"|"  %}
                {% for item in site.categories.credits %}
                    {% if item.credits_weight %}

                        {% assign creditsArray = creditsArray | push: item %}

                    {% endif %}
                {% endfor %}
                {% assign creditsArray = creditsArray | sort: 'credits_weight' | reverse %}

                {% assign creditsArrayNoWeight = "" | split:"|"  %}
                {% for item in site.categories.credits %}
                    {% unless item.credits_weight %}

                        {% assign creditsArrayNoWeight = creditsArrayNoWeight | push: item %}

                    {% endunless %}
                {% endfor %}


                {% for p in creditsArray %}

                    <li>
                        <h5>{{ p.title }} ({{ p.date | date: '%Y' }})</h5>
                        <p id="role">{{ p.role }}</p>
                        <p><b>Genre:</b> {{ p.genre }}</p>
                    </li>

                {% endfor %}

                {% for p in creditsArrayNoWeight %}

                    <li>
                        <h5>{{ p.title }} ({{ p.date | date: '%Y' }})</h5>
                        <p id="role">{{ p.role }}</p>
                        <p><b>Genre:</b> {{ p.genre }}</p>
                    </li>

                {% endfor %}  

            </ul>
        </section>
        ```

        This will output all the posts in order of the weight variable, from high to low and then display all remaining credits in date order. I used this on a [portfolio website](https://www.ianarber.com/credits) to display the persons film credits - each credit being a different post. Lets dig into this liquid code a bit more...<br /><br />

    Looping: |
        The basics of this is that there are two loops: one for the posts with a weight value (line 5) and one for ones without (line 15). Both will loop through ```site.category.credits``` but there's a conditional statement at the beginning of each loop to check if the weight variable exists (line 6) or if it does not exists (line 16). If the check is true, then the post is added to it's respected array: *creditsArray*, or *creditsArrayNoWeight*

    Array Assignment: |
        Array types aren't native to liquid templating so you have to use the [split filter](https://help.shopify.com/themes/liquid/filters/string-filters#split) to break a single string into an array of substrings. Take the first array for example:

        ```html
        {% assign creditsArray = "" | split: "|"  %}
            <!-- for loop goes here -->
        {% assign creditsArray = creditsArray | sort: 'credits_weight' | reverse %}
        ```

        The *creditsArray* variable is initialised to an empty string. Then, using the '\|' symbol to donate the next liquid command you're asking for the values added to this variable to be seperated with an '\|'. You could have used any symbol for the split command. Change it to a \# and see what happens.<br /><br />

        On the last line, the *sort* command will sort all the post by *credits_weight* order. The reverse switch is used so that the highest weighted post is placed first. Just for clarification, here's an extract from on of the posts front matter:

        ```yaml
        ---
        layout: credit-info
        category: credits
        title: My Name is Lenny
        credit_type: Feature Film
        imdb: http://www.imdb.com/title/tt2024521
        credits_weight: 16
        ---
        ```

        Compared to the other credit posts, a 16 weight is the highest so this appears first on the websites credits page.

    Outputting the Array: |
        Now that all posts are stored and sorted in variables, you have to tell liquid to output them to the HTML document. We now just use a standard for loop to iterate through each of the arrays (line 24-42). In this case I'm outputting them as list elements in an unordered-list.

    Taking this Further: |
        This method only works if someone is updating the *credit_weight* value within the posts markdown files. A great way to improve this would be to pull in a read count value so that when the site is re-built the order of weighted posts reflects the popularity of them.<br /><br />

        >*Google Analytics:* You could use the Google Analytics API for this. Once it's setup for your site you could retrieve the values as part of your sites pre-build process and then insert them into the markdown files. It's an interesting concept that requires a bit more investigating.

        <br />*Note:* I haven't tested this at scale yet as the websites I've used it one only contain a small number of posts. As your posts count grows your site build time will increase if you're looping through all posts on your site. It would be worth testing this approach when using the `--incremental` build switch.
---
