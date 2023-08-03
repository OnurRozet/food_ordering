import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import axios from "axios";

const MenuWrapper = ({ categoryList, productList }) => {
  console.log(productList);
  const [active, setActive] = useState(0);
  const [filterProduct, setFilterProduct] = useState([]);
  const [productLimit ,setProductLimit] = useState(3);

  useEffect(() => {
    setFilterProduct(
      productList.filter(
        (product) =>
          product.category.toLowerCase() === categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);


  return (
    <div className=" container mx-auto mb-16">
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
                onClick={() =>{
                  setActive(index)
                  setProductLimit(3)
                }}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>

      <div className=" mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
        {filterProduct.length>0 && filterProduct.slice(0,productLimit).map((item) => (
          <MenuItem key={item._id} product={item} />
        ))}

        {/* <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/> */}
      </div>

      <div className=" flex justify-center mt-8 w-full">
        <button className="btn-primary" onClick={()=>setProductLimit(productLimit + 3)}>View More</button>
      </div>
    </div>
  );
};

export default MenuWrapper;
