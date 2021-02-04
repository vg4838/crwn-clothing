import React from 'react'
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors'
import StripeCheckout from '../../components/stripe-button/stripe-button.component'

const CheckoutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => 
            <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className='total'>
            TOTAL: ${total}
        </div>
        <div className='test-warning'>
            
            Use following card details to test payment.
            <br />
            Card no: 4242 4242 4242 4242 - Exp: 01/21 - CVV: 123 
        </div>
        <StripeCheckout price = {total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems, 
    total : selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage)