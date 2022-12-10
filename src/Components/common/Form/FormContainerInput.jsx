import React from "react";

export default function FormContainerInput({ children }) {
  return (
    <div className="w-full lg:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto gap-y-4 content-center">
      {children}
    </div>
  );
}
