const ClipboardListener = require('../src');

// With custom time interval
const listener = new ClipboardListener({
  timeInterval: 100,
  immediate: false,
});

/*
 * Listening to the copy event
 */
listener.on('change', value => console.log(value));

/*
 * Stopping the copy listener
 */
setTimeout(() => {
  listener.stop();
  console.log('Stopped the listener');

  /*
   * Start listening again
   */
  setTimeout(() => {
    listener.listen();
    console.log('Listener is listening');
  }, 5000);
}, 5000);
