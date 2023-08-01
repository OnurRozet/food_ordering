import Input from "@/components/Input";
import Title from "@/components/ui/Title";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { registerSchema } from "@/schema/register";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Register = () => {

  const router =useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`,values)
      if(res.status===200){
        router.push("/auth/login")
        toast.success("User created succesfully")
        
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };



  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword:""
      },
      onSubmit,
      validationSchema: registerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      values: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },

    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      values: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      values: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
        id: 4,
        name: "confirmPassword",
        type: "password",
        placeholder: "Your Password Again",
        values: values.confirmPassword,
        errorMessage: errors.confirmPassword,
        touched: touched.confirmPassword,
      },
  ];
  return (
    <div className=" container mx-auto text-secondary">
      <div className=" flex flex-col items-center my-20 md:w-1/2 w-full mx-auto ">
        <Title addClass="text-[40px] font-dancing mb-6">Register</Title>
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
            <button className="btn-primary" type="submit">REGISTER</button>
          <Link href="/auth/login"><span className="text-[14px] cursor-pointer underline">Do you have account?</span></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
