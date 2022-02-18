# discord2slack
Discord and Slack integrated bot that can communicate with each other to relay and deliver messages across platforms

## To-do
Likely in this order
- Discord.JS set up
  - complete slack commands
- Database (MS SQL?) set up
  - the whole thing
- Bolt JS Slack Framework set up
  - set up event listener and discord message handler

## Tentative Database schema 

Users

| ID | DiscordID | SlackWorkspaceID?| channelIDs|
|----|-----------|------------------|-----------|
| int| string?   |  string?         |string/null|

<!-- we took out display channels for now -->
ServerSettings

| ID | ServerID  | Prefix  |
|----|-----------|---------|
| int| string?   |  char   |

For anyone who doesn't want a DM notifs will go into the specified channel

## Tentative command tree

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
  

