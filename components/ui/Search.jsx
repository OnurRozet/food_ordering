import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";

const Search = ({ SetIsSearchModal }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => SetIsSearchModal(false)}>
        <div className=" w-full h-full grid place-content-center relative">
          <div className="relative z-50  md:w-[600px] w-[370px] bg-white border-solid border-2 border-lightgray p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center font-dancing font-bold text-secondary">
              Search
            </Title>
            <input
              type="text"
              placeholder="Search..."
              className="border w-full my-10"
            />
            <div>
              <ul>
                <li className=" flex items-center justify-between p-2 hover:bg-primary transition-all">
                  <div className="relative flex">
                    <Image src="/images/f1.png" width={48} height={48} alt="" />
                  </div>
                  <span className=" text-secondary font-bold">Good Pizza</span>
                  <span className=" text-secondary font-bold">$10</span>
                </li>
                <li className=" flex items-center justify-between p-2 hover:bg-primary transition-all">
                  <div className="relative flex">
                    <Image src="/images/f1.png" width={48} height={48} alt="" />
                  </div>
                  <span className=" text-secondary font-bold">Good Pizza</span>
                  <span className=" text-secondary font-bold">$10</span>
                </li>
                <li className=" flex items-center justify-between p-2 hover:bg-primary transition-all">
                  <div className="relative flex">
                    <Image src="/images/f1.png" width={48} height={48} alt="" />
                  </div>
                  <span className=" text-secondary font-bold">Good Pizza</span>
                  <span className=" text-secondary font-bold">$10</span>
                </li>
                <li className=" flex items-center justify-between p-2 hover:bg-primary transition-all">
                  <div className="relative flex">
                    <Image src="/images/f1.png" width={48} height={48} alt="" />
                  </div>
                  <span className=" text-secondary font-bold">Good Pizza</span>
                  <span className=" text-secondary font-bold">$10</span>
                </li>
              </ul>
            </div>
            <button
              className=" absolute top-4 right-4 text-secondary hover:text-primary"
              onClick={() => SetIsSearchModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
