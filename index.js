'use strict';


// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  reg_code = JSON.parse(require('./region.json')),
  app = express().use(bodyParser.json()); // creates express http server

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      let sender_psid = webhookEvent.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      if (webhookEvent.message) {
        handleMessage(sender_psid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(sender_psid, webhookEvent.postback);
      }

    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "rrrr1234";

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

 // Check if the message contains text
/* if (received_message.text) {

   // Create the payload for a basic text message
   response = {
     "text": `You sent the message: "${received_message.text}". Now send me an image!`
   }
 } */

 // Get the URL of the message attachment
   //let attachment_url = received_message.attachments[0].payload.url;
   response = {
      "attachment": {
        "type": "template",
        "payload": {
        "template_type": "list",
        "top_element_style": "large",
        "elements": [
          {
            "title": "優質綠建築近捷運水岸公園第一排",
            "image_url": "https://hp2.591.com.tw/house/active/2017/11/17/151089679252580809_210x158.crop.jpg",
            "subtitle": "台北租屋,文山租屋,整層住家出租,優質綠建築近捷運水岸公園第一排",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5860317.html"

            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5860317.html"
              }
            ]
          },
          {
            "title": "萬利街近萬芳捷運7分鍾",
            "image_url": "https://www.591.com.tw/images/index/house/newVersion/noImgBigNew.png",
            "subtitle": "台北租屋,文山租屋,整層住家出租,萬利街近萬芳捷運7分鍾",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5899050.html"
            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5899050.html"
              }
            ]
          },
          {
            "title": "温馨時尚大套房",
            "image_url": "https://hp1.591.com.tw/house/active/2017/12/01/151210066602924201_210x158.crop.jpg",
            "subtitle": "台北租屋,文山租屋,獨立套房出租,温馨時尚大套房",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5847118.html"
            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5847118.html"
              }
            ]
          },
          {
            "title": "温馨時尚大套房",
            "image_url": "https://hp1.591.com.tw/house/active/2017/12/01/151210066602924201_210x158.crop.jpg",
            "subtitle": "台北租屋,文山租屋,獨立套房出租,温馨時尚大套房",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5847118.html"
            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5847118.html"
              }
            ]
          }
        ]
      }
      }
    }

 // Sends the response message
 callSendAPI(sender_psid, String(reg_code[1].reg[1].name));
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!');
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}
