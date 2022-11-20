import React from "react";

const LayoutForm = ({ children }) => {
  return (
    <div className="w-full md:bg-slate-50 lg:bg-slate-50 mx-auto h-full  flex items-center justify-center">
      {children}
    </div>
  );
};

export default LayoutForm;
