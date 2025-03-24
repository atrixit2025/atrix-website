import React from "react";

import { Link } from "react-router-dom"

const Button = ({ mybtn, btnLink }) => {
  return (
    <div>
      <Link to={btnLink} > <button className="bg-(--navbarUlbgcolor)  font-bold text-(--white) px-4 py-2  duration-300  rounded-lg hover:bg-(--green) cursor-pointer  flex items-center gap-2">
        {mybtn} <span className=''><RxArrowTopRight className='' /></span>
      </button>  </Link>
    </div>
  );
};

export default Button;
