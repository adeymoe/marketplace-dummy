import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for(const items in cartItems){
        
          if(cartItems[items] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.quantity = cartItems[items]
              orderItems.push(itemInfo)
            }
          }

        
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place' , orderData, {headers:{token}})
          // console.log(response.data);
          
          if(response.data.success){
            setCartItems({})
            navigate('/orders', { state: { successMessage: "Order Placed" } })
            // toast.success("Order Placed")
          }else{
            toast.error(response.data.message)
          }
          
          break;

          case 'stripe':
            console.log('stripe case selected');
            console.log(token);
            
            
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData,{headers:{token}})
            console.log("Stripe API Response: ", responseStripe.data);
            

            if (responseStripe.data.success) {
              console.log('stripe backend connected');
              
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            break;
      
        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>


        <div className='my-3 text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <textarea required onChange={onChangeHandler} name='landmark' value={formData.landmark} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Landmark or a short description'> </textarea>
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' />

      </div>

      {/* RIGHT SIDE ------------------------------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={'METHOD'} />
          {/* Payment MethodSelection */}
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />

            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />

            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>

            </div>

          </div>
          <div className='w-full mt-8 text-end'>
            <button type='submit' className='px-16 py-3 text-sm text-white bg-black'>PLACE ORDER</button>

          </div>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
