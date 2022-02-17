/* eslint-disable no-unused-vars */
// will hold Bolt Slack
const { 
  slackAppID,
  slackClientID,
  slackClientSecret,
  slackSigningSecret,
  slackVerificationToken
} = require('../config');

function setupSClient(DProcess){
  DProcess.send("test message");
}

module.exports= { setupSClient }; 