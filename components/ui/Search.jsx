import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Input from "../Input";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useRouter } from "next/router";

const Search = ({ SetIsSearchModal }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router=useRouter();

  console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        .then((res) => {
          setProducts(res.data);
          setFiltered(res.data.slice(0, 5));
        })
        .catch((err) => console.log(err));
    };
    setTimeout(()=>{getProducts()},2000)
  }, []);

  const handleSearch = (e) => {
    let searchValue = products
      .filter((product) => product.title.toLowerCase().includes(e.target.value))
      .slice(0, 5);
    setFiltered(searchValue);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => SetIsSearchModal(false)}>
        <div className=" w-full h-full grid place-content-center relative">
          <div className="relative z-50  md:w-[600px] w-[370px] bg-white border-solid border-2 border-lightgray p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center font-dancing font-bold text-secondary">
              Search
            </Title>
            <Input placeholder="Search..." onChange={handleSearch} />
            {products.length > 0 ? (
              <ul className=" mt-4">
                {filtered && filtered.length > 0
                  ? (
                    filtered.map((product) => (
                      <li
                        key={product._id}
                        className=" flex items-center justify-between p-2 hover:bg-primary transition-all cursor-pointer"
                        onClick={()=>{
                          router.push(`/product/${product._id}`)
                          SetIsSearchModal(false)
                        }}
                      >
                        <div className="relative flex">
                          <Image
                            src={product?.image}
                            width={48}
                            height={48}
                            alt=""
                            priority
                          />
                        </div>
                        <span className=" text-secondary font-bold">
                         {product?.title}
                        </span>
                        <span className=" text-secondary font-bold">${product?.prices[0]}</span>
                      </li>
                    ))
                 ) : <p className="text-center text-secondary font-semibold">No results found!</p>}
                  )
              </ul>
            ) : (
              <div className="flex justify-center items-center mt-3">
                <PacmanLoader color="#fca311" />
              </div>
            )}
          </div>
          <button
            className=" absolute top-4 right-4 text-secondary hover:text-primary"
            onClick={() => SetIsSearchModal(false)}
          >
            <GiCancel size={25} className="transition-all" />
          </button>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
