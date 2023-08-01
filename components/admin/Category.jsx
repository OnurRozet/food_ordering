import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Input from "../Input";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState(["pizza"]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
       
        setCategories(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          title: inputText,
        }
      );
      setCategories([...categories, res.data]);
      setInputText("");
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(categories.filter((cat) => cat._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px] font-dancing ">Category</Title>
      <div className="mt-5 ">
        <div className="flex gap-2 flex-1 items-center">
          <Input
            placeholder="Add a new catgory..."
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button className="btn-primary" onClick={handleCreate}>
            {" "}
            Add
          </button>
        </div>
        <div className="mt-10 max-h-[250px] overflow-auto pb-4">
          {categories.map((category) => (
            <div key={category._id} className=" flex justify-between mt-2">
              <b>{category.title}</b>
              <button
                onClick={(e) => handleDelete(e, category._id)}
                className="btn-primary !bg-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
