import { Schema, model } from "mongoose";

// Define the schema
const uploadSchema = new Schema({
  email: { type: String, required: true, unique: true },
  data: [{ type: String }] // Array of strings to store file URLs
});

// Create the model with a capital letter 'Data' to follow conventions
const Data = model("Data", uploadSchema);

export { Data };  // Correctly export the model as 'Data'
