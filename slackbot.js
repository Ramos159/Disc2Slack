/* eslint-disable no-unused-vars */
// will hold Bolt Slack
const { App } = require('@slack/bolt');
const { 
  // slackClientID,
  // slackClientSecret,
  slackSigningSecret,
  // slackVerificationToken,
  slackBotToken,
  slackAppToken
} = require('./config');

async function setupSClient(DProcess){
  const app = await new App({
    appToken:slackAppToken,
    // clientSecret:slackClientSecret,
    // clientId:slackClientID,
    signingSecret:slackSigningSecret,
    token:slackBotToken,
    socketMode:true,
    // port:3000
  });

  // app.event('member_joined_channel',async ({event,client,logger})=>{
  //   // do something when someone joins a channel
  // });

  app.message(async({message,say})=>{
    console.log(message);
  });

  await app.start();
  console.log("Slack bot started");
}

module.exports= { setupSClient }; 