import Input from "@/components/Input";
import Title from "@/components/ui/Title";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { adminSchema } from "@/schema/admin";

const Index = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "Your UserName",
      values: values.userName,
      errorMessage: errors.userName,
      touched: touched.userName,
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
            <button className="btn-primary">LOGIN</button>
            <Link href="/"><span className=" text-[14px] cursor-pointer underline">Return Home Page</span></Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
