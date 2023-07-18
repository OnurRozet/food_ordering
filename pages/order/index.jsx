import Image from "next/image";
import React from "react";

const Order = () => {
  return (
    <div className="overflow-x-auto">
      <div className="min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10 min-w-[1000px] ">
        <div className="flex justify-between items-center flex-col gap-y-4">
          <div className="flex items-center flex-1   w-full ">
            <table className=" w-full text-sm text-center text-gray uppercase min-w-[1000px] ">
              <thead className=" text-sm text-secondary bg-gray">
                <tr>
                  <th scope="col" className=" py-3 px-6">
                    Order Id
                  </th>
                  <th scope="col" className=" py-3 px-6">
                    Customer
                  </th>
                  <th scope="col" className=" py-3 px-6">
                    Address
                  </th>
                  <th scope="col" className=" py-3 px-6">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" border-b bg-secondary border-gray ">
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer flex items-center gap-x-1 justify-center">
                    <span>45687136</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    <span>Onur Rozet</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    İstanbul
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    $18
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between w-full p-10 bg-primary text-secondary">
            <div className="relative flex flex-col">
              <Image
                alt=""
                src="/images/paid.png"
                width={40}
                height={40}
                objectFit="contain"
              />
              <span>Payment</span>
            </div>
            <div>
              <Image alt="" src="/images/bake.png" width={40} height={40} />
              <span>Preparing</span>
            </div>
            <div>
              <Image alt="" src="/images/bike.png" width={40} height={40} />
              <span>On the way</span>
            </div>
            <div>
              <Image
                alt=""
                src="/images/delivered.png"
                width={40}
                height={40}
              />
              <span>Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
