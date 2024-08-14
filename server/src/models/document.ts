import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["image", "pdf", "text"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);
