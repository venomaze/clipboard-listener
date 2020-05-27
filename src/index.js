const ncp = require('copy-paste');
const events = require('events');

class ClipboardListener {
  constructor(updateTime = 250) {
    this.eventEmitter = new events.EventEmitter();
    this.updateTime = updateTime;
    this.interval = null;
    this.lastValue = null;

    this.listen();
  }

  listen() {
    this.interval = setInterval(() => {
      ncp.paste(value => {
        if (value !== this.lastValue) {
          this.lastValue = value;
          this.eventEmitter.emit('copy', this.lastValue);
        }
      });
    }, this.updateTime);
  }

  on(event, listener) {
    return this.eventEmitter.on(event, listener);
  }

  stop() {
    clearInterval(this.interval);
    this.eventEmitter.removeAllListeners();
  }
}

module.exports = ClipboardListener;
