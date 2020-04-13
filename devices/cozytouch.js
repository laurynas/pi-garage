const { API } = require('overkiz-api');

const Cozytouch = (options, callback) => {
  const api = new API({
    host: 'ha110-1.overkiz.com',
    user: options.user,
    password: options.password,
    polling: {
      always: false,
      interval: 1000,
    },
  });

  const update = () => {
    api.getSetup().then(result => {
      callback(result);
    });
  };

  update();
  setInterval(() => update(), 60 * 1000);
};

module.exports = Cozytouch;
