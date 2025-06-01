import { Alert } from "@material-tailwind/react";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import React from "react";

export default function CustomAlert({
  AlertButton,
  AlertType,
  Message,
}: {
  AlertButton: React.ReactChild;
  AlertType: "Success" | "Info" | "Warning" | "Error";
  Message: string;
}) {
  return (
    <div className="fixed bottom-4 left-4 z-50 w-[25%]">
      <Alert
        variant="filled"
        open={true}
        icon={
          AlertType === "Success" ? (
            <CheckCircle className="h-6 w-6" />
          ) : AlertType === "Info" ? (
            <Info className="h-6 w-6" />
          ) : AlertType === "Warning" ? (
            <AlertTriangle className="h-6 w-6" />
          ) : AlertType === "Error" ? (
            <XCircle className="h-6 w-6" />
          ) : null
        }
        color={
          AlertType === "Success"
            ? "green"
            : AlertType === "Info"
            ? "blue-gray"
            : AlertType === "Warning"
            ? "orange"
            : AlertType === "Error"
            ? "red"
            : "blue"
        }
        action={AlertButton}
      >
        {Message}
      </Alert>
    </div>
  );
}
