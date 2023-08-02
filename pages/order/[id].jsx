import axios from "axios";
import Image from "next/image";
import React from "react";

const Order = ({ order }) => {
  const status = order?.status;
  const statusClass = (index) => {
    if (index - status < 1) return "";
    if (index - status === 1) return "animate-pulse";
    if (index - status > 1) return "";
  };

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
                    <span>{order?._id.substring(0, 6)}...</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    <span>{order?.customer}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    {order?.address}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    $ {order?.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between w-full p-10 bg-primary text-secondary">
            <div className={`relative flex flex-col ${statusClass(0)}`}>
              <Image
                alt=""
                src="/images/paid.png"
                width={40}
                height={40}
                objectFit="contain"
              />
              <span>Payment</span>
            </div>
            <div className={`relative flex flex-col ${statusClass(1)}`}>
              <Image alt="" src="/images/bake.png" width={40} height={40} />
              <span>Preparing</span>
            </div>
            <div className={`relative flex flex-col ${statusClass(2)}`}>
              <Image alt="" src="/images/bike.png" width={40} height={40} />
              <span>On the way</span>
            </div>
            <div className={`relative flex flex-col ${statusClass(3)}`}>
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

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );

  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Order;
