import { message } from "antd";

export const errorCheck = (error) => {
    if (error?.data?.errors) {
      let key = Object.keys(error.data.errors)[0];
      let errorMessage = error.data.errors[key][0];
      message.error(errorMessage);
    } else if (error?.data?.error) {
      message.error(error.data.error);
    }else if (error?.data?.message) {
      message.error(error.data.message);
    } else if (error?.message) {
      message.error(error.message);
    }
};
