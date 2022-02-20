const { App } = require('@slack/bolt');
const { createSlackEmbed } = require('./helpers/slackembed');
const { 
  // slackClientID,
  // slackClientSecret,
  slackSigningSecret,
  // slackVerificationToken,
  slackBotToken,
  slackAppToken
} = require('./config');


async function getDiscordIds(chId,UM,UCM){
  const users = await UCM.findAll({
    attributes:['UserId'],
    where:{ChannelId: chId},
    include:[{
      model:UM,
      required:true
    }]
  });

  return users.map(user=>user.User.dataValues.DiscordId);
}

// eslint-disable-next-line no-unused-vars
async function setupSClient(DClient,UM,UCM){
  const app = new App({
    appToken:slackAppToken,
    // clientSecret:slackClientSecret,
    // clientId:slackClientID,
    signingSecret:slackSigningSecret,
    token:slackBotToken,
    socketMode:true,
    // port:3000
  });

  // app.event('team_join', async ({ event, client, logger }) => {
  //   console.log(event);
  // });


  app.message(async ({ message }) => {
    const user = await app.client.users.info({token:slackBotToken,user:message.user});
    const text = message.text;
    const channel = await app.client.conversations.info({token:slackBotToken,channel:message.channel});
    const workspace = await app.client.team.info({token:slackBotToken,channel:message.channel});
    const chatLink = await app.client.chat.getPermalink({token:slackBotToken,channel:message.channel,message_ts:message.ts});
    const embed = createSlackEmbed(DClient,text,user.user.name,user.user.profile.display_name,channel.channel.name,workspace.team.name,chatLink.permalink);

    const discordIDs = await getDiscordIds(channel.channel.id,UM,UCM);


    discordIDs.forEach(async id=>{
      const user = await DClient.users.fetch(id);

      try{
        const slackfiles = message.files;
        if(slackfiles.length > 0){
          embed.setFooter({text: 'Files attached with the message will appear below'});
        }
        await user.send({embeds:[embed]});
        slackfiles.forEach(async file=>{
          await user.send(file.permalink);
          });
          return;
      }catch(err){
        //pass
      }
      await user.send({embeds:[embed]});
    });
    
  });
  
  // app.event('channel_created', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('channel_deleted', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('channel_rename', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('channel_archive', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('channel_unarchive', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('member_joined_channel', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('member_left_channel', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('file_public', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('file_deleted', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('file_unshared', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('file_change', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('pin_added', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  // app.event('team_rename', async ({ event, client, logger }) => {
  //   console.log(event);
  // });

  await app.start();
  console.log('Slack bot started');
}

module.exports= { setupSClient }; 