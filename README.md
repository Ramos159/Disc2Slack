# discord2slack
Discord and Slack integrated bot that can communicate with each other to relay and deliver messages across platforms

## To-do
Likely in this order
- Discord.JS set up
- Database (MS SQL?) set up
- Express.js set up
- Bolt Slack Framework set up

## Tentative Database schema 

Users

| ID | DiscordID | SlackID | PreferredChannelID |
|----|-----------|---------|--------------------|
| int| string?   |  string?| string?/null       | 

If a person wants me to dm them notifications, they'll have a null channel id set 


ServerSettings

| ID | ServerID  | Prefix  |
|----|-----------|---------|
| int| string?   |  char   |

