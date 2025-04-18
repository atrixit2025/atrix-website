import React, { useEffect } from "react";
import RiseWithUs from "../Components/career/RiseWithUs";
import CounterSec from "../Components/career/CounterSec";
import ValueCards from "../Components/career/ValueCards";
import PerksAtrix from "../Components/career/PerksAtrix";
import Roles from "../Components/career/Roles";
import CareerFormSec from "../Components/career/FormSec";
import HeroCommon from "../Components/HeroCommon";
import "./career.css"

import icon from "../assets/career/date.svg";



const herodata = [
  {
    title: "Career",
    desc: "",
  },
];

const ValueCardheading = [
  {
    secHeading: "Our Values",
    secSubHeading: ""
  }
]

const ValueCardContent = [
  {
    icon: icon,
    title: "One",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
  },
  {
    icon: icon,
    title: "one ",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
  },
  {
    icon: icon,
    title: "one",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
  },
  {
    icon: icon,
    title: "one",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
  },
  {
    icon: icon,
    title: "one",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
  },
  {
    icon: icon,
    title: "one",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
  },
];

const Careers = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="career-page" >
      <HeroCommon heroData={herodata[0]} />
      <RiseWithUs />
      <CounterSec />
      <ValueCards />
      <PerksAtrix />
      <Roles />
      <CareerFormSec />
    </div>
  );
};

export default Careers; 