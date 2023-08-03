import { useEffect, useState } from "react";
import Home from "../pages/Home/index";
import axios from "axios";


const Index = ({categoryList,productList}) => {
  

  return (
    <div>
      <Home categoryList={categoryList} productList={productList}/>
    </div>
  );
};

export const getServerSideProps = async () => {

  let products;
   await axios
  .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  .then((res) => {
    products = res.data;
  })
  .catch((err) => {
    console.log("data is not found", err);
  });
 
 let categories;
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    .then((res) => {
      categories = res.data;
    })
    .catch((err) => {
      console.log("data is not found", err);
    });

   
 

  return {
    props: {
      categoryList: categories ? categories : [],
     productList:products ? products : []
    },
  };
};

export default Index;
