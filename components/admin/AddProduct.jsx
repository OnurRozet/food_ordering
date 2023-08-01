import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ SetIsProductModal }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState();
  const [prices, setPrices] = useState([]);
  const [ekstra, setEkstra] = useState("");
  const [ekstraOptions, setEkstraOptions] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleEkstra = () => {
    if (ekstra) {
      if (ekstra.text && ekstra.price) {
        setEkstraOptions((prev) => [...prev, ekstra]);
        setEkstra("");
      }
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => console.log(err));
    };
    getCategories();
  }, []);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    let formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", "food_ordering");

    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dscb0idub/image/upload`,
        formData
      );

      const { url } = uploadRes.data;
      const newProduct = {
        image: url,
        title,
        description: desc,
        category: category?.toLowerCase(),
        prices,
        ekstraOptions,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );

      if (res.status === 201) {
        SetIsProductModal(false);
        toast.success("Product is created succesfully ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => SetIsProductModal(false)}>
        <div className=" w-full h-full grid place-content-center relative">
          <div className="relative z-50  md:w-[600px] w-[370px] bg-white border-solid border-2 border-lightgray p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center font-dancing font-bold text-secondary">
              Add a New Product
            </Title>
            <div className=" flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center cursor-pointer">
                <input
                  type="file"
                  onChange={handleOnChange}
                  className="hidden"
                />
                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className=" flex flex-col text-sm mt-4">
              <span className=" font-semibold mb-1 text-sm">Title</span>
              <input
                type="text"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                className=" border  p-1 px-2 outline-none"
                placeholder="Write a title..."
              />
            </div>
            <div className=" flex flex-col text-sm mt-4">
              <span className=" font-semibold mb-1 text-sm">Description</span>
              <textarea
                type="text"
                value={desc}
                name="description"
                onChange={(e) => setDesc(e.target.value)}
                className=" border  p-1 px-2 outline-none"
                placeholder="Write a description..."
              />
            </div>
            <div className=" flex flex-col text-sm mt-4">
              <span className=" font-semibold mb-1 text-sm">
                Select a Category
              </span>
              <select
                className=" border p-1 px-2 outline-none"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Write a description..."
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category.id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className=" flex flex-col text-sm mt-4">
              <span className=" font-semibold mb-1 text-sm">Prices</span>
              {category === "Pizza" ? (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="small"
                    onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="medium"
                    onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="large"
                    onChange={(e) => changePrice(e, 2)}
                  />
                </div>
              ) : (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="small"
                    onChange={(e) => changePrice(e, 0)}
                  />
                </div>
              )}
              {/* <div className="flex flex-row gap-x-4 md:flex-wrap flex-nowrap">
                    <input
                      type="number"
                      className=" border-b  p-1 px-2 pl-0 outline-none w-40"
                      placeholder="small"
                    />
                    <input
                      type="number"
                      className=" border-b  p-1 px-2 pl-0 outline-none w-40"
                      placeholder="medium"
                    />
                    <input
                      type="number"
                      className=" border-b  p-1 px-2 pl-0 outline-none w-40"
                      placeholder="large"
                    />
                  </div> */}
            </div>
            <div className=" flex flex-col text-sm mt-4">
              <span className=" font-semibold mb-1 text-sm">Ekstra</span>
              <div className="flex flex-row gap-x-4">
                <input
                  type="text"
                  className=" border-b  p-1 px-2 pl-0 outline-none"
                  name="text"
                  onChange={(e) =>
                    setEkstra({ ...ekstra, [e.target.name]: e.target.value })
                  }
                  placeholder="item"
                />
                <input
                  type="text"
                  className=" border-b  p-1 px-2 pl-0 outline-none"
                  name="price"
                  onChange={(e) =>
                    setEkstra({ ...ekstra, [e.target.name]: e.target.value })
                  }
                  placeholder="price"
                />
                <button
                  className="btn-primary py-8 ml-auto"
                  onClick={handleEkstra}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex  gap-2">
                {ekstraOptions &&
                  ekstraOptions.map((item, index) => (
                    <span
                      key={item.id}
                      className=" inline-block border border-orange text-orange p-1 rounded-xl text-xs cursor-pointer"
                      onClick={() => {
                        setEkstraOptions(
                          ekstraOptions.filter((_, e) => e !== index)
                        );
                      }}
                    >
                      {item.text}
                    </span>
                  ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-success" onClick={handleCreate}>
                Create
              </button>
            </div>
            <button
              className=" absolute top-4 right-4 text-secondary hover:text-primary"
              onClick={() => SetIsProductModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
