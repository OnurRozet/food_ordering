import Image from "next/image";
import React from "react";
import Title from "./ui/Title";
import {MdShoppingCart} from 'react-icons/md'

const CampaignItem = () => {
  return (
    <div className=" bg-secondary flex-1 rounded-md py-5 px-4 flex items-center gap-x-4">
      <div className=" relative md:w-40 md:h-40 w-36 h-36 after:content-[''] border-[5px] border-primary rounded-full overflow-hidden">
        <Image className=" hover:scale-105 transition-all" src="/images/o1.jpg" alt="" layout="fill" priority />
      </div>
      <div className=" text-white">
        <Title addClass=" text-2xl font-dancing">Tasty Thursday</Title>
        <div className="my-1 font-dancing">
            <span className=" text-[40px]">20%</span>
            <span className=" text-sm ml-1">Off</span>
        </div>
        <button className=" btn-primary flex items-center gap-x-2 ">Order Now <MdShoppingCart size={20}/></button>
      </div>
    </div>
  );
};

export default function Campaigns() {
  return (
    <div className=" flex justify-between container mx-auto py-20 gap-x-6 gap-y-3 flex-wrap">
      <CampaignItem />
      <CampaignItem />
    </div>
  );
}
