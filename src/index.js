const ncp = require('copy-paste');
const events = require('events');

class ClipboardListener {
  /**
   * Create an event emitter and start watching
   * @constructor
   * @param {Object} [options] - Custom options object (optional)
   * @returns {void}
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
   * @property {Function} watch - Start watching for the clipboard changes
   * @access private
   * @returns {void}
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
   * @property {Function} on - Listen to an event
   * @param {String} event - The event name
   * @param {Function} listener - Event callback
   * @returns {Object} - Event emitter listener
   */
  on(event, listener) {
    this.event = event;
    this.listener = listener;

    return this.eventEmitter.on(event, listener);
  }

  /**
   * @property {Function} listen - Start watching and listening again
   * @returns {(Object|null)} - Returns event emitter listener if it wasn't watching already
   */
  listen() {
    if (!this.isWatching) {
      this.init = true;
      this.watch();

      return this.on(this.event, this.listener);
    }

    return null;
  }

  /**
   * @property {Function} stop - Stop listening and watching
   * @returns {void}
   */
  stop() {
    this.isWatching = false;
    clearInterval(this.interval);
    this.eventEmitter.removeAllListeners();
  }
}

module.exports = ClipboardListener;
