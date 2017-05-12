---
layout: tutorials
title: Customise the Order of a Jekyll Post Loop
category: devbytes
image: assets/images/tutorials/cms-jekyll-contentful/header.jpg
thumbnail: assets/images/50x50.jpg
time: 5 min
heading: By default, Jekyll will organise your posts in date order when looping through them. However you may want, for example, your most popular posts to go first and then the rest organised by date order. In this Dev Byte we'll look at customising the loop order using liquid
tags: [jekyll, blog, liquid]
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

        This will output all your post in date order based on the date in filename of the markdown file. However, by adding an additional yaml front matter variable like *post_weight* you can assign a number to this and tell your liquid template to order by weight first and then date<br /><br />

    Modified Post Loop: |
        Here I've added an additional for loop and some logic to first assign all posts with a *post_weight* value to an array and then all remaining posts to another array in date order. The contents of these will then be outputted to the HTML document:

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

        This will output all your post in date order based on the date in filename of the markdown file. However, by adding an additional yaml front matter variable like *post_weight* you can assign a number to this and tell your liquid template to order by weight first and then date<br /><br />

    Looping: |
        sdfgsadjkigh dfgh dfg
---
