import { Schema, Model, model } from "mongoose";

interface IPost {
  localisation: string;
  img: {
    data: Buffer,
    contentType: string
  };
  username: string;
}

const postSchema: any = new Schema<IPost>(
  {
    localisation: { type: String, required: true },
    img: {
        data: { type: String, required: true },
        contentType:{ type: String, required: true }
    },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);