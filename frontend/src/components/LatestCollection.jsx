import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        const lastTen = products.slice(-10);
        setLatestProducts(lastTen);
      }, [products]);

  return (
    <div className='my-10'>
        <div className='py-8 text-3xl text-center'>
            <Title text1={"WHAT'S"} text2={'NEW'}/>
            {/* <p className='w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae deserunt eos dicta facere. Neque praesentium facilis, ipsum aliquid pariatur voluptatibus fugiat! Ipsa delectus voluptatem reiciendis natus suscipit a asperiores rerum?
            </p> */}
            
        </div>

        {/* Rendering the products */}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
            {
                latestProducts.map((item, index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
      
    </div>
  )
}

export default LatestCollection
