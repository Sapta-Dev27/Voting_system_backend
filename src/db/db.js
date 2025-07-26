import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("Connected to MongoDB successfully");
    }
    else {
      console.log("Failed to connect to MongoDB");
    }

  }
  catch (error) {
    console.log(error)
  }
}

export default connectToDb