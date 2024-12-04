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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quam officia eum ea molestias reiciendis consequuntur, eveniet pariatur, quos animi ullam culpa nulla vitae, fugiat alias ab illum nobis. Unde. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora omnis vero aliquam. Magnam et ea consequatur modi, incidunt repudiandae sequi dolore, officia illum distinctio animi id molestias sed, delectus qui.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse eum ad dolores, quasi et, iure, omnis officia aut necessitatibus autem magnam. Minima vero, corrupti fugiat magni aliquam labore sint.</p>
          <b className='text-gray-800'>OUR MISSION</b>
          <p>Our mission at marketplace Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis maxime cupiditate consequuntur expedita soluta sequi laborum ad voluptas minima, itaque quasi! Iste ipsa sint, distinctio accusamus at necessitatibus minus doloribus!</p>
        </div>
      </div>

      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col mb-20 text-sm md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Buyer's Protection:</b>
          <p className='text-gray-600'>We Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate magni perspiciatis quas. Voluptatum odio dolore ut quo. Similique, saepe eligendi iure illo doloremque odit quos. Voluptatem expedita impedit beatae?</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate magni perspiciatis quas. Voluptatum odio dolore ut quo. Similique, saepe eligendi iure illo doloremque odit quos. Voluptatem expedita impedit beatae?</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Swift Delivery:</b>
          <p className='text-gray-600'>We Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate magni perspiciatis quas. Voluptatum odio dolore ut quo. Similique, saepe eligendi iure illo doloremque odit quos. Voluptatem expedita impedit beatae?</p>
        </div>
      </div>

      <NewsletterBox />
      
    </div>
  )
}

export default About
