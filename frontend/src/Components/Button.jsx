import React from 'react'
import { RxArrowTopRight } from "react-icons/rx";

const Button = ({mybtn}) => {
  return (
    <div>
       <button className="bg-(--navbarUlbgcolor)  font-bold text-(--white) px-4 py-2  duration-300 rounded-lg hover:bg-(--green) cursor-pointer  flex items-center gap-2">
                                {mybtn} <span className=''><RxArrowTopRight className='' /></span>
                            </button>
    </div>
  )
}

export default Button
