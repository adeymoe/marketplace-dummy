import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>Welcome to Marketplace — a smart, secure, and user-centered digital marketplace built under Rasakat International. We are on a mission to revolutionize the way people discover, buy, and sell quality products and services across borders.
          Rooted in excellence and innovation, Marketplace offers a seamless experience that bridges the gap between sellers and buyers through intuitive design, real-time communication, and reliable logistics. Whether you're an artisan, entrepreneur, or everyday shopper, our platform empowers you to connect, trade, and grow with confidence.</p>
          <p>At Rasakat International, we believe in elevating local talent to global opportunities. Our marketplace is more than just a transaction hub — it's a thriving community where trust, transparency, and growth meet.
          Join us and be part of the digital commerce revolution.</p>
          <b className='text-gray-800'>OUR MISSION</b>
          <p>Our mission at Marketplace is to empower individuals and businesses by providing a secure, accessible, and innovative platform for digital commerce. We aim to simplify the buying and selling experience, foster economic growth, and connect communities by unlocking opportunities in local and global markets — all under the vision and integrity of Rasakat International.</p>
        </div>
      </div>

      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col mb-20 text-sm md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Buyer's Protection:</b>
          <p className='text-gray-600'>Shop with confidence. We ensure you get the product you ordered or your money back — no hassle, no risk.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We safeguard sellers by verifying buyers and handling disputes fairly, so you can focus on growing your business.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Swift Delivery:</b>
          <p className='text-gray-600'>Our platform is built for ease — simple navigation, fast transactions, and smooth communication between buyers and sellers.</p>
        </div>
      </div>

      <NewsletterBox />
      
    </div>
  )
}

export default About
