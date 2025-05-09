import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5 mt-28 text-sm'>
            {/* Left-Section */}
            <div>
               <img className='mb-5 w-40' src={assets.logo} alt="" />
               <p className='w-full md:w-2/3 text-gray-600 leading-6'>Empowering your health journey with Prescripto. Effortless appointment scheduling and personalized care solutions. Experience healthcare redefined. Connect with us today for a seamless medical experience tailored just for you.</p>
            </div>
            {/* Center-section */}
            <div>
                 <p className='text-xl font-medium mb-5'>COMPANY</p>
                 <ul className='flex flex-col gap-2 text-gray-600'>
                    <li className='hover:text-gray-950 cursor-pointer  transition-all duration-500 ' onClick={()=>{navigate("/");scrollTo(0,0)}}>Home</li>
                    <li className='hover:text-gray-950 cursor-pointer transition-all duration-500 ' onClick={()=>{navigate("/about");scrollTo(0,0)}}>About us</li>
                    <li className='hover:text-gray-950 cursor-pointer transition-all duration-500 ' onClick={()=>{navigate("/contact");scrollTo(0,0)}}>Contact us</li>
                    <li className='hover:text-gray-950 cursor-pointer  transition-all duration-500 ' onClick={()=>{navigate("/privacy-policy");scrollTo(0,0)}}>Privacy Policy</li>
                 </ul>
            </div>
            {/* right-section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 98223-32234</li>
                    <li>info@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* CopyRight Text */}
        <div>
           <hr />
           <p className='text-sm py-5 text-center '>Copyright 2024@ Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
