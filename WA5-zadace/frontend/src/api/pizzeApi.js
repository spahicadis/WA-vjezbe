import axios from "axios";

export const fetchAllPizze = async (data) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/pizze?naziv=${data?.search || ""}&cijena_min=${
        data?.min_price || ""
      }&cijena_max=${data?.max_price || ""}&sort=${data?.sort || ""}`
    );
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
