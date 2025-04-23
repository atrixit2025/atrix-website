import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { BsCalendar2Date } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";


const rolesData = [
  { title: "Graphic Designer", desc: "Lorem ipsum...", btnLink: "#" , date:"12/12/2025",Education:"12th", experince:"min-1year"  },
  { title: "Web Development", desc: "Lorem ipsum...", btnLink: "#" , date:"12/12/2025",Education:"12th", experince:"min-1year" },
  { title: "SEO", desc: "Lorem ipsum...", btnLink: "#" , date:"12/12/2025",Education:"12th", experince:"min-1year" },
  { title: "Broker", desc: "Lorem ipsum...", btnLink: "#" , date:"12/12/2025",Education:"12th", experince:"min-1year" },
  { title: "content writer", desc: "Lorem ipsum...", btnLink: "#" , date:"12/12/2025",Education:"12th", experince:"min-1year" },
];

const Roles = forwardRef(({ onApplyClick }, ref) => {
  const sectionRef = useRef(null);
  

  useImperativeHandle(ref, () => ({
    scrollToSection: () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
  }));

  return (
    <div id="vacancies-sec" ref={sectionRef}>
      <div className="container mx-auto pt-32">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl text-center font-bold mb-5">Job Vacancies</h2>
          <p className="max-w-[600px] mx-auto text-center">
            Explore exciting job opportunities and take the next step in your career.
          </p>
        </div>

        <div className="role-cards-wrapper">
          {rolesData.map((item, index) => (
            <div
              key={index}
              className="group flex justify-between items-center gap-7 md:px-14 py-10 border-b hover:bg-[var(--blue)] hover:border-b-[var(--blue)] transition duration-300"
            >
              <div className="role-card">
                <h3 className="text-3xl font-semibold">{item.title}</h3>
                <p className=' flex  gap-16  pt-3' >
                  <p className='flex gap-2 items-center' > <BsCalendar2Date />
                  {item.date}</p>
                  <p className='flex gap-2 items-center' >  <FaGraduationCap />
                  {item.Education}</p>
                  <p className='flex gap-2 items-center' ><BsPersonWorkspace />
                  {item.experince}</p>
                  
                </p>
                <p className="mt-4">{item.desc}</p>
              </div>
              <div>
              <span
  onClick={() => onApplyClick(item.title)}
  className="flex hover:cursor-pointer gap-3.5 text-xl font-bold"
>
  Apply
  <span className="border border-white/45 items-center h-8 w-8 rounded-full flex justify-center -rotate-45 text-[var(--blue)] group-hover:text-white duration-300 group-hover:rotate-1">
    <FaArrowRight />
  </span>
</span>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Roles;
