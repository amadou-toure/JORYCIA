import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { children } from "@material-tailwind/react/types/components/accordion";

export default function MessageBox({
  isOpen,
  title,
  message,
  buttons,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  buttons: children;
}) {
  return (
    <>
      <Dialog open={isOpen} handler={() => {}}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{message}</DialogBody>
        <DialogFooter>{buttons}</DialogFooter>
      </Dialog>
    </>
  );
}
