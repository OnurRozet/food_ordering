import mongoose from "mongoose";
import { string } from "yup";

const ReservationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    person: {
      type: String,
      required: true,
    },
    time: {
      date: { type: String },
      hour:{type:String}
    },
  },
  { timestamps: true }
);

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
