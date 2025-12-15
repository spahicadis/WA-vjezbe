import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
  try {
    const client = new MongoClient(process.env.DB_STRING);
    await client.connect();
    console.log("Spojen na bazu");
    const db = client.db("pizze_db");
    return db;
  } catch (error) {
    console.error(error.message);
  }
};
