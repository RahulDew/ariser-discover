import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Bars color="#0284c7" height={80} width={80} />
    </div>
  );
};

export default Loading;
