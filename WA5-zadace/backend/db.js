import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let database;

export const createConnection = async () => {
  if (database) {
    return database;
  }
  try {
    client = new MongoClient(process.env.DB_STRING);
    await client.connect();
    database = client.db(process.env.DB_NAME);
    return database;
  } catch (error) {
    throw error;
  }
};
