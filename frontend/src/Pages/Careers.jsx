import React, { useEffect, useRef, useState } from "react";
import RiseWithUs from "../Components/career/RiseWithUs";
import CounterSec from "../Components/career/CounterSec";
import ValueCards from "../Components/career/ValueCards";
import PerksAtrix from "../Components/career/PerksAtrix";
import Roles from "../Components/career/Roles";
import CareerFormSec from "../Components/career/FormSec";
import HeroCommon from "../Components/HeroCommon";
import "./career.css";

const herodata = [
  { title: "Career", desc: "" },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const rolesSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToRolesSection = () => {
    rolesSectionRef.current?.scrollToSection();
  };

  const handleApplyClick = (jobTitle) => {
    setSelectedJob(jobTitle);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="career-page">
      <HeroCommon heroData={herodata[0]} />

      <RiseWithUs scrollToRolesSection={scrollToRolesSection} />

      <CounterSec />
      <ValueCards />
      <PerksAtrix />

      <Roles ref={rolesSectionRef} onApplyClick={handleApplyClick} />

      <div ref={formSectionRef}>
        <CareerFormSec selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default Careers;
