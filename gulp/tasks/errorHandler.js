function handleError(err, showError) {
  if(typeof showError === "undefined") showError = true;
  showError && console.log(err.toString());
  this.emit('end');
}

module.exports = handleError;