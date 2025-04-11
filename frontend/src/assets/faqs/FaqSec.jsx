import React, { useEffect, useRef, useState } from "react";
import './faq.css';

const FaqsCard = (props) => {
    const answerElRef = useRef();
    const [state, setState] = useState(false);
    const [answerH, setAnswerH] = useState("0px");
    const { faqsList, idx } = props;

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight;
        setState(!state);
        setAnswerH(`${answerElH + 0}px`);
    };

    return (
        <div
            className="accordian overflow-hidden"
            key={idx}
        >
            <h4 className={`accordian-title ${state ? "active" : ""}`}
                onClick={handleOpenAnswer}>
                {faqsList.q}
                {state ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-100 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H4"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-200 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                )}
            </h4>
            <div
                ref={answerElRef}
                className="duration-300"
                style={state ? { height: answerH } : { height: "0px" }}
            >
                <div className="bodyContent">
                    <p>{faqsList.a}</p>
                </div>
            </div>
        </div>
    );
};

export default () => {

    const faqsData = [
        {
            category: "Graphic Designing",
            content: [
                {
                    q: "What is graphic design?",
                    a: "Graphic design is the process of creating visual content to communicate messages. It includes designing logos, advertisements, websites, and more.",
                },
                {
                    q: " What are the types of graphic design?",
                    a: "Common types include branding, web design, print design, and motion graphics. Each type serves a different purpose in marketing and communication.",
                },
                {
                    q: " What tools do graphic designers use?",
                    a: "Designers use software like Adobe Photoshop, Illustrator, and Canva. These tools help create high-quality visuals for different platforms.",
                },
                {
                    q: "Why is graphic design important for businesses?",
                    a: "It helps businesses build a strong brand identity and attract customers. A well-designed logo or website makes a lasting impression.",
                },
                {
                    q: "What makes a good logo design?",
                    a: "A good logo is simple, memorable, and represents your brand identity. It should work well on different platforms and sizes.",
                },
            ]
        },
        {
            category: "Web Development ",
            content: [
                {
                    q: "Will my website be mobile-friendly??",
                    a: " Yes! We design websites that adjust to all screen sizes, ensuring a smooth user experience. A mobile-friendly site also helps improve search rankings.",
                },
                {
                    q: "How long does it take to build a website?",
                    a: " It typically takes 1 to 4 months, depending on the complexity and features required. The process includes planning, design, development, and testing.",
                },
                {
                    q: "What’s the difference between a website and a web app?",
                    a: "A website provides information, while a web app allows user interaction. Web apps often have advanced features like forms and dashboards.",
                },
                {
                    q: "What programming languages are used in web development?",
                    a: " Common languages include HTML, CSS, JavaScript, and Python. The choice depends on the project requirements and functionality needed.",
                },
                {
                    q: "How much does it cost to develop a website?",
                    a: "The cost varies based on complexity, features, and design. Simple websites cost less, while custom-built sites are more expensive.",
                },
            ]
        },
        {
            category: "Digital Marketing",
            content: [
                {
                    q: "What is digital marketing?",
                    a: "Digital marketing is the promotion of products or services online. It includes SEO, social media, paid ads, and content marketing.",
                },
                {
                    q: "What are the main types of digital marketing?",
                    a: "Key types include SEO, PPC, social media, email, and content marketing. Each type targets different audiences and business goals.",
                },
                {
                    q: "How cost-effective is digital marketing compared with traditional marketing?",
                    a: "Digital marketing is more affordable and targeted than traditional marketing. It reaches the right audience at the right time, reducing unnecessary costs.",
                },
                {
                    q: "How do you identify a successful digital marketing company?",
                    a: "A good agency focuses on your goals, offers clear reporting, and has proven results. Avoid companies that promise instant success.",
                },
                {
                    q: "How long does it take to see results from digital marketing?",
                    a: "SEO takes months to show results, while paid ads work quickly. The timeline depends on strategy, competition, and industry trends.",
                },
            ]
        },
        {
            category: "Visual Effects (VFX)",
            content: [
                {
                    q: " What’s the difference between VFX and special effects (SFX)?",
                    a: "VFX is made using computers, while SFX includes real things like fire, smoke, and props. VFX is added after filming, but SFX happens during filming.",
                },
                {
                    q: "Can VFX be used in social media videos?",
                    a: "Yes, VFX can make social media videos more fun with cool effects and animations. It helps videos look more creative and get more views.",
                },
                {
                    q: "Is VFX expensive to create?",
                    a: "The cost depends on how simple or advanced the effects are. Basic effects are cheaper, but big, detailed ones cost more.",
                },
                {
                    q: "Which software is used for VFX?",
                    a: "Popular VFX tools include After Effects, Maya, Blender, and Nuke. These programs help create stunning effects for films and ads.",
                },
                {
                    q: " Where is VFX used?",
                    a: "VFX is used in movies, gaming, commercials, and social media videos. It enhances visual storytelling and creates engaging content.",
                },
            ]
        },
        {
            category: " Photo/Videography ",
            content: [
                {
                    q: "  What are the types of photography?",
                    a: "Common types include portrait, product, event, and landscape photography. Each serves different purposes in storytelling and branding.",
                },
                {
                    q: "What’s the difference between DSLR and mirrorless cameras?",
                    a: "DSLRs use mirrors to capture images, while mirrorless cameras don’t. Mirrorless cameras are lighter and better for video recording.",
                },
                {
                    q: "How can professional photography make my brand stand out?",
                    a: "High-quality photos create a strong first impression and make your brand look more professional and trustworthy.",
                },
                {
                    q: "What’s the difference between a highlight video and a full-length video?",
                    a: "A highlight video is a short, engaging recap, while a full-length video captures all the details of your event.",
                },
                {
                    q: " Can I remove unwanted objects or people from my photos?",
                    a: "Yes, advanced editing tools can remove unwanted objects or people. This helps make the photo look clean and professional.",
                },
            ]
        },
        {
            category: "Staffing ",
            content: [
                {
                    q: " How does a staffing agency work?",
                    a: "A staffing agency connects employers with qualified candidates. It handles recruitment, interviews, and job placements.",
                },
                {
                    q: "What are the types of staffing?",
                    a: " Staffing includes temporary, permanent, contract, and remote hiring. Different types suit different business requirements.",
                },
                {
                    q: "What are the benefits of using a staffing agency?",
                    a: " It saves time, reduces hiring costs, and ensures skilled employees. Businesses get access to a wider talent pool.",
                },
                {
                    q: "What industries use staffing services?",
                    a: " IT, healthcare, logistics, and customer service rely on staffing. Agencies help find professionals in various fields.",
                },
                {
                    q: "  Do staffing agencies handle employee payroll?",
                    a: "Some agencies manage payroll and benefits, while others only assist in hiring.",
                },
            ]
        },
        {
            category: " Logistics ",
            content: [
                {
                    q: "  What is logistics?",
                    a: "Logistics is the process of managing the transportation and storage of goods. It ensures products are delivered efficiently.",
                },
                {
                    q: "What are the types of logistics?",
                    a: "Types include inbound, outbound, third-party (3PL), and reverse logistics. Each focuses on different supply chain needs.",
                },
                {
                    q: "What’s the difference between supply chain and logistics?",
                    a: "Logistics deals with transportation and storage, while the supply chain includes the entire production and distribution process.",
                },
                {
                    q: " Why is logistics important?",
                    a: "It ensures smooth delivery, reduces costs, and improves efficiency. Businesses rely on logistics for timely operations.",
                },
                {
                    q: " What are the key components of logistics?",
                    a: "Logistics includes transportation, warehousing, inventory management, and order fulfillment. These ensure a seamless supply chain.",
                },
            ]
        },

    ];


    return (
        <>
            {/* <section>
                <div className=" grid grid-cols-2 gap-y-28">
                    <div className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
                        <div className="space-y-3 text-center">
                            <h1 className="text-3xl  font-semibold">
                                Graphic Designing
                            </h1>

                        </div>
                        <div className="mt-14 max-w-2xl mx-auto">
                            {faqsList.map((item, idx) => (
                                <FaqsCard idx={idx} faqsList={item} />
                            ))}
                        </div>
                    </div>
                    <div className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
                        <div className="space-y-3 text-center">
                            <h1 className="text-3xl  font-semibold">
                                Graphic Designing
                            </h1>

                        </div>
                        <div className="mt-14 max-w-2xl mx-auto">
                            {faqsList.map((item, idx) => (
                                <FaqsCard idx={idx} faqsList={item} />
                            ))}
                        </div>
                    </div>
                    <div className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
                        <div className="space-y-3 text-center">
                            <h1 className="text-3xl  font-semibold">
                                Graphic Designing
                            </h1>

                        </div>
                        <div className="mt-14 max-w-2xl mx-auto">
                            {faqsList.map((item, idx) => (
                                <FaqsCard idx={idx} faqsList={item} />
                            ))}
                        </div>
                    </div>
                    <div className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
                        <div className="space-y-3 text-center">
                            <h1 className="text-3xl  font-semibold">
                                Graphic Designing
                            </h1>

                        </div>
                        <div className="mt-14 max-w-2xl mx-auto">
                            {faqsList.map((item, idx) => (
                                <FaqsCard idx={idx} faqsList={item} />
                            ))}
                        </div>
                    </div>
                </div>

            </section> */}

            <section className="faqsec py-16">
                <div className="container mx-auto">
                    <div className=" grid grid-cols-2 gap-y-15 gap-x-15">
                        {faqsData.map((item, index) => (
                            <div className="leading-relaxed mt-12">
                                <div className="space-y-3 text-center">
                                    <h1 className="text-3xl faqCatHeading  font-semibold">
                                        {item.category}
                                    </h1>
                                </div>
                                <div className="mt-8">
                                    {item.content.map((item, idx) => (
                                        <FaqsCard idx={idx} faqsList={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>


    );
};
