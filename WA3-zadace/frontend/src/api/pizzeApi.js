import axios from "axios";

export const fetchAllPizze = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/pizze`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchSinglePizza = async (name) => {
  try {
    const response = await axios.get(`http://localhost:8080/pizze/${name}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
