import { addProduct } from "@/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function MenuItem({product}) {

  console.log(product);

 // const cart = useSelector((state) => state.cart);
  

  //const findCart=cart.products.find((item)=>item._id === product._id)
  const dispatch =useDispatch();

  const AddToBasket=()=>{
    dispatch(
      addProduct({
        ...product,extras:[{text:product.extraOptions.text}],price:[product.prices[0]],quantity:1
      })
    )
  }

  return (
    <div className=" text-secondary bg-secondary rounded-3xl">
      <div className=" w-full bg-[#f1f2f3] rounded-bl-[46px] h-[210px] grid place-content-center rounded-tl-2xl rounded-tr-2xl  ">
        <Link href={`/product/${product._id}`}>
          <div className=" relative  w-40 h-40 text-white">
            <Image
              className=" hover:scale-105 transition-all"
              src={product.image}
              alt=""
              layout="fill"
              priority
            />
          </div>
        </Link>
      </div>
      <div className=" text-white p-[25px]">
        <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
        <p className=" text-[15px]">
         {product.description}
        </p>
        <div className=" flex justify-between items-center">
          <span>${product.prices[0]}</span>
          <button className=" btn-primary w-10 h-10 rounded-full !p-0 grid place-content-center" onClick={AddToBasket}>
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
}
