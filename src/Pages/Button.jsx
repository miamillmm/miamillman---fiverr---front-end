import React from "react";
import Translate from "../utils/Translate";

const Button = () => {
  return (
    <div>
      {" "}
      <button className="bg-[#ff9540] text-[#314352] my-3 ml-20 text-[18px] font-light px-4 py-2 rounded-md cursor-pointer">
        <Translate text={"Add Listing"} /> <span>+</span>
      </button>
    </div>
  );
};

export default Button;
