/* eslint-disable no-unused-vars */
const { setupSClient } = require('./slackbot');
const { setupDClient } = require('./discordbot');

const DClient  = setupDClient();
const SClient = setupSClient(DClient);



// try just jamming these together in one file
// slack bot should have access to the discord bot client to send messages back
// discord bot doesnt need slack functionality so just have them together