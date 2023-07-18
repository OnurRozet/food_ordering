import Title from "@/components/ui/Title";
import { reset } from "@/redux/cartSlice";
import Image from "next/image";
import React from "react";
import { useSelector,useDispatch } from "react-redux";

const Cart = () => {


  const cart=useSelector((state)=>state.cart)
  const dispatch=useDispatch()


  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <table className=" w-full text-sm text-center text-gray uppercase min-w-[1000px] ">
            <thead className=" text-sm text-secondary bg-gray">
              <tr>
                <th scope="col" className=" py-3 px-6">Product</th>
                <th scope="col" className=" py-3 px-6">EXTRAS</th>
                <th scope="col" className=" py-3 px-6">PRICE</th>
                <th scope="col" className=" py-3 px-6">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
            {
              cart.products.map((item)=>(
                <tr className=" border-b bg-secondary border-gray " key={item.id}>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer flex items-center gap-x-1 justify-center">
                  <Image alt="" src="/images/f1.png" width={50} height={50} />
                  <span>{item.name}</span>
                </td >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">
                  {
                    item.extras.map((extra)=>(
                      <span key={extra.id}>{extra.name + ","}</span>
                    ))
                  }
                </td >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">${item.price}</td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white hover:cursor-pointer">{item.quantity}</td>
              </tr>
              ))
            }
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
          <button className="btn-primary mt-3 md:w-auto w-52 " onClick={()=>dispatch(reset())}> CHECKOUT NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
