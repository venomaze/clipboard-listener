# clipboard-listener

> Node.js event listener for clipboard changes.

Clipboard-listener uses the [node-copy-paste](https://github.com/xavi-/node-copy-paste) package to get the data from clipboard.

## Installation

To install the clipboard-listener, you can either use [npm](https://npmjs.com/package/clipboard-listener) or GitHub.

```
npm install clipboard-listener
or
git clone https://github.com/venomaze/clipboard-listener.git
```

## Usage

```js
const ClipboardListener = require('clipboard-listener');

/*
 * Create a new instance
 */
const listener = new ClipboardListener({
  timeInterval: 100, // Default to 250
  immediate: true, // Default to false
});

/*
 * Start listening to clipboard changes
 */
listener.on('change', value => {
  console.log(value);
});
```
