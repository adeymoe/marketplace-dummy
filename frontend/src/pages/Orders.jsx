import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {

  const{backendUrl, token, currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      // console.log("Token: ", token);
      if (!token) {
        // console.log("no token provided");
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {},{headers:{token}});
      // console.log(response.data);
      
      if (response.data.success) {
        // console.log("Orders fetched:", response.data.orders);
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)

          })
          

          
        })
        
        console.log('this: ',allOrdersItem.reverse());
        setOrderData(allOrdersItem.reverse());
    } else {
      console.log('response failed');
      
        toast.error(response.data.message);
    }
      
    } catch (error) {
      console.log("Error fetching order data: ", error);
    }
  }

 

  useEffect(() => {

    loadOrderData();
    
    // Check if a success message exists in the state
    if (location.state?.successMessage) {
        toast.success(location.state.successMessage);

        // Clear the state after showing the toast
        navigate('/orders', { replace: true });
        
    }
}, [location.state, navigate, token]);



  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />

      </div>

      <div>
        {
          orderData.map((item,index) => (
            <div key={index} className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='font-medium sm:text-base'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Condition: {item.condition}</p>

                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='flex justify-between md:w-1/2'>
              <div className='flex items-center gap-2'>
                <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                <p className='text-sm md:text-base'>{item.status}</p>

              </div>
              <button onClick={loadOrderData} className='px-4 py-2 text-sm font-medium border rounded-sm'>Track Order</button>

              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders
