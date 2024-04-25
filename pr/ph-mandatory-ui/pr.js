const details = {
  total: {
    label: "Donation",
    amount: {
      currency: "USD",
      value: "55.00"
    }
  },
  displayItems: [
    {
      label: "Original donation amount",
      amount: {
        currency: "USD",
        value: "65.00"
      }
    },
    {
      label: "Friends and family discount",
      amount: {
        currency: "USD",
        value: "-10.00"
      }
    }
  ]
};

window.onload = () => {
  document.getElementById("total").innerText = details.total.amount.value;
};

/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequestWithData(data) {
  if (!window.PaymentRequest) {
    return null;
  }

  const supportedInstruments = [
    {
      supportedMethods: [
        "https://silent-pay-app.glitch.me/method-manifest"
      ]
    }
  ];

  let request = null;

  try {
    details.modifiers = [{
      supportedMethods: "https://silent-pay-app.glitch.me/method-manifest",
      data: data
    }];
    request = new PaymentRequest(supportedInstruments, details);
    if (request.canMakePayment) {
      request
        .canMakePayment()
        .then(function(result) {
          info(result ? "Can make payment" : "Cannot make payment");
        })
        .catch(function(err) {
          error(err);
        });
    }
    if (request.hasEnrolledInstrument) {
      request
        .hasEnrolledInstrument()
        .then(function(result) {
          info(result ? "Has enrolled instrument" : "No enrolled instrument");
        })
        .catch(function(err) {
          error(err);
        });
    }
  } catch (e) {
    error("Developer mistake: '" + e.message + "'");
  }

  return request;
}

/**
 * Handles the response from PaymentRequest.show().
 */
function handlePaymentResponse(response) {
  response
    .complete("success")
    .then(function() {
      done("This is a demo website. No payment will be processed.", response);
    })
    .catch(function(err) {
      error(err);
      request = buildPaymentRequestWithData({});
    });
}

/**
 * Launches payment request for the payment method.
 */
function onBuyClicked(action) {
  let request = buildPaymentRequestWithData({
    action: action
  });

  // eslint-disable-line no-unused-vars
  if (!window.PaymentRequest || !request) {
    error("PaymentRequest API is not supported.");
    return;
  }

  try {
    request
      .show()
      .then(handlePaymentResponse)
      .catch(function(err) {
        error(err);
        request = buildPaymentRequest();
      });
  } catch (e) {
    error("Developer mistake: '" + e.message + "'");
    request = buildPaymentRequest();
  }
}
