# discord2slack
Discord and Slack integrated bot that can communicate with each other to relay and deliver messages across platforms

## To-do
Likely in this order
- Discord.JS set up
- Database (MS SQL?) set up
- Express.js set up
- Bolt JS Slack Framework set up

## Tentative Database schema 

Users

| ID | DiscordID | SlackWorkspaceID | IgnoreChannelIDs   |
|----|-----------|------------------|--------------------|
| int| string?   |  string?         | string?/null       |

<!-- we took out display channels for now -->
ServerSettings

| ID | ServerID  | Prefix  |
|----|-----------|---------|
| int| string?   |  char   |

For anyone who doesn't want a DM notifs will go into the specified channel

## Tentative command tree

- slack 
  - add
    - workspaceid
    - ignorechannel
  - remove
    - workspaceid
    - ignorechannel

<!-- - discord 
  - enable (admin)
    - displaychannel
  - set (admin)
    - displaychannel
  - remove (admind)
    - displaychannel -->
  

