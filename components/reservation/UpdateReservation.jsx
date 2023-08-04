import React, { useState } from 'react'
import { GiCancel } from 'react-icons/gi';
import OutsideClickHandler from 'react-outside-click-handler';
import Title from '../ui/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function UpdateReservation({SetIsReservationModal,reservation,user}) {
    
    
    const [fullName,setFullName]=useState()
    const [phoneNumber,setPhoneNumber]=useState("")
    const [email,setEmail]=useState("")
    const [person,setPerson]=useState("")
    const [date,setDate]=useState("")

    const router=useRouter();

    console.log(reservation);

  const updateReservation=async()=>{

    await axios.put( `${process.env.NEXT_PUBLIC_API_URL}/reservation/${reservation._id}`,{
        fullName,
        phoneNumber,
        email,
        person,
        date
    })
    .then((res)=>{
        if(res.status===200){
            toast.success("Reservation is updated.")
            router.push(`/profil/${user._id}`)
        }
    })
  }


  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
    <OutsideClickHandler onOutsideClick={() => SetIsReservationModal(false)}>
      <div className=" w-full h-full grid place-content-center relative">
        <div className="relative z-50  md:w-[600px] w-[370px] bg-white border-solid border-2 border-lightgray p-10 rounded-3xl">
          <Title addClass="text-[40px] text-center font-dancing font-bold text-secondary">
            Update Reservation
          </Title>
          
          <div className=" flex flex-col text-sm mt-4">
            <span className=" font-semibold mb-1 text-sm">Full Name</span>
            <input
              type="text"
              value={fullName}
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              className=" border  p-1 px-2 outline-none"
              placeholder="Write a fullName..."
            />
          </div>
          <div className=" flex flex-col text-sm mt-4">
            <span className=" font-semibold mb-1 text-sm">Phone Number</span>
            <input
              type="text"
              value={phoneNumber}
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className=" border  p-1 px-2 outline-none"
              placeholder="Write a phone number..."
            />
          </div>
          <div className=" flex flex-col text-sm mt-4">
            <span className=" font-semibold mb-1 text-sm">Email</span>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" border  p-1 px-2 outline-none"
              placeholder="Write a email..."
            />
          </div>
          <div className=" flex flex-col text-sm mt-4">
            <span className=" font-semibold mb-1 text-sm">Persons</span>
            <input
              type="text"
              value={person}
              name="person"
              onChange={(e) => setPerson(e.target.value)}
              className=" border  p-1 px-2 outline-none"
              placeholder="Write a Person ..."
            />
          </div>
          <div className=" flex flex-col text-sm mt-4">
            <span className=" font-semibold mb-1 text-sm">Date</span>
            <input
              type="datetime-local"
              value={date}
              name="date"
              onChange={(e) => setDate(e.target.value)}
              className=" border  p-1 px-2 outline-none"
              placeholder="Write a Date ..."
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button className="btn-success" onClick={updateReservation} >
             Update
            </button>
          </div>
          <button
            className=" absolute top-4 right-4 text-secondary hover:text-primary"
            onClick={() => SetIsReservationModal(false)}
          >
            <GiCancel size={25} className="transition-all" />
          </button>
        </div>
      </div>
    </OutsideClickHandler>
  </div>
  )
}

export default UpdateReservation
