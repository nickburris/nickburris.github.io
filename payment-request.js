var payment_request;

/**
 * Load a PaymentRequest into global |payment_request|
 */
function reloadPaymentRequest() {
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
    payment_request = new PaymentRequest(paymentMethods, paymentDetails);
    payment_request.canMakePayment().then(function(result) {
      info(result ? 'Can make payment' : 'Cannot make payment');
      
      // Enable the buy button
      document.getElementById("buy").disabled = false;
    }).catch(handleError);
  } catch(e) {
    error(e.message);
  }
}

/**
 * Shows the payment request.
 */
function buy() {
  if (!payment_request || !window.PaymentRequest) {
    error('No PaymentRequest API');
    return;
  }

  // Disable the buy button
  document.getElementById("buy").disabled = true;
  payment_request.show().then(handlePaymentResponse).catch(handleError);
}

function handlePaymentResponse(response) {
  // check the response values
  response.complete('success').then(function() {
    info('Success! No payment will be processed.');
    info('PaymentResponse ' + JSON.stringify(response, undefined, 2));
  }).catch(handleError);
}

function handleError(e) {
  error(e);
}

window.onload = function() {
  reloadPaymentRequest();
}