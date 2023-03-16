import axios from "axios";
let Base_URL;

if (process.env.NODE_ENV === "production") {
  Base_URL = process.env.REACT_APP_API_URL;
} else {
  Base_URL = process.env.REACT_APP_API_URL;
}

export const getAllItems = async () => {
  const result = await axios.get(`${Base_URL}/cafe/getAllItems`);
  return result;
};

export const addItems = async (body) => {
  const result = await axios.post(`${Base_URL}/cafe/addItems`, body);
  return result;
};
