import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import axios from "axios";

const MenuWrapper = ({categoryList,productList}) => {

   const [active, setActive] = useState(0);
   const [filterProduct, setFilterProduct] = useState([]);

 useEffect(()=>{
  setFilterProduct(productList.filter((product)=>product.category === categoryList[active].title.toLowerCase()))
 },[categoryList,productList,active])

  return (
    <div className=" container mx-auto h-[700px]">
      <div className="flex flex-col items-center mb-16">
        <Title addClass=" text-[40px] font-dancing text-secondary">
          Our Menu
        </Title>
        <div className=" mt-6">
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                key={category._id}
                className={` text-secondary rounded-3xl px-2 py-4 ${
                  index === active && " bg-secondary text-white"
                } `}
                onClick={() => setActive(index)}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>

      <div className=" mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        {filterProduct.length>0 && filterProduct.map((item) => (
          <MenuItem key={item._id}  product={item} />
        ))}

        {/* <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/> */}
      </div>
    </div>
  );
};

export default MenuWrapper;
