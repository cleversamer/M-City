import { toast } from "react-toastify";

export const showError = (mssg) => {
  toast.error(mssg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showSuccess = (mssg) => {
  toast.success(mssg, {
    position: toast.POSITION.TOP_LEFT,
  });
};
