import React from "react";

import AnimateIn from "@/lib/animations/AnimateIn";

interface ToastProps {
  toast: string;
  setToast: React.Dispatch<React.SetStateAction<string>>;
}

// TODO: have this accept a type

const Toast = (props: ToastProps) => {
  const { toast, setToast } = props;

  if (toast === "") return null;

  setTimeout(() => setToast(""), 2000);

  return (
    <AnimateIn
      from="opacity-0"
      to="opacity-100"
      as="div"
      className="absolute bottom-24 w-60 h-12 flex items-center justify-center bg-success text-black rounded-lg"
    >
      {toast}
    </AnimateIn>
  );
};

export default Toast;
