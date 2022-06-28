import React,{createContext, useContext, useState, useEffect} from "react";
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] =useState (0);
    const [totalQuantities, setTotalQuantities] = useState (0);
    const [qty, setQty] = useState (1);
    let foundItem ;
    let index;
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty ((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty-1;
        })
    }
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if (checkProductInCart){
             const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id)return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
        }else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
        setQty(1);
    }
    const toggleCartItemQuantity = (id, value) => {
        foundItem = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((item) => item._id === id)
        const newCartItems = cartItems.filter((item)=> item._id !== id  );
        if (value === 'inc'){ 
            setCartItems([...newCartItems, {...foundItem, quantity: foundItem.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundItem.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec' ) {
            if (foundItem.quantity > 1){
                setCartItems([...newCartItems, {...foundItem, quantity: foundItem.quantity - 1}])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundItem.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
            
        }
    }
    const onRemove = (id) => {
        foundItem = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item)=> item._id !== id  );
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundItem.price * foundItem.quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundItem.quantity)

    }
    return (
        <Context.Provider 
        value = {{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            toggleCartItemQuantity,
            decQty,
            incQty,
            onAdd,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
            
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);