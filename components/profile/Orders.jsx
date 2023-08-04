import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const status = ["preparing", " on the way", "delivered"];

  console.log(orders);

  const { data: session } = useSession();

  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
        .then((res) => {
          setOrders(
            res?.data.filter((res) => res.customer === currentUser.fullName)
          );
        })
        .catch((err) => console.log(err));
    };
    getOrders();
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((res) => {
          setCurrentUser(
            res?.data.filter((user) => user.email === session.user.email)[0]
          );
        })
        .catch((err) => console.log(err));
    };
    getUsers();
  }, [session]);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
        <table className=" w-full text-sm text-center text-gray uppercase min-w-[1000px] ">
          <thead className=" text-sm text-secondary bg-gray">
            <tr>
              <th scope="col" className=" py-3 px-6">
                ID
              </th>
              <th scope="col" className=" py-3 px-6">
                Address
              </th>
              <th scope="col" className=" py-3 px-6">
                Date
              </th>
              <th scope="col" className=" py-3 px-6">
                Total
              </th>
              <th scope="col" className=" py-3 px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => router.push(`/order/${order?._id}`)}
                className=" border-b bg-secondary border-gray hover:cursor-pointer hover:bg-primary hover:text-white "
              >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer flex items-center gap-x-1 justify-center">
                  <span>{order._id.substring(0, 6)}...</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                  <span>{order.address}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                  {order?.createdAt}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                  $ {order.total}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                  {status[order.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { query: id } = context;
  let orders;
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
    .then((res) => {
      orders = res.data;
    })
    .catch((err) => console.log("Data not found", err));

  if (orders) {
    return {
      props: {
        orders,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/profil/${id}`,
      },
    };
  }
};

export default Orders;
