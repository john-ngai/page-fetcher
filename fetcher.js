/**
 * CHALLENGE:
 * Implement a node app that downloads the resource at a URL to a local path on your machine.
   * Upon completion, it should print out a message like: Downloaded and saved 1235 bytes to ./index.html.
 * 
 * EXAMPLE:
   * > node fetcher.js http://www.example.edu/ ./index.html
   * Downloaded and saved 3261 bytes to ./index.html
 *
 * ASYNCHRONOUS OPERATIONS:
   * 1. You need to make an http request and wait for the response.
   * 2. After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem.
   * Tip: When you're trying to control the order of asynchronous operations, you can use nested callbacks.
   *
 *  
 * READING DOCUMENTATION:
   * This challenge requires you to search for some answers online:
     * https://nodejs.dev/learn/writing-files-with-nodejs
     * Note: You may find a function in the Node documentation called writeFileSync. It is considered bad practice to use sync versions of functions that ought to be async. Please avoid it.
   * How can you get the file size?
     * There are a couple of ways. If you dig into Node's documentation, you'll find there is a way to get statistics about a file that is sitting on your file system. However, you may not need to do that if you think about the fact that 1 character is equal to 1 byte.
 *
 * OTHER TIPS:
   * Install and use the request library to make the HTTP request.
   * Use Node's fs module to write the file.
   * Use the callback-based approach we've been learning so far.
   * DO NOT use the pipe function.
   * DO NOT use synchronous functions.
 * 
*/

const request = require('request');
const fs = require('fs');

const inputs = process.argv.slice(2);

if (inputs.length !== 2) {
  console.log('\nError - Input Limit Exceeded:\nPlease input a valid URL and file path\ne.g. > node fetcher.js node fetcher.js http://www.example.edu/ ./index.html\n');
}

let url = '';
let filePathName = '';

for (let i = 0; i < 2; i++) {
  if (i === 0) {
    url += inputs[i];
  }
  if (i === 1) {
    filePathName += inputs[i];
  }
}

request(url, (error, response, body) => {

  fs.writeFile(filePathName, body, error => {
    /*if (error) {
      console.log(error);
      return;
    }*/

    fs.stat(filePathName, (error, stats) => {
      /*if (error) {
        console.log(error);
        return;
      }*/
      console.log('Downloaded and saved', stats['size'].toString(), 'bytes to ' + filePathName + '.');
    });
  });
});
