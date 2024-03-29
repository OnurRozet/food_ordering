import React, { useEffect } from "react";
import Input from "../Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "@/schema/footer";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [iconName, setIconName] = useState("fa fa-");
  const [linkAddress, setLinkAddress] = useState("https://");
  const [footerData, setFooterData] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

 console.log(footerData);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footers`
        );
        setFooterData(res.data[0]);
        setSocialMediaLinks(res.data[0].socialMedia);
      } catch (err) {
        console.log(err);
      }
    };
    getFooterData();
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footers/${footerData._id}`,
        {
          location: values.location,
          email: values.email,
          phoneNumber: values.phoneNumber,
          desc: values.desc,
          openingHours: {
            day: values.day,
            hour: values.time,
          },
          socialMedia: socialMediaLinks,
        }
      );
      if (res.status === 200) {
        toast.success("Footer updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      
      initialValues: {
        location: footerData?.location,
        email: footerData?.email,
        phoneNumber: footerData?.phoneNumber,
        desc: footerData?.desc,
        day: footerData?.openingHours?.day,
        time: footerData?.openingHours?.hour,
      },
      onSubmit,
      validationSchema: footerSchema,
    });

    const inputs = [
      {
        id: 1,
        name: "location",
        type: "text",
        placeholder: "Your Location",
        value: footerData?.location,
        errorMessage: errors.location,
        touched: touched.location,
      },
      {
        id: 2,
        name: "email",
        type: "text",
        placeholder: "Your Email",
        value: footerData?.email,
        errorMessage: errors.email,
        touched: touched.email,
      },
      {
        id: 3,
        name: "phoneNumber",
        type: "number",
        placeholder: "Your Phone Number",
        value: footerData?.phoneNumber,
        errorMessage: errors.phoneNumber,
        touched: touched.phoneNumber,
      },
      {
        id: 4,
        name: "desc",
        type: "text",
        placeholder: "Your Description",
        value: footerData?.desc,
        errorMessage: errors.desc,
        touched: touched.desc,
      },
      {
        id: 5,
        name: "day",
        type: "text",
        placeholder: "Update Day",
        value: footerData?.openingHours?.day,
        errorMessage: errors.day,
        touched: touched.day,
      },
      {
        id: 6,
        name: "time",
        type: "text",
        placeholder: "Update Time",
        value:footerData?.openingHours?.hour,
        errorMessage: errors.time,
        touched: touched.time,
      },
    ];

    const handleCreate = (e) => {
      setSocialMediaLinks([
        ...footerData?.socialMedia,
        {
          icon: iconName,
          link: linkAddress,
        },
      ]);
      setLinkAddress("https://");
      setIconName("fa fa-");
    };


  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px] font-dancing">Footer</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
            
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4 hover:cursor-pointer  transition-all">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Link Address"
            onChange={(e) => setLinkAddress(e.target.value)}
            value={linkAddress}
          />
          <Input
            placeholder="Icon Name"
            onChange={(e) => setIconName(e.target.value)}
            value={iconName}
          />
          <button className="btn-primary" type="button" onClick={handleCreate}>
            Add
          </button>
        </div>
        <ul className="flex items-center gap-4">
          {socialMediaLinks.map((item, index) => (
            <li key={index} className="flex items-center">
              <i className={`${item.icon} text-2xl`}></i>
              <button
                className="text-danger"
                onClick={() => {
                  setIcons((prev) => prev.filter((item, i) => i !== index));
                }}
                type="button"
              >
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex justify-start mt-4 mb-4">
         <button className="btn-primary  " type="submit">
        Update
      </button>
      </div>
     
    </form>
  );
};

export default Footer;
