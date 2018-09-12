<p align="center"><img width=12.5% src="/app/images/logo.png"></p>
<p align="center"><img width=60% src="/app/images/logoText.png"></p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<h2 align="center">Basic Overview</h2>

Rasa Talk is a Dialog Management tool built on top of Rasa NLU. It was built out of a desire for a open source on premise dialog management system. Originally inspired by Rasa UI inspiration was taken from watson conversation.

Rasa Talk can be used as just a training data generator but can also hook your chatbot up to Facebook/Skype/Slack whatever!

Feel free to message me on [![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/RasaTalk/Lobby)

<h2 align="center">Demo</h2>

 [https://www.talk.jackdh.com](http://www.talk.jackdh.com) (User: demo@jackdh.com Pass: demo1234)
 
<p align="center">
<img src="https://user-images.githubusercontent.com/1907451/43040505-2d57dc30-8d3d-11e8-9bb9-8ac65bf48a67.gif" alt="" height="500" />
<p>
<h2 align="center">Installation</h2>

**Prerequisites**

 - Database: [Mongodb](https://www.mongodb.com/) - You can run this locally or online like [mlab](https://mlab.com/)
 - Chatbot Brain: [Rasa NLU](https://rasa.com/docs/nlu/) - I reccommend running with [Docker](https://hub.docker.com/r/rasa/rasa_nlu/)

```
git clone https://github.com/jackdh/RasaTalk/
Rename example.env to '.env'
Update the variables to include your MongoDB server IP and Rasa NLU IP.
yarn
yarn start
```

**Or view https://github.com/jackdh/RasaTalk/wiki/Setup for a more detailed setup guide**

<h2 align="center">Up and Running</h2>


* Update .env with correct environment variables.
* Create a new user
* Add a new Agent
* Add some intents to the agent
* Add some expressions to the intents.
* Add entities if required.
* Start training the model
* Create a dialog node which is recognised by either and Intent or Regex.
* Populate the rest of the node
* Test it out on the right!

<h2 align="center">Features</h2>

<h3>Facebook / Skype / Third parties.</h3>
<p align="center">
  <img height="300" src="https://user-images.githubusercontent.com/1907451/43543637-86c5a2b4-95c8-11e8-9e92-3d7e7196e333.png" alt="Third Party Intregration" /> 
<p>
Due to the constumisable nature of RT it's possible to hook it up to practically any third party chatbot you'd like. For starters I've included a quick example of how you might use [Botkit](https://github.com/howdyai/botkit) as a middleware to get to Facebook

Currently Facebook has been enabled with Slack and many more still to come!

<h3>Generate Rasa NLU Training Data</h3>

* Agents - Create multiple agents to host multiple chatbots from one backend.
* Intents / Expressions - Build multiple varied expressions within the agents either manually or with the variant generator.
* Entities - Create multiple entities with their synonyms.
* Entity insertion - Highlight to insert entities into expressions

<p align="center">
<img height="240" src="https://user-images.githubusercontent.com/1907451/43040681-12e4def2-8d42-11e8-8347-c73babe072fb.gif" alt="Quickly add training data with entities" />
<p>
<h3>Dialog Management</h3>

* Watson Conversation style dialog management.
* Regex based or Intent based recognition.
* Dynamic recognition with multiple Intents or Entities ie: #intent OR @entity
* Smart contextual awareness
* Slot Filling with default slot or prompting
* Multiple and or varied responses.
* Jump to nodes
* Send and use REST API web hooks within nodes.
* Conditional based responses, webhooks, jump to's.
* Save user responses for future use within nodes or API's
* Create quick reply buttons.

<p align="center">
<img height="240" src="https://user-images.githubusercontent.com/1907451/43543931-5ea59d7e-95c9-11e8-833c-c4208a7fc38e.gif" alt="Dialog management" />
  <img height="240" src="https://user-images.githubusercontent.com/1907451/43544032-abe3743a-95c9-11e8-9f8a-228c15458389.gif" alt="Updating Nodes" />
<p>



<h3>Permission Based Editing</h3>

* Role based, Group Based & individual user permissions.
* Create secure user accounts using PassportJS
* Limit user access to certain features within the application.
<p align="center">
<img height="240" src="https://user-images.githubusercontent.com/1907451/43040787-bff04ca6-8d44-11e8-859c-29e3b3e9ac64.gif" alt="Fine grain permission control" />
<p>
<h3>Training Rasa</h3>

* Convert Intents into training data.
* Accurate entity insertion (Not just search and replace)
* View current training time.
* View models currently in training.
<p align="center">
<img height="400" src="https://user-images.githubusercontent.com/1907451/43040796-0e81f7c0-8d45-11e8-8147-b461e19aa849.gif" alt="Generate, download & train Rasa UI." />
<p>
<h3>Built in Chatbot / Rasa parsers</h3>

* Ping the Rasa server directly to get a JSON response.
* Test the chatbot directly to see output of dialog management.
<p align="center">
<img width="165" src="https://user-images.githubusercontent.com/1907451/43040806-8f3aad62-8d45-11e8-9d95-7b7e72ef3fb7.gif" alt="Directly see NLU results and chatbot outputs." />
<p>
<h2 align="center">Still to come!</h3>


<h3>Further Analytics</h3>

* Fill out the front dashboard to expand on the simple analytics.

<h3>History</h3>

* View user's chats with the chatbot.
* Filter down based on criteria such as Dates, Topics or Intents.

<h3>Small Talk</h3>

* Implement simple small talk.

<h3>Todo / Help requested!</h3>

* Increase test coverage to 100%.
* Add Travis / Appveyor
* Provide autocomplete options for fields such as nodes.
* Better validation / error notifications.
* Add rename option for intents / expressions
* Add backup option for node / training data.
* Add sockets for chat as well as update notifications.

<h3>Known issues</h3>

* Prettier is picking up a non existent issue with spacing.
* Dashboard analytics need a default value.

<h3>Thanks</h3>

@Material-UI
React Boilerplate












