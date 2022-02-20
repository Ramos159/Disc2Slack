# Disc2slack
Discord and Slack integrated bot that can communicate with each other to relay and deliver messages across platforms

## To-do
Likely in this order
- Discord.JS set up
  - Embeds for commands
- Database set up
  - Done for now✅
- Bolt JS Slack Framework set up
  - set up event listener and discord message handler

Bonus:
- Refactor discord events and interactions into a discord events folder
- Add channel events and groups events from slack

## Tentative Database schema 

Users

| ID | DiscordID |
|----|-----------|
| int| text      |   

<!-- we took out display channels for now -->

UserChannels
|     ID      | UserDiscordID | SlackChannelID |
|-------------|---------------|----------------|
|     int     |    text       |  text          | 

For anyone who doesn't want a DM notifs will go into the specified channel

## Tentative command tree
for discord bot:
- slack 
  - addchannel
  - removechannel
  - listchannels

<!-- - discord 
  - enable (admin)
    - displaychannel
  - set (admin)
    - displaychannel
  - remove (admind)
    - displaychannel -->
  

