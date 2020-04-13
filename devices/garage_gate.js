const Gpio = require('onoff').Gpio;
const noop = ()=>{};

class GarageGate {
  constructor(options) {
    this.sensor = new Gpio(options.pin, 'in');
    this.button = new Gpio(options.buttonPin, 'out');
    this.callback = options.onChange || noop;
    this.sensorValue = null;

    this.update();

    setInterval(() => this.update(), 300);
  }

  update() {
    this.sensor.read(this.handleUpdate.bind(this));
  }

  handleUpdate(err, value) {
    if (err) {
      console.log(err);
      return;
    }

    if (this.sensorValue == value) {
      return;
    }

    this.sensorValue = value;
    this.callback(value);
  }

  click() {
    const button = this.button;

    button.write(1, () => {
      setTimeout(() => {
        button.writeSync(0);
      }, 100);
    });
  }
}

module.exports = (options) => new GarageGate(options);
