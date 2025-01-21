import axios, { AxiosResponse } from "axios";

interface RequestData {
  [key: string]: any;
}

export const axiosRequest = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: RequestData
): Promise<AxiosResponse> => {
  try {
    switch (method) {
      case "get":
        return await axios.get(url);
      case "post":
        return await axios.post(url, data);
      case "put":
        return await axios.put(url, data);
      case "delete":
        return await axios.delete(url);
      case "patch":
        return await axios.patch(url, data);
      default:
        throw new Error("Invalid method");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    throw error;
  }
};
