const ncp = require('copy-paste');
const events = require('events');

class ClipboardListener {
  /**
   * Create an event emitter and start watching
   *
   * @param {Number} timeInterval The time interval used in setInterval
   */
  constructor(options = {}) {
    this.eventEmitter = new events.EventEmitter();
    this.timeInterval = options.timeInterval || 250;
    this.immediate = !!options.immediate; // False by default
    this.interval = null;
    this.lastValue = null;
    this.init = true;
    this.isWatching = false;
    this.event = 'change';
    this.listener = null;

    this.watch();
  }

  /**
   * Start watching for the clipboard changes
   *
   * @access private
   */
  watch() {
    if (!this.isWatching) {
      this.isWatching = true;
    }

    this.interval = setInterval(() => {
      ncp.paste((error, value) => {
        if (value !== this.lastValue) {
          this.lastValue = value;

          if (this.immediate || !this.init) {
            this.eventEmitter.emit('change', this.lastValue);
          }

          if (this.init) {
            this.init = false;
          }
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
    this.event = event;
    this.listener = listener;

    return this.eventEmitter.on(event, listener);
  }

  listen() {
    if (!this.isWatching) {
      this.init = true;
      this.watch();

      return this.on(this.event, this.listener);
    }

    return null;
  }

  /**
   * Stop listening and also watching
   */
  stop() {
    this.isWatching = false;
    clearInterval(this.interval);
    this.eventEmitter.removeAllListeners();
  }
}

module.exports = ClipboardListener;
