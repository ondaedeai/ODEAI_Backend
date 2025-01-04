import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ibkej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      { dbName: "ODEAI" }
    );
    console.log("Banco conectado com sucesso!");
  } catch (error) {
    console.log(error);
  }
};

export default { connect };
