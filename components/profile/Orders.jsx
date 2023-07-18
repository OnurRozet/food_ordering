import React from "react";
import Title from "../ui/Title";

const Orders = () => {
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Password</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <table className=" w-full text-sm text-center text-gray uppercase min-w-[1000px] ">
            <thead className=" text-sm text-secondary bg-gray">
              <tr>
                <th scope="col" className=" py-3 px-6">ID</th>
                <th scope="col" className=" py-3 px-6">Address</th>
                <th scope="col" className=" py-3 px-6">Date</th>
                <th scope="col" className=" py-3 px-6">Total</th>
                <th scope="col" className=" py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b bg-secondary border-gray ">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer flex items-center gap-x-1 justify-center">
                  <span>6341578</span>
                </td >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                  <span>Bostancı</span>
                </td >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">12/07/2023 14:00</td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">$20</td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">Preparing</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Orders;