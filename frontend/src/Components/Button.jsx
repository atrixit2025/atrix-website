import React from "react";
import { RxArrowTopRight } from "react-icons/rx";

import { Link } from "react-router-dom"

const Button = ({ mybtn, btnLink }) => {
  return (
    <div>

      
      <Link to={btnLink} > <button className="bg-(--navbarUlbgcolor)  font-bold text-(--white) px-4 py-2  duration-300  rounded-lg hover:bg-(--green) cursor-pointer  flex items-center gap-2 hover:scale-104  group ">
        {mybtn} <span className=''><RxArrowTopRight className='group-hover:rotate-45 group-hover:scale-140 duration-250 text-white ' /></span>

      </button>  </Link>
    </div>
  );
};

export default Button;
