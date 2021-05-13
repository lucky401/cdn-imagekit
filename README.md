# Express + ImageKit.io Node.js SDK

[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)](https://cdn-imagekit.herokuapp.com/auth)
[![Known Vulnerabilities](https://snyk.io/test/github/lucky401/cdn-imagekit/badge.svg)](https://snyk.io/test/github/lucky401/cdn-imagekit)

This is a starter CDN with [Imagekit.io](https://docs.imagekit.io) powered by [Express](https://expressjs.com/)

ImageKit Node.js SDK allows you to use [image resizing](https://docs.imagekit.io/features/image-transformations), [optimization](https://docs.imagekit.io/features/image-optimization), [file uploading](https://docs.imagekit.io/api-reference/upload-file-api) and other [ImageKit APIs](https://docs.imagekit.io/api-reference/api-introduction) from applications written in server-side JavaScript.

##### Table of contents
* [Installation](#installation)
* [Initialization](#initialization)
* [Client Usage](#client-usage)

## Installation
1. Clone this repo
2. run `npm install`
3. run `npm run dev` for development
4. run `npm start` for production

## Initialization
1. rename `nodemon.example.json` to `nodemon.json`
2. edit with your imagekit.io key

```json
{
  "env": {
    "IMAGEKIT_URL_ENDPOINT": "YOUR_IMAGEKIT_URL_ENDPOINT",
    "IMAGEKIT_PUBLIC_KEY": "YOUR_IMAGEKIT_PUBLIC_KEY",
    "IMAGEKIT_PRIVATE_KEY": "YOUR_IMAGEKIT_PRIVATE_KEY"
  }
}
```

## Client Usage

```html
form action="#" onsubmit="upload()">
	<input type="file" id="file1" />
	<input type="submit" />
</form>
<script type="text/javascript" src="../dist/imagekit.js"></script>

<script>
    /* 
        SDK initilization
        
        authenticationEndpoint should be implemented on your server 
        as shown above 
    */
    var imagekit = new ImageKit({
        publicKey : "your_public_api_key",
        urlEndpoint : "https://ik.imagekit.io/your_imagekit_id",
        authenticationEndpoint : "https://www.yourserver.com/auth"
    });
    
    // Upload function internally uses the ImageKit.io javascript SDK
    function upload(data) {
        var file = document.getElementById("file1");
        imagekit.upload({
            file : file.files[0],
            fileName : "abc.jpg",
            tags : ["tag1"]
        }, function(err, result) {
            console.log(arguments);
            console.log(imagekit.url({
                src: result.url,
                transformation : [{ height: 300, width: 400}]
            }));
        })
    }
</script>
```
