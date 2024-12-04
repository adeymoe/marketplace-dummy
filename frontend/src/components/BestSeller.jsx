import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    }, [products])
  return (
    <div className='my-10'>
        <div className='py-8 text-3xl text-center'>
            <Title text1={'HOT'} text2={'PRODUCTS'} color1='text-red-500'/>
            {/* <p className='w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nihil veniam delectus dolores repudiandae laboriosam fuga sunt natus voluptatem eligendi placeat, 
            </p> */}

        </div>


        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
            {
                bestSeller.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }

        </div>
      
    </div>
  )
}

export default BestSeller
