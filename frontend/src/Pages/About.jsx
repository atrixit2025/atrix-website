import React from "react";
import img1 from "../assets/AboutUs/imgpsh_fullsize_ani.png";
import img2 from "../assets/AboutUs/imgpsh_fullsize_anim2.png";
import img3 from "../assets/AboutUs/imgpsh_fullsize_anim1.png";
import img4 from "../assets/AboutUs/imgpsh_fullsize_anim4.png";
import img5 from "../assets/AboutUs/imgpsh_fullsize_anim5.png";
import img6 from "../assets/AboutUs/imgpsh_fullsize_anim3.png";
import OurSolution from "../Components/OurSolution";
import OurPortfolio from "../Components/OurPortfolio";
import Marquee from "react-fast-marquee";
import icon1 from "../assets/AboutUs/Transparency.svg"
import icon2 from "../assets/AboutUs/growth-support.svg"
import icon3 from "../assets/AboutUs/Good-Culture.svg"
import icon4 from "../assets/AboutUs/5day-working.svg"
import Button from "../Components/Button";


const About = () => {
  return (
    <>

      <div className="container mx-auto pt-42 max-w-[1600px] w-[80%]">
        <div className="row flex gap-3  mx-[-15px] ">
          <div className="col-6  ">
            <div className="img">
              <img src={img1} alt="" />
            </div>
          </div>
          <div className="col-3 ">
            <div className="img">
              <img src={img2} alt="" />
            </div>
          </div>
          <div className="col-3 ">
            <div className="img">
              <img src={img3} alt="" />
            </div>
          </div>
        </div>

        <div className="row flex gap-3 mt-4 mx-[-15px] ">
          <div className="col-3  ">
            <div className="img">
              <img src={img4} alt="" />
            </div>
          </div>
          <div className="col-6  ">
            <div className="img">
              <img src={img5} alt="" />
            </div>
          </div>
          <div className="col-3  ">
            <div className="img">
              <img src={img6} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-42 max-w-[1600px] w-[80%]">
        <div className="row text-center mx-[-15px]">
          <div className="col px-[15px] font-bold ">
            <h1>About US</h1>
          </div>
         </div> 

          <div className="row text-center  w-[80%] mx-auto ">
            <div className="col">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum earum explicabo quibusdam quam consequuntur,
                  repudiandae nisi dolorem, debitis perferendis recusandae at
                  accusantium expedita ducimus. Unde voluptates est deserunt
                  nulla dicta. Quis fugit deserunt hic. Odit, officia. Labore
                  accusamus voluptas consequatur itaque sint, temporibus quis
              
                </p>
            </div>
          </div>
        </div>




        <div className="container mx-auto mt-32 max-w-[1600px] w-[80%]  ">
          <div className="row  flex-col grid grid-cols-12 space-x-22 ">
            <div className="col-span-6 flex items-center justify-center ">
              <h2>Our Story</h2>
            </div>
            <div className="col-span-6 w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              molestiae consectetur obcaecati praesentium laborum cupiditate?
              Pariatur, architecto corrupti quibusdam sapiente maxime, dolorem,
              is mollitia    voluptatum iste incidunt placeat consequatur iusto velit ducimus
              minus possimus perferendis illo nostrum doloribus nobis magni
              alias eos sequi? Ratione, soluta. Animi ex assumenda iste delectus
              sunt aliquid explicabo suscipit quae excepturi facilis molestiae
              vero recusandae, voluptas sit voluptatum blanditiis rerum ipsum!
              Animi, sapiente. Ex laudantium explicabo et facere, corporis
              expedita!
            </div>
          </div>

          <div className="row   mt-12 flex-col grid grid-cols-12 space-x-22 ">
            <div className="col-span-6 flex items-center  text-center justify-center ">
              <h2>Mission</h2>
            </div>
            <div className="col-span-6 w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              molestiae consectetur obcaecati praesentium laborum cupiditate?
              Pariatur, architecto corrupti quibusdam sapiente maxime, dolorem,
             isci, praesentium excepturi eius dignissimos aut quasi facilis mollitia
              voluptatum iste incidunt placeat consequatur iusto velit ducimus
              minus possimus perferendis illo nostrum doloribus nobis magni
              alias eos sequi? Ratione, soluta. Animi ex assumenda iste delectus
              sunt aliquid explicabo suscipit quae excepturi facilis molestiae
              vero recusandae, voluptas sit voluptatum blanditiis rerum ipsum!
              Animi, sapiente. Ex laudantium explicabo et facere, corporis
              expedita!
            </div>
          </div>

          <div className="row   mt-12 flex-col grid grid-cols-12 space-x-22 ">
            <div className="col-span-6 flex items-center  text-center justify-center ">
              <h2>Vision</h2>
            </div>
            <div className="col-span-6 w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              molestiae consectetur obcaecati praesentium laborum cupiditate?
              Pariatur, architecto corrupti quibusdam sapiente maxime, dolorem,
         lis molestiae
              vero recusandae, voluptas sit voluptatum blanditiis rerum ipsum!
              Animi, sapiente. Ex laudantium explicabo et facere, corporis
              expedita!
            </div>
          </div>
        </div>


  <div className=" marquee-sec text-6xl font-bold mt-32">
        <div>
          <Marquee speed={30} className='overflow-hidden'>
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL . ACCESSIBLE . USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE
          </Marquee>
        </div>
        <div >
          <Marquee speed={30} direction="right" className=' overflow-hidden'>
            VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL . ACCESSIBLE . USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE
          </Marquee>
        </div>
        <div>
          <Marquee speed={30} className=' overflow-hidden'>
            ACCESSIBLE . USER-CENTR EMPOWERING . TRUSTWORTHY . SCALABLE . VISIONARY . INNOVATIVE . EFFICIENT . GL ROFESSIONAL .
          </Marquee>
        </div>
      </div>



        <div className="container mx-auto mt-28 max-w-[1600px] w-[80%]">
          <div className="row  flex-col grid grid-cols-12 space-x-96  ">
            <div className=" Our Solution Process col-span-12 ">
              <OurSolution />
            </div>
          </div>
        </div>

       
      <div className="Our Solution Process  ">
        <OurPortfolio />
      </div>

      <div className="Environment-sec">

        <div className="container mx-auto mt-28 max-w-[1600px] w-[80%] ">

          <div className="row"> 
            <div className="col">
              <p  >Visiontrek Environment</p>
              <h2>What let us thrive together</h2>
            </div>
          </div>

          <div className="row flex-col grid grid-cols-12 mt-10 ">

            <div className="col-span-3 flex items-center flex-col ">
              <div className="image w-20">
                 <img src={icon1} alt="" />
              </div>
              <p className="mt-2" >Transparency</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20">
                 <img src={icon2} alt="" />
              </div>
              <p className="mt-2" >Transparency</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20">
                 <img src={icon3} alt="" />
              </div>
              <p className="mt-2" >Transparency</p>
            </div>
            <div className="col-span-3 flex items-center flex-col  ">
              <div className="image w-20">
                 <img src={icon4} alt="" />
              </div>
              <p className="mt-2" >Transparency</p>
            </div>
         
          </div>
          <div className="row flex-col grid grid-cols-12 mt-10 bg-(--black)  p-10">
            <div className="col-span-10">
              <h3 className="text-white text-3xl " >We are always on the lookout for new talent!</h3>
            </div>
            <div className="col-span-2 text-black">
              <Button mybtn={"FDVDFjhvh"}  > </Button>
            </div>
          </div>


        </div>
    
      </div>









    </>
  );
};

export default About;
