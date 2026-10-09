import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export const AuthorModel = mongoose.model("Author", authorSchema);