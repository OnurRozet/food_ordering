import React from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = () => {
  return (
    <div className=" container mx-auto ">
      <div className="flex flex-col items-center mb-16">
        <Title addClass=" text-[40px] font-dancing text-secondary">
          Our Menu
        </Title>
        <div className=" mt-6">
          <button className=" text-secondary rounded-3xl px-2 py-4 bg-secondary">
            All
          </button>
          <button className=" text-secondary rounded-3xl px-2 py-4">
            Burger
          </button>
          <button className=" text-secondary rounded-3xl px-2 py-4">
            Pizza
          </button>
          <button className=" text-secondary rounded-3xl px-2 py-4 ">
            Drink
          </button>
        </div>
      </div>

      <div className=" mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  );
};

export default MenuWrapper;
