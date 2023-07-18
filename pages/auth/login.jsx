import Input from "@/components/Input";
import Title from "@/components/ui/Title";
import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/login";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";


const Login = () => {
  const { data: session } = useSession();

  console.log(session);

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      values: values.email,
      errorMessage: errors.email,
      touched: touched.email,
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
        <Title addClass="text-[40px] font-dancing mb-6">Login</Title>
        <form onSubmit={onSubmit} className=" flex flex-col gap-y-2 w-full">
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
            <button className="btn-secondary text-white" onClick={() => signIn("github")}>
              {" "}
              <i
                className="fab fa-github mr-1"
                type="button"
                
              ></i>
              GITHUB
            </button>
            <Link href="/auth/register">
              <span className=" text-[14px] cursor-pointer underline">
                Do you no have a account?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
