import React, { useEffect, Suspense, useRef, useState } from 'react';
import './home.css';
import '../CSS/tying.css';
import ParticleEffect from '../Components/ParticleEffect';
import TypewriterEffect from '../Components/TyingWriter';
import LogoSlider from '../Components/marqueelogo/LogoSlider';
import Button from '../Components/Button';
import useIntersectionObserver from '../Components/useIntersectionObserver';
import AboutImage from "../assets/AboutImage.jpg";
// import About_Video from "../assets/Atrix Website 4 compress Full szie video .mp4"
import Assetarrow from "../assets/Asset 1arrow.svg"
const OurServices = React.lazy(() => import('../Components/OurServices'));
const VideoSection = React.lazy(() => import('../Components/VideoSection'));
const OurSolution = React.lazy(() => import('../Components/OurSolution'));
const OurPortfolio = React.lazy(() => import('../Components/OurPortfolio'));
const Technology = React.lazy(() => import('../Components/Technology'));
const LetterMarquee = React.lazy(() => import('../Components/marqueelogo/letterMarquee'));
import video_circle from '../assets/video_circle.svg'
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';
import about_video from '../assets/About_video.mp4'
import './modal-video-custom.css'; // Replace the default import

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
    '  Empowering, Innovative',
    ' Global. Professional',
    ' Accessible, User-centric ',
    'Visionary, Trustworthy'
  ];


  // const [isOpen, setIsOpen] = useState(false);

  // popup video js 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);





  return (
    <div >

      <div className=" overflow-hidden">
        <div className="relative w-full text-(--whitelight) hero_section">
          <div className="pointer-events-none absolute inset-0 h-full">
            <ParticleEffect />
          </div>
          <div className='container mx-auto   '>
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
                      <img src={Assetarrow} className='w-auto lg:h-22 h-12 md:ml-5 ml-2 mt-1 moveWithMouse' />
                    </div>

                    <div className="absolute -bottom-[25%] md:bottom-[10%] md:-left-[25%] text-center z-0 animateFromTop tracking-normal">
                      <p className="bg-(--blue) text-(--black) border   font-body border-transparent rounded-4xl md:px-8  px-2 py-1 text-sm md:text-2xl rotate-12 font-bold moveWithMouse">
                        Brand Identity
                      </p>
                    </div>

                    <div className="absolute -bottom-[25%] md:-bottom-[5%] md:left-[68%] text-center z-0 animateFromTop tracking-normal">
                      <p className="bg-(--green) text-(--black) border   font-body border-transparent rounded-4xl md:px-8  px-2 py-1 text-sm md:text-2xl rotate-12 font-bold moveWithMouse">
                        Visual
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
      <div className=" py-10  container mx-auto  ">

        <div className=" ">
          <h1 className="font-bold flex justify-center lg:right-60 top-14 relative text-8xl md:text-9xl text-transparent z-10" style={{ WebkitTextStroke: "1px white" }}>About us</h1>
          <div className="lg:flex items-center ">
            <div className='inline-block relative max-w-[100%] '>
              <img src={AboutImage} className="h-full  w-auto min-h-[600px] object-cover relative max-w-[100%]" alt="About Us" />

              <div className='video-button-sec' >
                <div className="video-circle">
                  <img src={video_circle} alt="" className='w-full h-full object-cover' />
                </div>

                <button className="js-modal-btn hover:text-(--blue)    transition-all  video-icon text-6xl text-white ml-[5px] cursor-pointer" onClick={() => setIsOpen(true)}>
                  <CiPlay1 />
                </button>
                <ModalVideo
                  channel="custom"
                  isOpen={isOpen}
                  url={about_video}
                  onClose={() => setIsOpen(false)}
                  allowFullScreen={true}
                  animationSpeed={300}
                  modalStyle={{
                    content: {
                      width: '90%',
                      maxWidth: '1200px',
                      margin: '0 auto',
                      padding: 0,
                      border: 'none',
                      background: 'transparent'
                    },
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)!important',
                      zIndex: 1000
                    }
                  }}
                />
              </div>

              {/* <video
                      src={About_Video}
                      autoPlay 
                      muted 
                      loop 
                      controls={false} 
                      style={{ width: "100%", height: "auto" }} 
                     className=" w-auto  object-cover relative max-w-[100%]"
                    /> */}
            </div>


            <div className="text-(--white) lg:-ml-16  relative w-full lg:max-w-[40%] px-5 ">
              <p className="text-xl sm:text-md font-semibold text-(--gray) mb-2">Who We Are</p>
              <h5 className="lg:text-5xl text-2xl font-bold mb-5">Trusted Experts in Taking Your Business Higher</h5>

              <p className="text-md text-(--gray) pb-4">Struggling to keep up in today’s fast-changing digital world? Don’t worry!, Atrix IT Solutions is here to help your business succeed!
              </p>
              <p className="text-md text-(--gray) pb-4">We do more than just offer IT services - we create smart solutions that drive real success. With a passion for innovation, we’ve built a team of experts dedicated to helping businesses grow and stay ahead in the digital world.
              </p>
              <p className="text-md text-(--gray) pb-4">From custom software development to strong IT infrastructure and reliable support, we provide solutions tailored to your needs, ensuring smooth growth and long-term success.
              </p>
              <p className="text-md text-(--gray) pb-10 ">Look no further! Let’s turn your vision into reality together.

              </p>

              <Button btnLink={"/about"} mybtn={"Learn More"} />

            </div>
          </div>
        </div>
      </div>

      <div className=' ' ref={ourServicesRef}>
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
          <div className="text-(--white) text-center py-20 "></div>
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
    </div>
  );
};

export default Home;