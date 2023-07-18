import Image from "next/image";
import React from "react";

function CustomerItem({imgSrc}) {
  return (
    <div className=" mt-5 mx-4">
      <div className=" bg-secondary p-6 rounded-[5px]">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <div className=" text-white flex flex-col mt-4">
          <span className=" text-lg font-semibold">Moana Michell</span>
          <span className=" text-[15px]">magna aliqua</span>
        </div>
      </div>
     
      <div className=" relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
      flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5">
        <Image src={imgSrc} layout="fill" alt=""objectFit="contain" className="rounded-full"/>
      </div>
    </div>
  );
}

export default CustomerItem;
