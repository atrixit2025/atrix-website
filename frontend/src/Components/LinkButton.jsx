import React, { useEffect, useRef } from 'react'
import { RxArrowTopRight } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const LinkButton = ({ mybtn, btnLink }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 4;
      btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    };

    const resetTransform = () => {
      btn.style.transform = "translate(0px, 0px)";
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", resetTransform);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", resetTransform);
    };
  }, []);

  return (
    <div>
      <Link 
        to={`${btnLink}`}
        ref={btnRef}
        className="bg-(--navbarUlbgcolor) font-bold text-(--white) px-4 py-2 duration-300 rounded-lg hover:bg-(--green) cursor-pointer flex items-center gap-2 hover:scale-104 group service-cta-btn flex-in "
      >
        {mybtn}
        <span>
          <RxArrowTopRight
            id="btnArrow"
            className="group-hover:rotate-45 group-hover:scale-140 duration-250"
          />
        </span>
      </Link>
    </div>
  )
}

export default LinkButton