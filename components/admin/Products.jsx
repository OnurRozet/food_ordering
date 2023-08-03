import React, { useEffect, useState } from "react";
import Image from "next/image";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    setProducts(res.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = async (id) => {
    if (id === null) {
      console.log("İd not found");
    }
    if (confirm("Are You Sure that you want deleting this product ")) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );
      if (res.status === 200) {
        toast.success("Product has been deleted");
        getProduct();
      }
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px] font-dancing">Products</Title>
      <div className="overflow-auto max-h-[400px] w-full mt-5 md:mb-5">
        <table className="w-full text-sm text-center text-gray-500 xs:min-w-[1000px] ">
          <thead className="text-xs text-gray-400 uppercase bg-gray sticky top-0">
            <tr>
              <th scope="col" className="py-3 px-6">
                IMAGE
              </th>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                TITLE
              </th>
              <th scope="col" className="py-3 px-6">
                PRICE
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((pro) => (
              <tr
                key={pro._id}
                className="transition-all bg-secondary border-gray-700 hover:bg-primary text-white "
              >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                  <Image
                    src={pro.image}
                    alt=""
                    width={50}
                    height={50}
                    priority
                  />
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {pro._id.substring(0, 5)}...
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {pro.title}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  $ {pro.prices[0]}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <button
                    className="btn-primary !bg-danger"
                    onClick={() => handleDelete(pro._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
