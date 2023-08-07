import axios from "axios";

export const ApiCall = async (data) => {
  try {
    let response = await axios({
      method: data.method,
      url: data?.url,
      data: data?.body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (err) {
    return err;
  }
};
