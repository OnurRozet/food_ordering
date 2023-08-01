import dbConnect from "@/util/dbConnect";
import Category from "@/models/Category";
import Order from "@/models/Order";

const handler = async (req, res) => {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const orders = await Order.findById(id);
      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  }

  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
