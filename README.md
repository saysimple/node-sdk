# SaySimple SDK for JavaScript

We’re Saysimple — the Messaging Platform Pioneer — and we’re on a mission to 
change customer service centers into commercial profit centers. We’re turning 
social messaging channels that are used for personal communication into 
powerful communication channels for any kind of business, providing 
conversational excellence with unrivaled ease.

And this, is our SDK for JavaScript for you.

## Installation 
**For NPM**
```
npm i @saysimple/node-sdk
```

**For Yarn**
```
yarn add @saysimple/node-sdk
```

## Usage 
### API Documentation 📑
The SDK is a one-on-one translation of the native REST API, which can be found here.   
You can get a more in-depth knowledge of the API and the possible parameters if
you read the [API documentation](https://api.saysimple.io/docs). 

### Intelligence V1 👩🏻‍🔬

**Initialization**
```javascript
const SaySimpleClient = require("@saysimple/node-sdk");
const Intelligence = SaySimpleClient.Intelligence.V1("[API TOKEN]", "[SECRET KEY]");
// Or:
const Intelligence = SaySimpleClient.Intelligence.Latest("[API TOKEN]", "[SECRET KEY]");  
```
*If you omit a secret key, the SDK will assume you put a valid access token 
directly on the first parameter.*

**Functions**

| Function | Parameters |
|----------|------------|
| addMessage | See [**Add A Message** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/postMessage) |
| getMessagesSummed | See [**Total Messages Summed** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getTotalMessagesSummed) |
| getActiveContactsSummed | See [**Total Active Contacts** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getTotalActiveContacts) |
| getSendPaidTemplatesSummed | See [**Total Paid Templates Send** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getTotalPaidTemplatesSend) |
| getAgents | See [**List Agents** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getAgents) |
| getChannels | See [**List Channels** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getChannels) |
| getConversationsResolved | See [**Get Converasations Resolved** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getConversationsResolved) |
| getConversationsResolveTimesAverage | See [**Get Conversations Resolve Times Average** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getConversationsResolveTimesAverage) |
| getConversationsResolveTimesMedian | See [**Get Conversations Resolve Times Median** in the API Docs](https://api.saysimple.io/docs/intelligence/#operation/getConversationsResolveTimesMedian) |

To get all messages summed you can run the following code
```javascript
const SaySimpleClient = require("@saysimple/node-sdk");
const Intelligence = SaySimpleClient.Intelligence.V1("[API TOKEN]", "[SECRET KEY]");

(async () => {
    const messagesSummed = await Intelligence.getMessagesSummed({
        agent: "agent@teddies.com"
    });

    console.log(messagesSummed);
})();
```

That's it! 🚀

## Messaging V1 💌

_Will be implemented as soon as possible.  
For now please refer to the [API documentation](https://api.saysimple.io/docs/messaging)._

## Showcasing 🎭

We are really keen to know what you build with SaySimple, so please do let us
know when your project is up-and-running! 

## TypeScript support ⌨️
This package exports type declarations, thus it can be used in TypeScript 
projects without requiring extra dependencies.

## Support 🧞
We tried to make the API and SDK as easy as possible, but maybe we didn't
succeed on every aspect of it. Please don't hesitate to contact us if something
is not working or is unclear.

You can reach us at: [support@saysimple.nl](mailto:support@saysimple.nl).

## Raising an issue 🤕
If you encounter a bug in this software we'd love to hear about it. So we can
work on improving our SDK, and your developer experience. 

Please be sure you've searched for the same problem in the tickets opened 
already. Also, it would be helpful if you can provide as many details as possible.
Like the versions of the SDK and Node.js and how your (environment) set up is.

## License 🕵🏽‍♀️
This software is distributed under the Apache License 2.0 license. See [LICENSE.txt](./LICENSE.txt).

Copyright 2019 - 2020 Just Internet B.V. or its affiliates. All Rights Reserved.
