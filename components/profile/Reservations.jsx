import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateReservation from "../reservation/UpdateReservation";


export default function Reservations({user}) {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState();
  const [isReservationModal ,setIsReservationModal]=useState(false)

 
  
  const getReservationData = async () => {
   const res= await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/reservation`)

      if(user){
        const userReservations = res.data.filter((item)=>item.email === user.email);
        setReservations(userReservations)
      }
    
  };
  useEffect(() => {
    getReservationData();
  }, [reservation]);

  const deleteReservation = async(id) => {

    let deletedReservation = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reservation/${id}`)
   
     if(deletedReservation.status===200){
        let item=reservations.filter((item) => item._id !== deletedReservation.data._id);
        toast.success("Reservation is deleted")
        setReservations(item)
        
     }else{
        toast.error("Reservation is not deleted")
     }
   
  };

  const handleClick=async(id)=>{

    const findedReservation = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/reservation/${id}`
    );

    setReservation(findedReservation)
    setIsReservationModal(true)
    
  }
 

  return (
    
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
       
      <Title addClass="text-[40px]">Reservations</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 w-full overflow-y-auto h-10  sm:h-96 ">
        <div className=" h-full flex justify-center ">
          <table className="w-full h-96 text-sm text-center text-gray uppercase min-w-[800px] xs:min-w-[1000px]  ">
            <thead className=" text-sm text-secondary bg-gray sticky top-0 ">
              <tr>
                <th scope="col" className=" py-3 px-6">
                  ID
                </th>
                <th scope="col" className=" py-3 px-6">
                  FullName
                </th>
                <th scope="col" className=" py-3 px-6">
                  Date
                </th>
                <th scope="col" className=" py-3 px-6">
                  Person
                </th>
                <th scope="col" className=" py-3 px-6">
                  Phone Number
                </th>
                <th scope="col" className=" py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
                
              {reservations.map((reservation) => (
                
                <tr
                  key={reservation._id}
                  //onClick={() => router.push(`/order/${order?._id}`)}
                  className=" border-b bg-secondary border-gray hover:cursor-pointer hover:bg-primary hover:text-white "
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer flex items-center gap-x-1 justify-center">
                    <span>{reservation._id.substring(0, 6)}...</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer ">
                    <span>{reservation.fullName}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    {reservation?.time.date} {reservation?.time.hour}
                  </td>
                  <td className="py-4 px-6font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    {reservation?.person} Person
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    {reservation?.phoneNumber}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    <button
                      className="btn-danger text-white !px-[15px]"
                      onClick={() => deleteReservation(reservation?._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-success text-white !px-[15px]"
                      onClick={() => handleClick(reservation._id)}
                    >
                      Update
                    </button>
                  </td>
                 
                </tr>
             
              ))}
            </tbody>
          </table>
        </div>
        {isReservationModal && <UpdateReservation reservation={reservation} user={user} SetIsReservationModal={setIsReservationModal}/>}
      </div>
    </div>
  );
}
