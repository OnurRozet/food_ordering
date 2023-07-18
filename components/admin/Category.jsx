import React, { useState } from "react";
import Title from "../ui/Title";
import Input from "../Input";

const Category = () => {
  const [categories, setCategories] = useState(["pizza"]);
  const [inputText, setInputText] = useState("");

  function deleteProduct(categories) {
    categories.map((category) => {
      setCategories(
        categories.filter((cat) => {
          return cat !== category;
        })
      );
    });
  }

  return (
    <div className=" lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px] font-dancing ">Category</Title>
      <div className="mt-5">
        <div className="flex gap-2 flex-1 items-center">
          <Input
            placeholder="Add a new catgory..."
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button
            className="btn-primary"
            onClick={() => {
              setCategories([...categories, inputText]);
              setInputText("");
            }}
          >
            {" "}
            Add
          </button>
        </div>
        <div className="mt-10">
          {categories.map((category, index) => (
            <div key={index} className=" flex justify-between mt-2">
              <b>{category}</b>
              <button
                onClick={() => deleteProduct(categories)}
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
