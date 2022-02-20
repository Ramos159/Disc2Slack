const { App } = require('@slack/bolt');
const { 
  // slackClientID,
  // slackClientSecret,
  slackSigningSecret,
  // slackVerificationToken,
  slackBotToken,
  slackAppToken
} = require('./config');

// eslint-disable-next-line no-unused-vars
async function setupSClient(DClient,UM,UCM){
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

  // eslint-disable-next-line no-unused-vars
  app.message(async({message,say})=>{
    console.log(message);
  });

  await app.start();
  console.log('Slack bot started');
}

module.exports= { setupSClient }; 