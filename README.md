Through The Stack - Hacking the Stack one Byte at a Time
========================================================
## Overview
My tech blog site focusing on quick tips and tutorials for all elements of the Web Development Stack

* Static website built with [Jekyll](https://jekyllrb.com/)
* [Gulp](https://gulpjs.com/) used to build and bundle assets
* Site hosted on Netlify

## Building the Site
### Prerequisites
* Build on Linux or Windows Subsystem for Linux
* Git, Node v6.9.4 or above, Ruby v2.4 or above, Bundler v1 or above

### Installing
`git clone https://github.com/adesmier/web-adesmier-com.git`

`bundle install`

`npm install`

## Usage
## Deployment
The Jekyll site and assets are built by running various Gulp tasks. That main ones are:

### Default Task
`gulp`
* Used for development
* Compiles SASS, scripts
* Runs the __jekyll-build__ task to compile the site
* Launches BrowserSync to watch files

### Netlify Deploy
`gulp netlify-deploy`
* Builds a production version of the site to deploy on Netlify
* Similar to default task but minifies css/scripts
* Critical CSS is added inline
* BrowserSync not called

### Clean
`gulp clean`
* Removes files from the following directories:
  * assets/css/*.css

## Attributions
<a href="https://www.netlify.com" rel="nofollow" target="_blank"><img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" width="90" hspace="10" alt="Deployed on Netlify" /></a>

## Authors
__Anthony Desmier__ - https://github.com/adesmier


