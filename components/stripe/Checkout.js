import React from "react";

import StripeCheckout from "react-stripe-checkout";

const Checkout = ({ subTotal, handlePaymentResult }) => {
  const tokenHandler = (token) => {
    console.log(token);
    handlePaymentResult({
      transacitionId: token.id,
      email: token.email,
      status: true,
    });
  };
  return (
    <>
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51HvfktAxBrXJs2UIVhIC9DKXWhTmPmGSoZblhwCwF7Qt9owus1UCB9D7UblFcutQNrhCsaIoIR9aQQCXVdVQhBdv00DgUIGCHZ"
        currency="INR"
      >
        <button className="flex  text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          Pay Now
        </button>
      </StripeCheckout>
    </>
  );
};

export default Checkout;
