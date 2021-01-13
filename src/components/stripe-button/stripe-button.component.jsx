import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I93tJDsA8Gq8ATXUZjVH9U0NurKCzrpoku3WXxXEa9FuNvxP6a91QuzG4onjIVIf9JKAidqoIWjxL13HC67dSyT00vfFQqu8o';
  
    const onToken = token => {
      console.log(token);
      alert('payment successful');
    };
  
    return (
      <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
      />
    );
  };
  
  export default StripeCheckoutButton;