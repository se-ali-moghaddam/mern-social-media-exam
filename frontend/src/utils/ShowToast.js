import { toast } from "react-toastify";

export const showToast = (text) => {
    toast(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark"
    });
}