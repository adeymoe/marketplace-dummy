import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {

      const tempData = Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0).map(([itemId, quantity]) => ({
        _id: itemId,
        quantity: quantity,
      }));
      setCartData(tempData);

    }

  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs font-medium sm:text-lg'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 border sm:px-3 sm:py-1 bg-slate-50'>{productData.condition}</p>
                    </div>
                  </div>

                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))} type="number" className='px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2' min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, 0)} src={assets.bin_icon} className='w-4 mr-4 cursor-pointer sm:w-5' alt="" />

              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='px-8 py-3 my-8 text-sm text-white bg-black'>PROCEED TO CHECKOUT</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart
