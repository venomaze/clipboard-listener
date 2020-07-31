const ClipboardListener = require('../src');

/*
 * New instance with custom time interval
 */
const listener = new ClipboardListener({
  timeInterval: 100,
  immediate: false,
});

/*
 * Start listening to clipboard changes
 */
listener.on('change', value => console.log(value));

/*
 * Stop the listener after 5 seconds
 */
setTimeout(() => {
  listener.stop();
  console.log('Stopped the listener');

  /*
   * Start listening to clipboard changes again after 5 seconds
   */
  setTimeout(() => {
    listener.listen();
    console.log('Listener is listening');
  }, 5000);
}, 5000);
