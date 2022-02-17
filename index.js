/* eslint-disable no-unused-vars */
const { fork } = require('child_process');
const { setupSClient } = require('./modules/slack');

function setupDiscordProcess(Process){
  Process.on('message',(message)=>{
    console.log(message);
  });
}

// since its blocking maybe doesnt accept Process.send()?
// might have to use express after all.
const DiscordProcess = fork('./modules/discord.js');
setupDiscordProcess(DiscordProcess);
console.log('process set up')
DiscordProcess.send('Hello!');
setupSClient(DiscordProcess);


// try just jamming these together in one file
// slack bot should have access to the discord bot client to send messages back
// discord bot doesnt need slack functionality so just have them together