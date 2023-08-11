import axios from "axios";
// import { ChatState } from "../Context/ChatProvider";
// const { user } = ChatState();

export const ApiCall = async (data) => {
  try {
    let response = await axios({
      method: data.method,
      url: data?.url,
      data: data?.body,
      headers:data?.headers
    });
    return response?.data;
  } catch (err) {
    return err;
  }
};
