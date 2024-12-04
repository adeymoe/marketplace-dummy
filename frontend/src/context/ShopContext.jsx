import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // the javascript unicode for naira is "\u20A6"
    const currency = '\u20A6';
    const delivery_fee = 1000;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId) => {

        //    THIS WAS USED SO THAT WHEN YOU HAVE AN ITEM LIKE CLOTH, AND YOU WANT TO ENSURE THEY PICK A SIZE BEFORE ADDING TO CART
        // if(!size){
        //     toast.error('Select Product Spec')
        //     return;
        // }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            // if(cartData[itemId][size]) {
            cartData[itemId] += 1;
            // }
            // else{
            //     cartData[itemId][size] = 1;
            // }
        }
        else {
            // cartData[itemId] = {}
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        // console.log("cartData=", cartData);
        // console.log("cartItems=", cartItems);




        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
                toast.success('Item added to cart');
            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        // Loop through each item in the cart and sum the quantities
        for (const itemId in cartItems) {
            try {
                if (cartItems[itemId] > 0) {
                    totalCount += cartItems[itemId];
                }
            } catch (error) {
                console.error(error);
            }
        }

        return totalCount;
    };


    const updateQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })

                // Optionally sync cart with the backend response
                if (response.data.cartData) {
                    setCartItems(response.data.cartData);
                }
                toast.success('Cart updated successfully');

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }

        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }

        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])








    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider