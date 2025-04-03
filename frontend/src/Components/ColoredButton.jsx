import React from 'react'
import { Link } from 'react-router-dom'

const ColoredButton = ({ buttonName, buttonLink }) => {
    return (
        <>
            <Link to={buttonLink}
                className={` py-2 px-12 rounded-3xl cursor-pointer font-bold  bg-gradient-to-r from-(--blue) to-(--green) text-white`}>
                {buttonName}
            </Link>
        </>
    )
}

export default ColoredButton