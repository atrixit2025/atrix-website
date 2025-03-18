import React, { useEffect, Suspense, useRef, useState } from 'react';
import './home.css';
import '../CSS/tying.css';
import ParticleEffect from '../Components/ParticleEffect';
import TypewriterEffect from '../Components/TyingWriter';
import LogoSlider from '../Components/marqueelogo/LogoSlider';
import Button from '../Components/Button';
import useIntersectionObserver from '../Components/useIntersectionObserver';
import AboutImage from "../assets/AboutImage.jpg";
import Assetarrow from "../assets/Asset 1arrow.svg"
const OurServices = React.lazy(() => import('../Components/OurServices'));
const VideoSection = React.lazy(() => import('../Components/VideoSection'));
const OurSolution = React.lazy(() => import('../Components/OurSolution'));
const OurPortfolio = React.lazy(() => import('../Components/OurPortfolio'));
const Technology = React.lazy(() => import('../Components/Technology'));
const LetterMarquee = React.lazy(() => import('../Components/marqueelogo/letterMarquee'));
import video from "../assets/atrix office shoot comressed.mp4"


const Home = () => {
  const ourServicesRef = useRef(null);
  const countSectionRef = useRef(null);
  const ourSolutionRef = useRef(null);
  const ourPortfolioRef = useRef(null);
  const technologyRef = useRef(null);
  const letterMarqueeRef = useRef(null);

  const [visibleComponents, setVisibleComponents] = useState({
    ourServices: false,
    countSection: false,
    ourSolution: false,
    ourPortfolio: false,
    technology: false,
    letterMarquee: false,
  });

  const isOurServicesVisible = useIntersectionObserver(ourServicesRef, { threshold: 0.1 });
  const isCountSectionVisible = useIntersectionObserver(countSectionRef, { threshold: 0.1 });
  const isOurSolutionVisible = useIntersectionObserver(ourSolutionRef, { threshold: 0.1 });
  const isOurPortfolioVisible = useIntersectionObserver(ourPortfolioRef, { threshold: 0.1 });
  const isTechnologyVisible = useIntersectionObserver(technologyRef, { threshold: 0.1 });
  const isLetterMarqueeVisible = useIntersectionObserver(letterMarqueeRef, { threshold: 0.1 });

  useEffect(() => {
    if (isOurServicesVisible) {
      setVisibleComponents((prev) => ({ ...prev, ourServices: true }));
    }
  }, [isOurServicesVisible]);

  useEffect(() => {
    if (isCountSectionVisible) {
      setVisibleComponents((prev) => ({ ...prev, countSection: true }));
    }
  }, [isCountSectionVisible]);

  useEffect(() => {
    if (isOurSolutionVisible) {
      setVisibleComponents((prev) => ({ ...prev, ourSolution: true }));
    }
  }, [isOurSolutionVisible]);

  useEffect(() => {
    if (isOurPortfolioVisible) {
      setVisibleComponents((prev) => ({ ...prev, ourPortfolio: true }));
    }
  }, [isOurPortfolioVisible]);

  useEffect(() => {
    if (isTechnologyVisible) {
      setVisibleComponents((prev) => ({ ...prev, technology: true }));
    }
  }, [isTechnologyVisible]);

  useEffect(() => {
    if (isLetterMarqueeVisible) {
      setVisibleComponents((prev) => ({ ...prev, letterMarquee: true }));
    }
  }, [isLetterMarqueeVisible]);

  useEffect(() => {
    const elements = document.querySelectorAll('.moveWithMouse');

    const moveElements = (e) => {
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const moveX = (mouseX - (rect.left + rect.width / 100)) / 160;
        const moveY = (mouseY - (rect.top + rect.height / 100)) / 160;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', moveElements);

    return () => {
      window.removeEventListener('mousemove', moveElements);
    };
  }, []);

  const lines = [
    '  innovative,growing,creative',
    '  building the future',
    '  empowering your ideas',
  ];


  return (
    <>
      <div className=" overflow-hidden">
        <div className="relative w-full text-(--whitelight) hero_section">
          <div className="pointer-events-none absolute inset-0 h-full">
            <ParticleEffect />
          </div>
          <div className='container mx-auto  max-w-[1280px] w-[90%]'>
            <div className="flex justify-center items-center md:min-h-screen md:py-46 py-40 ">
              <div className="text-center relative">
                <h1 className="text-(--whitelight) mt-5 text-6xl md:text-8xl lg:text-9xl">
                  <div className="relative inline-block">
                    <div className="font-bold tracking-wider">We deliver</div>
                    <div className="absolute md:bottom-[4%] bottom-[80%]  md:-right-[20%]  right-0 text-center z-0 animateFromTop tracking-normal">
                      <p className="bg-(--white) text-(--black) border font-body border-transparent rounded-4xl md:px-8  px-2 py-1 text-sm md:text-2xl -rotate-7 font-bold moveWithMouse">
                        Marketing
                      </p>
                    </div>
                  </div>

                  <div className="lg:flex  flex-wrap items-center justify-center flexhome  ">
                    <div className="relative inline-block">
                      <div className="font-bold tracking-wider">personal</div>
                      <div className="absolute lg:-top-[2%] -top-[12%] left-[0%] text-center z-0 animateFromTop tracking-normal">
                        <p className="bg-(--green) text-(--black) font-body border border-transparent rounded-4xl md:px-8  px-2 py-1 text-sm md:text-2xl rotate-5 font-bold moveWithMouse">
                          Web Development
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                    <div className="relative typewiter-wraper   md:text-5xl text-lg md:w-[45rem] w-[20rem]  font-normal rounded-full md:px-16 px-3 mt- font-body">
                      <TypewriterEffect
                        lines={lines}
                        speed={170}
                        deleteSpeed={100}
                        delay={1500}
                      />
                    </div>
                    </div>
                  </div>

                  <div className="relative inline-block">
                    <div className='flex '>
                    <div className="font-bold tracking-wider ">solutions</div>
                    <img src={Assetarrow}  className='w-auto lg:h-22 h-12 md:ml-5 ml-2 mt-1 moveWithMouse'/>
                    </div>
                    <div className="absolute -bottom-[25%] md:bottom-[10%] md:-left-[25%] text-center z-0 animateFromTop tracking-normal">
                      <p className="bg-(--blue) text-(--black) border   font-body border-transparent rounded-4xl md:px-8  px-2 py-1 text-sm md:text-2xl rotate-12 font-bold moveWithMouse">
                        Brand Identity
                      </p>
                      
                    </div>
                  </div>
                </h1>

                <div className="text-center z-20 flex justify-center ">
                  <p className="text-(--white) lg:px-10 lg:py-2 md:text-xl text-sm mt-12 font-semibold  max-w-[950px]">
                    Founded with a passion for innovation, our team of young talents brings a fresh perspective to the world of IT and beyond, offering unique and creative solutions tailored to meet the evolving needs of our clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <LogoSlider className="max-w-full" />
      <div className=" py-10  container mx-auto ">

        <div className=" ">
          <h1 className="font-bold flex justify-center lg:right-60 top-14 relative text-8xl md:text-9xl text-transparent z-10" style={{ WebkitTextStroke: "1px white" }}>About us</h1>
          <div className="lg:flex items-center ">
            <div className='inline-block relative max-w-[100%]'>
              <img src={AboutImage} className="h-full  w-auto min-h-[600px] object-cover relative max-w-[100%]" alt="About Us" />
              {/* <video
                      src={video}
                      autoPlay 
                      muted 
                      loop 
                      controls={false} 
                      style={{ width: "100%", height: "auto" }} 
                     className=" w-auto  object-cover relative max-w-[100%]"
                    /> */}
            </div>
            <div className="text-(--white) lg:-ml-16  relative w-full lg:max-w-[40%] px-5 ">
              <p className="text-xl sm:text-md font-semibold text-(--gray) mb-2">Our Vision</p>
              <h5 className="lg:text-5xl text-2xl font-bold mb-5">Unlock Revenue Growth for Your Business</h5>
              <h6 className="lg:text-2xl text-xl sm:text:lg font-semibold mb-10">Our goal is to make it as easy as possible for you to walk away with the solution that suits your needs perfectly.</h6>
              <div className="border border-(--black) mb-5"></div>
              <p className="text-md text-(--gray) mb-4">Through our years of experience, we’ve also learned that while each channel has its own set of advantages, they all work best when strategically paired with other channels. This is the main factor that sets us apart from our competition and allows us to deliver a specialist business consultancy service.</p>
              <Button mybtn={"Learn More"} />
            </div>
          </div>
        </div>
      </div>

      <div ref={ourServicesRef}>
        {visibleComponents.ourServices ? (
          <Suspense fallback={<div className="text-(--white) text-center py-20 "></div>}>
            <OurServices />
          </Suspense>
        ) : (
          <div className="text-(--white) text-center py-20">
           
          </div>
        )}
      </div>

      <div ref={countSectionRef}>
        {visibleComponents.countSection ? (
          <Suspense fallback={<div className="text-(--white) text-center py-20"></div>}>
            <VideoSection />
          </Suspense>
        ) : (
          <div className="text-(--white) text-center py-20"></div>
        )}
      </div>

      <div ref={ourSolutionRef}>
        {visibleComponents.ourSolution ? (
          <Suspense fallback={<div className="text-(--white) text-center py-20"></div>}>
            <OurSolution />
          </Suspense>
        ) : (
          <div className="text-(--white) text-center py-20"></div>
        )}
      </div>

      <div ref={ourPortfolioRef}>
        {visibleComponents.ourPortfolio ? (
          <Suspense fallback={<div className="text-(--white) text-center py-20"></div>}>
            <OurPortfolio />
          </Suspense>
        ) : (
          <div className="text-(--white) text-center py-20"></div>
        )}
      </div>

      <div ref={technologyRef}>
        {visibleComponents.technology ? (
          <Suspense fallback={<div className="text-(--white) text-center py-20"></div>}>
            <Technology />
          </Suspense>
        ) : (
          <div className="text-(--white) text-center py-20"></div>
        )}
      </div>

      <div ref={letterMarqueeRef}>
        {visibleComponents.letterMarquee ? (
          <Suspense fallback={<div className="text-(--white) text-center py-20"></div>}>
            <LetterMarquee />
          </Suspense>
        ) : (
          <div className="text-(--white) text-center py-20"></div>
        )}
      </div>
    </>
  );
};

export default Home;