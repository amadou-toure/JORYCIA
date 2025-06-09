import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

//i did'nt know where to put this :( so i put it here ;)

const SuccessToast = (Message: string) => {
  toast(Message, {
    icon: <CheckCircle className="h-6 w-6" />,
    duration: 4000,
    position: "bottom-center",
    className: "bg-[#08ff08] text-white font-bold",
  });
};
const ErrorToast = (Message: string) => {
  toast(Message, {
    icon: <XCircle className="h-6 w-6" />,
    duration: 4000,
    position: "bottom-center",
    className: "bg-[#ff0808] text-white font-bold",
  });
};

const InfoToast = (Message: string) => {
  toast(Message, {
    icon: <Info className="h-6 w-6" />,
    duration: 4000,
    position: "bottom-center",
    className: "bg-[#08ff08] text-white font-bold",
  });
};
const WarningToast = (Message: string) => {
  toast(Message, {
    icon: <AlertTriangle className="h-6 w-6" />,
    duration: 4000,
    position: "bottom-center",
    className: "bg-[#ff0808] text-white font-bold",
  });
};
export { WarningToast, InfoToast, SuccessToast, ErrorToast };
