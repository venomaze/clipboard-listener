const ncp = require('copy-paste');
const events = require('events');

class ClipboardListener {
  /**
   * Create an event emitter and start watching
   *
   * @param {Number} timeInterval The time interval used in setInterval
   */
  constructor(timeInterval = 250) {
    this.eventEmitter = new events.EventEmitter();
    this.timeInterval = timeInterval;
    this.interval = null;
    this.lastValue = null;

    this.watch();
  }

  /**
   * Start watching for the clipboard changes
   *
   * @access private
   */
  watch() {
    this.interval = setInterval(() => {
      ncp.paste((error, value) => {
        if (value !== this.lastValue) {
          this.lastValue = value;
          this.eventEmitter.emit('copy', this.lastValue);
        }
      });
    }, this.timeInterval);
  }

  /**
   * Listen to an event
   *
   * @param {String} event The event name
   * @param {Function} listener Event callback
   */
  on(event, listener) {
    return this.eventEmitter.on(event, listener);
  }

  /**
   * Stop listening and also watching
   */
  stop() {
    clearInterval(this.interval);
    this.eventEmitter.removeAllListeners();
  }
}

module.exports = ClipboardListener;
