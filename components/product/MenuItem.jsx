import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";

export default function MenuItem() {
  return (
    <div className=" text-secondary bg-secondary rounded-3xl">
      <div className=" w-full bg-[#f1f2f3] rounded-bl-[46px] h-[210px] grid place-content-center rounded-tl-2xl rounded-tr-2xl  ">
        <Link href="/product">
          <div className=" relative  w-40 h-40 text-white">
            <Image
              className=" hover:scale-105 transition-all"
              src="/images/f1.png"
              alt=""
              layout="fill"
            />
          </div>
        </Link>
      </div>
      <div className=" text-white p-[25px]">
        <h4 className="text-xl font-semibold mb-2">Delicious Pizza</h4>
        <p className=" text-[15px]">
          Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit,
          magnam voluptatem repellendus sed eaque
        </p>
        <div className=" flex justify-between items-center">
          <span>$20</span>
          <button className=" btn-primary w-10 h-10 rounded-full !p-0 grid place-content-center">
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
}
