module.exports = (client, app) => {
  app.on('devices:cozytouch', state => console.log(state));
}
