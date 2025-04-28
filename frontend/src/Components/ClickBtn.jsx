import React, { useRef, useEffect } from "react";
import { RxArrowTopRight } from "react-icons/rx";

const ClickBtn = ({ mybtn, targetRef }) => {
    const btnRef = useRef(null);

    // Hover animation
    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 4;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
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

    // Scroll to target
    const handleClick = () => {
        if (targetRef?.current) {
            targetRef.current.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <button
            ref={btnRef}
            onClick={handleClick}
            className="bg-[--navbarUlbgcolor] font-bold text-[--white] px-6 py-3 duration-300 rounded-lg hover:bg-[--green] cursor-pointer flex items-center gap-2 hover:scale-[1.03] group service-cta-btn"
        >
            {mybtn}
            <span className="transition-transform duration-250">
                <RxArrowTopRight className="group-hover:rotate-45 group-hover:scale-[1.4] transition-transform duration-250" />
            </span>
        </button>
    );
};

export default ClickBtn;