import Input from "@/components/Input";
import Title from "@/components/ui/Title";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { adminSchema } from "@/schema/admin";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Index = () => {
  const router = useRouter();
  const onSubmit = async (values, actions) => {
   
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );
      if (res.status === 200) {
        console.log(res.data);
        actions.resetForm();
        toast.success("Admin Login Success!");
        router.push("/admin/profile")
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your UserName",
      values: values.username,
      errorMessage: errors.username,
      touched: touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      values: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];
  return (
    <div className=" container mx-auto text-secondary">
      <div className=" flex flex-col items-center my-20 md:w-1/2 w-full mx-auto ">
        <Title addClass="text-[40px] font-dancing mb-6">Admin Login</Title>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-y-2 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
          <div className=" flex flex-col w-full gap-y-4 mt-4">
            <button className="btn-primary" type="submit">
              LOGIN
            </button>
            <Link href="/">
              <span className=" text-[14px] cursor-pointer underline">
                Return Home Page
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};


export const getServerSideProps=(context)=>{
   const myCookie=context.req?.cookies || ""

   if(myCookie.token === process.env.ADMIN_TOKEN){
    return {
      redirect:{
        destination:"/admin/profile",
        permanent:false
      }
    }
   }

   return {
    props:{}
   }
 }



export default Index;
