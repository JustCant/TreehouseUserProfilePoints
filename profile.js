//Require https module
const https = require('https');
//Require http module for status codes
const http = require('http');

//Print Error Messages
function printError(error) {
  console.error(error.message);
}

//Function to print message to console
function printMessage(username, badgecount, points) {
  const message = `${username} has ${badgecount} total badge(s) and ${points} points in JavaScript.`;
  console.log(message);
}

function get(username) {
  try {
    //Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      
     if (response.statusCode === 200) {
       let body = "";
        //Read the data
        response.on('data', data => {
          body += data.toString();
        });
        
        response.on('end', () => {
          try {      
            //Parse the data
            const profile = JSON.parse(body);
          
            //Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);  
          } catch (error) {
              printError(error);
          }//end catch
        });//end response.on    
      } else {
          const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
      }//end else
    });//end http.get

  request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
      printError(error);
    }//end catch
}//end getProfile()

module.exports.get = get;