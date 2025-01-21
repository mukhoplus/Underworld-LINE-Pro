import axios, { AxiosResponse } from "axios";

interface RequestData {
  [key: string]: any;
}

export const axiosRequest = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: RequestData
): Promise<AxiosResponse> => {
  const headers = {
    "Content-Type": "application/json",
    "Mukho-Auth-Token": "Underworld",
  };

  try {
    return await axios({
      headers,
      method,
      url,
      data,
      withCredentials: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    throw error;
  }
};
