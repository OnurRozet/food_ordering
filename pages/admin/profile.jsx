import Image from "next/image";
import { useState } from "react";
import Products from "@/components/admin/Products";
import Order from "@/components/admin/Order";
import Category from "@/components/admin/Category";
import Footer from "@/components/admin/Footer";
import { useRouter } from "next/router";
import axios from "axios";
import AddProduct from "@/components/admin/AddProduct";
import Reservation from "@/components/admin/Reservation";


const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const [isProductModal, SetIsProductModal] = useState(false);

  const router=useRouter();

  const closeAdminAccount=async()=>{
    try {
      if (confirm('Are you sure you want to close Admin Account ?')){
        const res=await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
        if(res.status===200){
          router.push("/admin")
          toast.success("Admin Account Closed!")
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] text-secondary lg:flex-row flex-col">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border  border-b-0">
          <Image
            src="/images/admin.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">Admin</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            onClick={() => setTabs(0)}
            className={`border
             w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
          >
            <i className="fa-solid fa-utensils"></i>
            <button className="ml-1 ">Products</button>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                tabs === 1 && "bg-primary text-white"
              }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                tabs === 2 && "bg-primary text-white"
              }`}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Categories</button>
          </li>
          <li
            onClick={() => setTabs(4)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                tabs === 4 && "bg-primary text-white"
              }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Reservation</button>
          </li>
          <li
            onClick={() => setTabs(3)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                tabs === 3 && "bg-primary text-white"
              }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Footer</button>
          </li>
          <li
            onClick={closeAdminAccount}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                tabs === 5 && "bg-primary text-white"
              }`}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>

      {tabs === 0 && <Products />}
      {tabs === 1 && <Order/>}
      {tabs === 2 && <Category />}
      {tabs === 3 && <Footer />}
      {tabs === 4 && <Reservation/>}
      {isProductModal && <AddProduct SetIsProductModal={SetIsProductModal}/>}
      <button onClick={()=>SetIsProductModal(true)} className=" btn-primary fixed  bottom-14 right-10 !w-12 !h-12 text-4xl !p-0" >+</button>
    </div>
  );
};

export const getServerSideProps=(context)=>{
  const myCookie=context.req?.cookies || ""

  if(myCookie.token !== process.env.ADMIN_TOKEN){
   return {
     redirect:{
       destination:"/admin",
       permanent:false
     }
   }
  }

  

  return {
   props:{}
  }
}

export default Profile;
