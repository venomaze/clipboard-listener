const ClipboardListener = require('../src');

const listener = new ClipboardListener(100);

/*
 * Listening to the copy event
 */
listener.on('copy', value => console.log(value));

/*
 * Stopping the copy listener
 */
setTimeout(() => {
  listener.stop();
}, 5000);
