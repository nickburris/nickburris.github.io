/**
 * Sets a message with className as the status.
 */
function setStatus(message, className) {
  let element = document.createElement('pre');
  element.innerHTML = message;
  element.className = className;
  let status = document.getElementById("status");
  status.innerHTML = '';
  status.appendChild(element);
}

/**
 * Sets the status to an error message.
 */
function error(message) {
  setStatus(message, 'error');
}

/**
 * Sets the status to an info message.
 */
function info(message) {
  setStatus(message, 'info');
}