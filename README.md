# clipboard-listener

Node.js event listener for clipboard changes. Clipboard-listener uses the [node-copy-paste](https://github.com/xavi-/node-copy-paste) package to get the data from clipboard.

## Installation

To install the clipboard-listener, you can either use [npm](https://npmjs.com) or GitHub.

```
npm install clipboard-listener
or
git clone https://github.com/venomaze/clipboard-listener.git
```

## Usage

```js
const ClipboardListener = require('clipboard-listener');

const listener = new ClipboardListener(100);

listener.on('copy', value => {
  console.log(value);
});
```
