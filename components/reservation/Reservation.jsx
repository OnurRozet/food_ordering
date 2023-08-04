import React from "react";
import Title from "../ui/Title";
import Input from "../Input";
import { useFormik } from "formik";
import { reservationSchema } from "@/schema/reservation";
import axios from "axios";
import { toast } from "react-toastify";

function Reservation() {
  const onSubmit = async (values, actions) => {
    const newReservation = {
      fullName: values?.fullName || "",
      phoneNumber: values?.phoneNumber || "",
      email: values?.email || "",
      person: values?.persons || "",
      time: {
        date:new Date(values?.date).toLocaleDateString(),
        hour:new Date(values?.date).toLocaleTimeString()
      }
    };

    let reservation;
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/reservation`, newReservation)
      .then((res) => {
        if (res.status === 201) {
          reservation = res.data ? res.data : [];
          toast.success("Reservation is created succesfully");
          console.log(reservation);
        }
      })
      .catch((err) => console.log(err));
  };

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        persons: "",
        date: "",
      },
      onSubmit,
      validationSchema: reservationSchema,
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
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      values: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      values: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "How Many Persons?",
      values: values.persons,
      errorMessage: errors.persons,
      touched: touched.persons,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      placeholder: "Select Date and Time",
      values: values.date,
      errorMessage: errors.date,
      touched: touched.date,
    },
  ];

  return (
    <div className=" container mx-auto py-12">
      <Title addClass="text-[40px] font-dancing text-secondary mb-10">
        Book A Table
      </Title>
      <div className=" flex justify-between flex-wrap gap-10">
        <form onSubmit={handleSubmit} className=" lg:flex-1 w-full ">
          <div className="flex flex-col gap-y-3">
            {inputs.map((item) => (
              <Input
                key={item.id}
                {...item}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
          <button type="submit" className=" btn-primary mt-4">
            Book Now
          </button>
        </form>
        <div className="lg:flex-1 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39826.734121628084!2d-0.19625718363799746!3d51.39991477703693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760645a5de4efd%3A0x468060da7eb566e8!2zTWl0Y2hhbSwgQmlybGXFn2lrIEtyYWxsxLFr!5e0!3m2!1str!2str!4v1689323971322!5m2!1str!2str"
            width="600"
            height="385"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
