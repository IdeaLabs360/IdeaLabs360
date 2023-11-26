import axios from "axios";

export const postRequest = async (url, formData) => {
  const unknownError = (
    <>Something went wrong while trying to process your request</>
  );

  let result = { data: null, error: null };

  try {
    const response = await axios.post(url, formData);

    if (response.status === 200) {
      const data = await response.data;
      result.data = data;
    } else {
      result.error = unknownError;
    }
  } catch (err) {
    console.log(err);

    switch (err?.response?.status) {
      case 400:
        result.error = err?.response?.data;
        break;

      default:
        result.error = unknownError;
    }
  }

  return result;
};
