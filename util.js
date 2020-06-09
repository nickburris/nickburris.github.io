/**
 * Appends a generic message with className to the page body.
 */
function appendMessage(message, className) {
  let element = document.createElement('pre');
  element.innerHTML = message;
  element.className = className;
  document.body.appendChild(element);
}

/**
 * Appends an error message to the page body.
 */
function error(message) {
  appendMessage(message, 'error');
}

/**
 * Appends an info message to the page body.
 */
function info(message) {
  appendMessage(message, 'info');
}