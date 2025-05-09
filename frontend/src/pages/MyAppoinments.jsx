import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const MyAppoinments = () => {
  const { backendURL, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const month = ["", "Jan", "Feb", "Mar" , "April" , "May" , "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + month[Number(dateArray[1])] + " " + dateArray[2]
  }
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendURL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // const initPay = (order) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_Id,
  //     amount:order.amount,
  //     currency: order.currency,
  //     name:'Appointment Payment',
  //     description:'Appointment Payment',
  //     order_id:order.id,
  //     reciept:order.reciept,
  //     handler : async (response) => {
  //        console.log(response)
  //     }
  //   }
  // const rzp = new window.Razorpay(options)
  // rzp.open()
  // }
 
  // const appointmentRazorpay = async(appointmentId) => {
  //      try {
  //       const {data} = await axios.post(backendURL + '/api/user/payment-razorpay',{appointmentId},{headers:{token}})
  //       if(data.success){
  //         initPay(data.order)
  //       }
  //      } catch (error) {
        
  //      }}
  
  return (
    <div>
      <p className='pb-3 mt-14 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-neutral-800 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm font-medium text-neutral-700' >Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime} </p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              {!item.cancelled && !item.isCompleted && <button onClick={()=>appointmentRazorpay(console.log("it is not optimize"))} className='text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted &&  <button onClick={() => cancelAppointment(item._id)} className='text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-500 '>Cancel Appointment </button>}
              {item.cancelled && !item.isCompleted &&  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancel</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 rounded border border-green-500 text-green-500'>Completed</button>}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppoinments
