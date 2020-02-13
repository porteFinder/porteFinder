import mongoose from "mongoose";

const Porte = new mongoose.Schema({
  coo: {
    type: String,
    required: true
  },
  voisins: {
    type: Array,
    required: true
  },
  code: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("porte", Porte);
