import Image from "next/image";
import { useState } from "react";
import Account from "@/components/profile/Account";
import Password from "@/components/profile/Password";
import Orders from "@/components/profile/Orders";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Reservation from "@/components/reservation/Reservation";
import Reservations from "@/components/profile/Reservations";

const Profile = ({user}) => {
  const [tabs, setTabs] = useState(0);
  const router = useRouter();
  const [isReservationModal ,setIsReservationModal]=useState(false)


  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out")) {
      signOut({ redirect: false });
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] text-secondary lg:flex-row flex-col">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border  border-b-0">
          <Image
            src={user.image ? user.image : "/images/client2.jpg"}
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">{user.fullName}</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            onClick={() => setTabs(0)}
            className={`border
             w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
               tabs === 0 && "bg-primary text-white"
             }`}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            onClick={() => setTabs(3)}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Reservations</button>
          </li>
          <li
            onClick={handleSignOut}
            className={`border border-gray w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>

      {tabs === 0 && <Account user={user}/>}
      {tabs === 1 && <Password user={user}/>}
      {tabs === 2 && <Orders user={user} />}
      {tabs === 3 && <Reservations reservationModal={isReservationModal} user={user}  />}
    </div>
  );
};

export async function getServerSideProps({ req,params }) {



  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );


  return {
    props: {
      user:user ? user.data : null,
    },
  };
}

export default Profile;
