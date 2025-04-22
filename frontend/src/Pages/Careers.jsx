import React, { useEffect, useRef } from "react";
import RiseWithUs from "../Components/career/RiseWithUs";
import CounterSec from "../Components/career/CounterSec";
import ValueCards from "../Components/career/ValueCards";
import PerksAtrix from "../Components/career/PerksAtrix";
import Roles from "../Components/career/Roles";
import CareerFormSec from "../Components/career/FormSec";
import HeroCommon from "../Components/HeroCommon";
import "./career.css";

import icon from "../assets/career/date.svg";

const herodata = [
  { title: "Career", desc: "" },
];

const Careers = () => {
  const rolesSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToRolesSection = () => {
    rolesSectionRef.current?.scrollToSection();
  };

  const scrollToFormSection = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="career-page">
      <HeroCommon heroData={herodata[0]} />

      <RiseWithUs scrollToRolesSection={scrollToRolesSection} />

      <CounterSec />
      <ValueCards />
      <PerksAtrix />

      <Roles ref={rolesSectionRef} onApplyClick={scrollToFormSection} />

      {/* Attach ref to CareerFormSec */}
      <div ref={formSectionRef}>
        <CareerFormSec />
      </div>
    </div>
  );
};

export default Careers;
