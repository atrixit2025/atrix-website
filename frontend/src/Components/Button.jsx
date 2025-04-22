import React, { useRef, useEffect } from "react";
import { RxArrowTopRight } from "react-icons/rx";

const Button = ({ mybtn, targetRef }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;

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

  const handleClick = () => {
    if (typeof targetRef?.current?.scrollIntoView === "function") {
      targetRef.current.scrollIntoView(); // calling your custom function
    }
  };
  

  return (
    <div>
      <button
        onClick={handleClick}
        ref={btnRef}
        className="bg-(--navbarUlbgcolor) font-bold text-(--white) px-4 py-2 duration-300 rounded-lg hover:bg-(--green) cursor-pointer flex items-center gap-2 hover:scale-104 group"
      >
        {mybtn}
        <span>
          <RxArrowTopRight className="group-hover:rotate-45 group-hover:scale-140 duration-250 text-white" />
        </span>
      </button>
    </div>
  );
};

export default Button;
