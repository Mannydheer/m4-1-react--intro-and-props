# Module 4.1 Intro to React and Props

## Setup

This workshop uses **Create React App**, a project from Facebook designed to make it easy to get started building a React application.

It comes with a full build system, and very little boilerplate. We will learn more about this system in the future, but for now we'll focus on using it, not understanding how it works.

Open a terminal, and `cd` into the same directory that this README lives in. Then run:

```bash
yarn install
```

```bash
yarn start
```

The first command installs the third-party dependencies (like React), and the second command starts a development server.

It works similarly to `nodemon` - when you save a file, it should auto-restart, and you can refresh your page to see the latest code.

## Understanding the files

The directory structure of this project is on the left, and looks like:

```
├── __lecture
├── __solution
├── public
│   ├── assets
│   │   └── [images]
│   └── index.html
├── src
│   ├── components
│   │   └── [component js and css]
│   ├── data.js
│   ├── index.js
│   └── styles.css
└── package.json
```

`package.json` is a **manifest** of our project and its dependencies. We _don't need to edit it_ for this workshop.

`public` contains static files, like our output index.html and some image assets. We _don't need to edit anything in here_ either!

Finally, `src` is where all the good stuff lives.

To bootstrap this workshop, we've created several JS and CSS files:

```
├── components
│   ├── App.css
│   ├── App.js
│   ├── ChatStream.css
│   ├── ChatStream.js
│   ├── Footer.css
│   ├── Footer.js
│   ├── Header.css
│   └── Header.js
├── data.js
└── index.js
```

`data.js` includes all the information we need about who our chat participants are, and what messages they've sent. It also tells us who the "currentUser" is.

`App.js` is our top-level component, the very top of the tree. It receives data as props, and renders the main chunks of our UI, including a Header, Footer, and ChatStream (the middle section that holds all the chat bubbles).

`styles.css` includes _global_ styles. You probably don't need to edit this file; all the other CSS you add should go in the other CSS files.

`components` holds our set of components, with 1 JS and 1 CSS file per component. If we want to style the Header component, we'd put those styles in `Header.css`.

Our initial state gives us a loose structure, but very little in the way of UI:

![blank page with subtle gray header](./__lecture/assets/initial-state.png)

Your job will be to build this out, using the structure provided!

# Application structure

If we check `src/index.js`, we find the "top" of the React tree:

```jsx
ReactDOM.render(
  <App currentUser={data.currentUser} conversation={data.conversation} />,
  rootElement
);
```

We're rendering the `App` component, and we're setting its props to:

```js
{
  currentUser: data.currentUser,
  conversation: data.conversation,
}
```

This data is defined in `src/data.js`. It's some fake data we can use to populate our app, a reimagined conversation from the 90s sitcom, [Seinfeld](https://www.imdb.com/title/tt0098904/).

Our `App` component, in `src/components/App.js`, renders the following:

```jsx
<div className="wrapper">
  <Header />
  <ChatStream />
  <Footer />
</div>
```

We can also see that we import an `App.css`, which adds a bit of styling:

```css
.wrapper {
  font-family: sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

Right now, our application doesn't do much. Your job will be to take the props given to `App` - `currentUser` and `conversation` - and render out the appropriate things!

# Exercises

## 1. Render messages

First, let's verify that we have the data we need. In `App.js`, let's log out the props we're given:

```diff
function App(props) {
+ console.log(props);
  return (
    <div className="wrapper">
      <Header />
      <ChatStream />
      <Footer />
    </div>
  );
}
```

When we open the developer tools, we can see our console being logged:

![Logged props in developer console](./__lecture/assets/app-console-log.png)

We want to use the `ChatStream` component to render all the messages, and it looks like the data we'll need is `props.conversation.messages`. Let's thread this through:

```jsx
<ChatStream messages={props.conversation.messages} />
```

In our `src/data.js` file, we see that the `messages` array takes this shape:

```js
[
  {
    user: users.elaine,
    body: 'How about you bring me back something?',
    timestamp: '11:38',
  },
  /* ...lots more like this */
];
```

Let's start by trying to render all of the "body" values. Take a moment and try to solve this on your own, using `map`.

.

..

...

....

.....

......

.......

......

.....

....

...

..

.

We can solve this by mapping over the `messages` prop we provided to `ChatStream`. Inside the `ChatStream` component, add this code:

```js
return (
  <section className="chat-stream">
    {props.messages.map(message => {
      return <div>{message.body}</div>;
    })}
  </section>
);
```

If we do this, we should get something that looks like this:

![raw messages being mapped](./__lecture/assets/raw-message-bodies.png)

Not pretty, but we're off to a great start! We're funneling the data we need through our application, and using it in the right place!

### Troubleshooting

##### `TypeError: Cannot read property 'map' of undefined`

If you're seeing this error, it likely means you forgot to pass `messages` to `ChatStream`. Make sure that in `App.js`, you're passing the data along:

```diff
function App(props) {
  return (
    <div className="wrapper">
      <Header />
-      <ChatStream />
+      <ChatStream messages={props.conversation.messages} />
      <Footer />
    </div>
  );
}
```

Creating React elements (eg. `<ChatStream>`) is like calling a function, and props are like the _arguments_ for that function. If we don't give the component the props that it needs, it will crash, in the same way as calling a function without passing it the arguments it needs.

## 2: Creating a `ChatMessage` component

In the "drawing boxes" exercise in class, we learned that repeated chunks of markup should be components.

In the iMessage screenshot, it seems like each message should be its own component! Let's create one.

Create two new files, `src/ChatMessage.js` and `src/ChatMessage.css`. Write the following into the .js file

> **Please no copy/paste!** You'll write _a lot_ of new components over this module. It's worth taking the time to get used to writing them out.

```js
import React from 'react';

