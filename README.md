<p align="center"><img width=12.5% src="/app/images/logo.png"></p>
<p align="center"><img width=60% src="/app/images/logoText.png"></p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

## Basic Overview

Rasa Talk is a Dialog Management tool built on top of Rasa NLU. It was built out of a desire for a open source on premise dialog management system. Originally inspired by Rasa UI inspiration was taken from watson conversation.

## Demo

http://rasa.jackdh.com (User: demo@jackdh.com Pass: demo1234)

![A simple of Rasa Talk](https://github.com/jackdh/RasaTalk/raw/master/internals/images/demo.gif)

## Installation

Either start MongoDB with Rasa NLU docker or host them separately. Make sure to update the .env file with the correct URLS!
```
git clone ...
yarn
yarn start
```

## Up and Running

- Update .env with correct environment variables.
- Create a new user
- Add a new Agent
- Add some intents to the agent
- Add some expressions to the intents.
- Add entities if required.
- Start training the model
- Create a dialog node which is recognised by either and Intent or Regex.
- Populate the rest of the node
- Test it out on the right!

## Features

### Generate Rasa NLU Training Data
- Agents - Create multiple agents to host multiple chatbots from one backend.
- Intents / Expressions - Build multiple varied expressions within the agents either manually or with the variant generator.
- Entities - Create multiple entities with their synonyms.
- Entity insertion - Highlight to insert entities into expressions

### Dialog Management
- Watson Conversation style dialog management.
- Regex based or Intent based recognition.
- Dynamic recognition with multiple Intents or Entities ie: #intent OR @entity
- Smart contextual awareness
- Slot Filling with default slot or prompting
- Multiple and or varied responses.
- Jump to nodes
- Send and use REST API web hooks within nodes.
- Conditional based responses, webhooks, jump to's.
- Save user responses for future use within nodes or API's
- Create quick reply buttons.

### Permission Based Editing
- Role based, Group Based & individual user permissions.
- Create secure user accounts using PassportJS
- Limit user access to certain features within the application.

### Training Rasa
- Convert Intents into training data.
- Accurate entity insertion (Not just search and replace)
- View current training time.
- View models currently in training.

### Built in Chatbot / Rasa parsers
- Ping the Rasa server directly to get a JSON response.
- Test the chatbot directly to see output of dialog management.

### Built with new technology
- Rasa Talk uses the latest React Boilerplate 3.6.0
- Material UI

## Still to come!

### Further Analytics
- Fill out the front dashboard to expand on the simple analytics.

### History
- View user's chats with the chatbot.
- Filter down based on criteria such as Dates, Topics or Intents.

### Small Talk
- Implement simple small talk.

## Todo
- Increase test coverage to 100%.
- Add Travis / Appveyor
- Provide autocomplete options for fields such as nodes.
- Better validation / error notifications.

## Known issues
- Prettier is picking up a non existent issue with spacing.
- Entities are not switching correctly requiring a reload on that page.
- Dashboard analytics need a default value.

## Thanks
@Material-UI
React Boilerplate












