import Title from "@/components/ui/Title";
import { reset } from "@/redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Cart = ({ userList }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  const user = userList?.find((user) => user.email === session?.user.email);

  console.log(user);



  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No Address",
    total: cart.total,
    method: 0,
  };

  const createOrder = async () => {
    if (session) {
      if (confirm("Are you sure to Create Order")) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          newOrder
        );
        if (res.status === 200) {
          router.push(`/order/${res.data._id}`);
          dispatch(reset());
          toast.success("Order Created Succesfully", { autoClose: 1000 });
        }
      }
    }
    else {
      toast.warning("Firstly , You must be Login");
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <table className=" w-full text-sm text-center text-gray uppercase min-w-[1000px] ">
            <thead className=" text-sm text-secondary bg-gray">
              <tr>
                <th scope="col" className=" py-3 px-6">
                  Product
                </th>
                <th scope="col" className=" py-3 px-6">
                  EXTRAS
                </th>
                <th scope="col" className=" py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className=" py-3 px-6">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((item) => (
                <tr
                  className=" border-b bg-secondary border-gray "
                  key={item.id}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer flex items-center gap-x-1 justify-center">
                    <Image
                      alt=""
                      src="/images/f1.png"
                      width={50}
                      height={50}
                      priority
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    {item.extras.map((extra) => (
                      <span key={extra.id}>{extra.text},</span>
                    ))}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    ${item.price}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center p-8 md:w-auto w-full md:text-start !text-center">
          <Title addClass=" font-dancing text-[40px]">Cart Total</Title>
          <div className="flex flex-col gap-y-2 mt-4">
            <span>Subtotal : ${cart.total}</span>
            <span>Discount : $0.00</span>
            <span>Total : ${cart.total}</span>
          </div>

          <div>
            <button
              className="btn-primary mt-3 md:w-auto w-52 "
              onClick={createOrder}
            >
              {" "}
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
