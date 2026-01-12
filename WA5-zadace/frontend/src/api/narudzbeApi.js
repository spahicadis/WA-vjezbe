import axios from "axios";

export const createNarudzba = async (data) => {
  try {
    const response = await axios.post(`http://localhost:8080/narudzbe`, data);
    const responseData = {
      status: response.status,
      message: response.data.message,
    };
    return responseData;
  } catch (err) {
    const errResponseData = {
      status: err.response?.status,
      message: err.response?.data || err.message,
    };
    return errResponseData;
  }
};
