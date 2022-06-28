import React  , { useRef} from 'react'
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import { loadStripe } from "@stripe/stripe-js"




const Cart = () => {
  const cartRef = useRef();
  const handlePayment = async () => {
     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
     const response = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
     });
     if(response.statusCode === 500) return;
     
     const data= await response.json();
    
     toast.loading('Redirecting...');

     stripe.redirectToCheckout({sessionId: data.id});
   }
  const {cartItems, setShowCart,onRemove, toggleCartItemQuantity, totalPrice, totalQuantities} = useStateContext();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button 
        type = 'button'
        className='cart-heading'
        onClick={( ) => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} Items)</span>
        </button>
        {cartItems.length < 1 && (<div className='empty-cart'>
          <AiOutlineShopping size={150}/>
          <h3>Your shopping cart is empty.</h3>
          <Link href='/'>
            <button type='button' onClick={()=> setShowCart(false)} className ='btn'>
              Continue Shopping
            </button>
          </Link>
        </div> )}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src= {urlFor(item?.image[0])} className = 'cart-product-image' />
               <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>₹{item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id,'dec')}>
                            <AiOutlineMinus/>
                        </span>
                        <span className='num' >
                           {item.quantity}
                        </span>
                        <span className='plus' onClick={() => toggleCartItemQuantity(item._id,'inc')}>
                            <AiOutlinePlus/>
                        </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item._id)} >
                    <TiDeleteOutline/>
                  </button>
                </div>
               </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>₹{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handlePayment} >
                 Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart