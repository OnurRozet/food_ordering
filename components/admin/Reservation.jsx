import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";

export default function Reservation({ user }) {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState();

  const getReservationData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/reservation`)
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getReservationData();
  }, [reservation, reservations]);

  const deleteReservation = async (id) => {
    let deletedReservation = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/reservation/${id}`
    );

    if (deletedReservation.status === 200) {
      let item = reservations.filter(
        (item) => item._id !== deletedReservation.data._id
      );
      toast.success("Reservation is deleted");
      setReservations(item);
    } else {
      toast.error("Reservation is not deleted");
    }
  };

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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
