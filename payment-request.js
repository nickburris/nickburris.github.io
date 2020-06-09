/**
 * Load a PaymentRequest into global |request|
 */
function load() {
  const paymentMethods = [{
    supportedMethods: 'basic-card'
  },
  {
    supportedMethods: 'https://radical-tested-bean.glitch.me/method-manifest' // NickPay
  }];
  
  const paymentDetails = {
    total: {
      label: 'Total',
      amount: {
        currency: 'CAD',
        value: '19.49'
      }
    }
  };
  
  try {
    request = new PaymentRequest(paymentMethods, paymentDetails);
    request.canMakePayment().then(function(result) {
      info(result ? 'Can make payment' : 'Cannot make payment');
    }).catch(handleError);
  } catch(e) {
    error(e.message);
  }
}

/**
 * Shows the payment request.
 */
function buy() {
  if (!request || !window.PaymentRequest) {
    error('No PaymentRequest API');
    return;
  }

  request.show().then(handlePaymentResponse).catch(handleError);
}

function showResetButton() {
  document.getElementById("buy").hidden = true;
  document.getElementById("reset").hidden = false;
}

function handlePaymentResponse(response) {
  // check the response values
  response.complete('success').then(function() {
    info('Success! No payment will be processed.');
    info('PaymentResponse ' + JSON.stringify(response, undefined, 2));
    showResetButton();
  }).catch(handleError);
}

function handleError(e) {
  error(e);
  showResetButton();
}

// Load the PaymentRequest on page load
var request;
load();