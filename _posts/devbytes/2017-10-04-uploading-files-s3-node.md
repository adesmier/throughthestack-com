---
layout: devbytes
title: Uploading Multiple Files to S3 using Node.js
category: devbytes
image: assets/images/posts/devbytes/multiple-file-s3-upload/header.jpg
thumbnail: assets/images/posts/devbytes/multiple-file-s3-upload/header.jpg
time: 10 min
comments: true
heading: The AWS S3 javascript SDK provides methods that allow you to upload files directly to an S3 bucket. Coupling this with the Node Async library will allow you to upload multiple files asynchronously.
tags: [javascript, node, aws, s3, async]
sections:
    Prerequisites: |
        >This is the Devbyte - much shortened version - of a data migration project I developed and talked about that uses these methods to upload files to s3. Below are my findings from this project on ways you can successfully upload multiple files to s3.

        We'll be writing our application in Node.js (v6.9.4) and using the AWS and Async npm modules so make sure you have these installed.

    What is Async?: |
        There are many great responses to this question that provide explanations and examples of synchronous and asynchronous actions in Node. As this isn't the main focus of this article, I'll cover this briefly here by saying that asynchronous actions, in the context of Node, mean actions that start before the previous action has finished.

        An 'action' could be something like reading a file from a disk and outputting it's contents to the console. If you we're to do something like this:

        ```javascript
        var fs = require('fs');

        var fileContents = fs.readFile('myfile.txt');
        console.log('Contents of file is: ' + fileContents);


---
