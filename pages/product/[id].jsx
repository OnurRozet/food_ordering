import Title from "@/components/ui/Title";
import Image from "next/image";
import { useState } from "react";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


const index = ({ productData }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [prices, setPrices] = useState(productData.prices);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [price, setPrice] = useState(prices[0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [extraItems, setExtraItems] = useState(productData?.extraOptions);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [extras, setExtras] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [size, setSize] = useState(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProduct({ ...productData, extras, price, quantity: 1 }));
  };

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(Number(item.price));
      setExtras([...extras, item]);
    } else {
      changePrice(Number(-item.price));
      setExtras(extras.filter((extra) => extra.id !== item.id));

    }
  };

  return (
    <div className=" flex items-center md:h-[calc(100vh_-_88px)] text-secondary gap-5 py-20 flex-wrap">
      <div className=" relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto">
        <Image
          src={productData.image}
          layout="fill"
          alt=""
          objectFit="contain"
          priority
        />
      </div>
      <div className="md:flex-1 md:text-start text-center ">
        <Title addClass="text-6xl  font-dancing">{productData.title}</Title>
        <span className=" text-primary text-2xl font-bold underline underline-offset-1 inline-block mt-2  ">
          ${price}
        </span>
        <p className=" text-sm my-4 md:pr-24">{productData.description}</p>
        <div>
          <h4 className=" text-xl font-bold">Choose the size</h4>
          {productData.category.toLowerCase() === "pizza" && (
            <div className="flex items-center gap-x-20 md:justify-start justify-center">
              <div
                className=" relative w-8 h-8 cursor-pointer"
                onClick={() => handleSize(0)}
              >
                <Image src="/images/size.png" layout="fill" alt="" priority/>
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  small
                </span>
              </div>
              <div
                className=" relative w-12 h-12 cursor-pointer"
                onClick={() => handleSize(1)}
              >
                <Image src="/images/size.png" layout="fill" alt=""  priority/>
                <span className="absolute top-0 -right-8 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Medium
                </span>
              </div>
              <div
                className=" relative w-16 h-16 cursor-pointer"
                onClick={() => handleSize(2)}
              >
                <Image src="/images/size.png" layout="fill" alt="" priority />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Large
                </span>
              </div>
            </div>
          )}
        </div>
        <div className=" flex md:justify-start justify-center gap-x-4 my-6">
          {extraItems.map((items) => (
            <label className="flex items-center gap-x-1" key={items._id}>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, items)}
              />
              <span className="text-sm font-semibold">{items.text}</span>
            </label>
          ))}
        </div>
        <button className=" btn-primary  text-white" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      productData: res.data ? res.data : null,
    },
  };
};

export default index;
