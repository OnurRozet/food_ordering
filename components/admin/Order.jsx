import { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const status = ["preparing", " on the way", "delivered"];

  console.log(orders);

  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
        .then((res) => {
          setOrders(res?.data);
        })
        .catch((err) => console.log(err));
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);

    const currentStatusIndex = item.status;
    console.log(currentStatusIndex);

    if (currentStatusIndex < status.length - 1) {
      const nextStatus = currentStatusIndex + 1;
      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
          status: nextStatus,
        })
        .then((response) => {
          setOrders([
            response.data,
            ...orders.filter((order) => order._id !== id),
          ]);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Order status is already at the final stage.");
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px] font-dancing">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                PRODUCT ID
              </th>
              <th scope="col" className="py-3 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                PAYMENT
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    key={order._id}
                    className="transition-all bg-secondary border-gray-700  text-white "
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
                      {order._id.substring(0, 6)}...
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.customer}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      $ {order.total}
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.method === 0 ? "Cash" : "Card"}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {status[order?.status]}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        className="btn-primary !bg-success"
                        onClick={() => handleStatus(order._id)}
                        disabled={order?.status>1}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
