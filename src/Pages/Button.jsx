import React from "react";
import { Link } from "react-router";

const Button = () => {
  return (
    <div>
      {" "}
      <button className="bg-[#ff9540] text-[#314352] my-3 ml-20 text-[18px] font-light px-4 py-2 rounded-md cursor-pointer">
        <Link to="/addlisting">
          Add Listing <span>+</span>
        </Link>
      </button>
    </div>
  );
};

export default Button;
