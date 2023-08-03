import React, { useState } from "react";
import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Search from "../ui/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, SetIsSearchModal] = useState(false);
  const [isMenuModal, SetIsMenuModal] = useState(false);

  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  return (
    <div
      className={` h-[5.5rem] z-50  relative w-full ${
        router.asPath === "/" ? "bg-transparent" : "bg-secondary !fixed"
      }`}
    >
      <div className="container mx-auto text-white flex justify-between items-center h-full ">
        <div>
          {" "}
          <Logo />
        </div>

        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent sm:flex hidden ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="flex gap-x-4 items-center">
            <li className={` px-[5px] py-[14px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/" && "text-primary"}`}>
              <Link href="/">Home</Link>
            </li>
            <li className={` px-[5px] py-[14px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/menu" && "text-primary"}`}>
              <Link href="/menu">Menu</Link>
            </li>
            <li className={` px-[5px] py-[14px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/about" && "text-primary"}`}>
              <Link href="/about">About</Link>
            </li>
            <li className={` px-[5px] py-[14px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/reservation" && "text-primary"}`}>
              <Link href="/reservation">Book Table</Link>
            </li>
          </ul>
          {isMenuModal && (
            <button
              className=" absolute top-4 right-4 z-50 text-white"
              onClick={() => SetIsMenuModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          )}
        </nav>

        <div className=" flex gap-x-2 items-center">
          <Link href="/auth/login">
            <FaUserAlt   className={`hover:text-primary transition-all cursor-pointer ${
                 ( router.asPath.includes("/auth") || router.asPath.includes(`/profil`) ) && "text-primary"
                }`} />
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart   className={`hover:text-primary transition-all cursor-pointer ${
                  router.asPath === "/cart" && "text-primary"
                }`}/>
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => SetIsSearchModal(true)}>
            <FaSearch className="header-FaCompenent" />
          </button>
          <a href="#" className=" md:inline-block hidden sm">
            <button className="btn-primary">Order Online</button>
          </a>
          <button
            onClick={() => SetIsMenuModal(true)}
            className=" sm:hidden inline-block"
          >
            <GiHamburgerMenu className="header-FaCompenent text-xl" />
          </button>
        </div>
      </div>
      <div>
        {isSearchModal && <Search SetIsSearchModal={SetIsSearchModal} />}
      </div>
    </div>
  );
};

export default Header;
