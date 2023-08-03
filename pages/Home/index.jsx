import About from "@/components/About";
import Campaigns from "@/components/Campaigns";
import Carousel from "@/components/Carousel";
import Reservation from "@/components/Reservation";
import MenuWrapper from "@/components/product/MenuWrapper";
import Customers from "@/components/customers/Customers";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchData } from "next-auth/client/_utils";


const Index = ({categoryList,productList}) => {

  
  
  // const [categoryList, setCategoryList] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/categories`
  //     );
  //     if (res.data !== undefined) {
  //       setCategoryList(res.data);
  //     }
  //   };
  //   fetchData();
  // }, [fetchData]);

  // console.log(categoryList);

  return  productList && categoryList && (
    <React.Fragment> 
      <Carousel />
      <Campaigns />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  );
};



export default Index;
