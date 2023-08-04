import dbConnect from "@/util/dbConnect";
import Category from "@/models/Category";
import Order from "@/models/Order";
import Reservation from "@/models/Reservation";

const handler = async (req, res) => {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const reservation = await Reservation.findById(id);
      res.status(200).json(reservation);
    } catch (error) {
      console.log(error);
    }
  }

  if (method === "DELETE") {
    try {
      const reservation = await Reservation.findByIdAndDelete(id);
      res.status(200).json(reservation);
    } catch (err) {
      console.log(err);
    }
  }

  
  if (method === "PUT") {
    try {
      const reservation = await Reservation.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(reservation);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
