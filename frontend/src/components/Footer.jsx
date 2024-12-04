import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex lex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src='https://s2.svgbox.net/materialui.svg?ic=add_a_photo' className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, praesentium et! Veniam iste blanditiis et dicta, architecto mollitia? Illum repudiandae totam tenetur? Modi blanditiis, culpa sequi ducimus voluptas iusto! Tenetur?
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+234-900-9000</li>
                    <li>contact@marketplace.com</li>

                </ul>
            </div>
            
        </div>
        <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright &#169;2024 marketplace.com - All Right Reserved</p>
        </div>
      
    </div>
  )
}

export default Footer