import './ChatMessage.css';

function ChatMessage(props) {
  return <div className="chat-message"></div>;
}

export default ChatMessage;
```

> You may be wondering: Why do I need to `import React from 'react';`? We aren't using it anywhere!
>
> In fact, we are; that `<div>` getting rendered will be compiled by babel into a `React.createElement()` call. It's being used behind the scenes!

Inside `ChatStream`, we're mapping through each message in the array. Pass that message along to each `ChatMessage` instance:

```jsx
// Inside `ChatStream`
{
  props.messages.map(message => {
    return <ChatMessage message={message} />;
  });
}
```

Next, update the `ChatMessage` component to render:

- The message body
- The user's name
- The user's avatar

Add some styles to make it look sorta like iMessage. **For now, every message can have the same styles**. You don't need any blue message bubbles, only grey.

After styling, you should wind up with something that looks like this:

How you structure this exactly is up to you, but you should wind up with something similar to this image:

![message list with some styling](./__lecture/assets/exercise-2-result.png)

It's up to you how to structure the HTML content of `ChatMessage`, which CSS properties to use.

## 3. Differentiating "my" messages

In iMessage, the messages that _you_ send don't look the same as messages that others send:

![real iMessage screenshot](./__lecture/assets/real-imessage-screenshot.jpg)

Specifically, these things are different:

- Blue background, white text
- Aligned to the right, not the left
- No username and avatar shown

Inside `data.js`, there's a field, `currentUser`. This tells us which user is the one "logged in". We can use this to determine which messages were sent by our user.

Update your app so that messages sent by the current user match that screenshot.

.

..

...

....

.....

......

.......

......

.....

....

...

..

.

First, we need to pass the `currentUser` data down through props.

Our `App` component, the top of our React tree, has a `currentUser` prop (passed in `src/index.js` from `src/data.js`). This means that within `App`, we can access it by writing `props.currentUser`.

We aren't yet passing it down to `ChatStream`, so let's add that:

```diff
function App(props) {
  return (
    <div className="wrapper">
      <Header />
-      <ChatStream messages={props.conversation.messages} />
+      <ChatStream
+        messages={props.conversation.messages}
+        currentUser={props.currentUser}
+      />
      <Footer />
    </div>
  );
}
```

Next, let's update our `ChatStream` component to use this new prop to figure out if each message was sent or received by the current user:

```diff
function ChatStream(props) {
  return (
    <section className="chat-stream">
      {props.messages.map(message => {
+       let messageType;
+       if (message.user === props.currentUser) {
+         messageType === 'sent';
+       } else {
+         messageType === 'received';
+       }
+
-        return <ChatMessage user={message.user} body={message.body} />;
+        return (
+          <ChatMessage
+            user={message.user}
+            body={message.body}
+            messageType={messageType}
+          />
+        );
      })}
    </section>
  );
}
```

To explain this snippet: we're iterating through each of our messages. The first one looks like this:

```js
{
  user: users.elaine,
  body: "How about you bring me back something?",
  timestamp: "11:38"
}
```

When we compare `message.user`, we're looking at `users.elain`, and comparing it to `props.currentUser`, which is _also_ `users.elaine`. Both variables are references to the same object! Therefore, they are equal.

If the message's author is the same person as the currently-logged-in user, that means that this message was _sent_; Elaine wrote this message and then sent it to George and Jerry.

The next message in our list is this one:

```js
{
  user: users.george,
  body: "Sure, alright",
  timestamp: "11:39"
}
```

This time, `message.user` does _not_ equal `props.currentUser`, and so the `messageType` gets sent to `received`; Because Elaine didn't write the message, she must have received it.
---


Next, we need to update our `ChatMessage` component to do something with this new `messageType` prop.

There are multiple ways to do this, but IMO the simplest is to create two separate components, and pick the appropriate one for the given prop.

Here's our new `ChatMessage` component:

```jsx
function ChatMessage(props) {
  if (props.messageType === 'sent') {
    return <SentMessage message={props.message} />;
  } else {
    return <ReceivedMessage message={props.message} />;
  }
}
```

This component doesn't really define any UI of its own; instead, it delegates to two new components, `SentMessage` and `ReceivedMessage`.

These components don't exist yet, so we need to create them. Feel free to create them in the same file, you don't need to create a new file for every single component you create.

The rest of this problem is left as an exercise for you to solve. You should wind up with UI that looks approximately like this:

![sent/received styles](./__lecture/assets/exercise-3-result.png)

---

# Stretch goals

### 1. Add bubble tips

In iMessage, the chat bubbles have little tips, to make them look like speech bubbles in a comic book:

![sent/received styles](./__lecture/assets/exercise-3-with-tips.png)

Two images are made available in the `public/assets` folder

- `tip-sent.svg`
- `tip-received.svg`

Use an `<img>` tag to add these to the ChatMessage components. _TIP_: the `src` attributes will be "/assets/tip-sent.svg" and "/assets/tip-received.svg".

### 2. Participant list

In the header, it would be great to show the chat participants, _not including_ the current user. Given that the current user is Elaine, your header should look like this:

![header with George/Jerry avatars](./__lecture/assets/stretch-header.png)

You'll need to use `filter` to get the chat participants who _aren't_ the current user, and `map` to render their faces along the top.

_BONUS_: We now have chat avatars in two places: In the ChatStream, before received messages, and in the header. Create an `Avatar` component which takes two props, `src` and `size`, and update both spots to use that component.

### 3. Footer

To round out the UI, we should add a text input along the bottom. This input will be purely decorative, it won't be able to send new messages.

The most interesting part of the footer is that it blurs the items before it; notice how it glows blue when a sent message passes behind it:

![blurry footer](./__lecture/assets/stretch-blurry-footer.gif)

(The GIF compression makes this look like a hot mess; hopefully, your solution will look nicer!)

To achieve this effect, look up the `backdrop-filter` CSS attribute.

### 4. Side-by-side

One of the most powerful things about React is that by changing some input props, you can get an entirely different output. For example, check out what happens when we change `currentUser` in `src/data.js` to `users.george`:

```diff
export default {
- currentUser: users.elaine,
+ currentUser: users.george,
  conversation: {
    participants: [users.elaine, users.george, users.jerry],
```

Now, the entire conversation updates to show things from George's point of view:

![as George](./__lecture/assets/stretch-different-user.png)

Update the app to render two copies of `<App>`, side-by-side. Give each copy a different `currentUser` prop, so that you can show two conversations at once:

![side-by-side](./__lecture/assets/stretch-side-by-side.png)

---

# Stretch Workshop: Google Hangouts chat

There are many different chat applications. Here's a screenshot of Google Hangouts chat:

![Hangouts chat](./__lecture/assets/hangouts.jpg)

Your mission, should you choose to accept it: take the lessons you've learned from creating iMessage, and use them to recreate this screenshot of Hangouts.

There are quite a few differences:

- There's a list of conversations on the left-hand sidebar. Our data file only has 1 conversation. You can choose to simply have a single conversation in the sidebar, or create more fake data
- A green bar along the top shows the current user's name, as well as the name of the chat (in this screenshot it's Marketing Team, but in your app, it could be a comma-separated list of the other participants)
- Totally different styling
- Photos can be part of messages

It's likely that you won't have time to make this a perfect clone, so feel free to focus on whichever elements you're most interestd in.

To get an initial setup, you can either:

- Clone the repository again, and use the fresh "workshop" folder
- Check out another git branch, and work in that branch
