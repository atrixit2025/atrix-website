import React, { useEffect, useRef, useState } from "react";

const FaqsCard = (props) => {
    const answerElRef = useRef();
    const [answerH, setAnswerH] = useState("0px");
    const { faqsList, idx, isOpen, onClick } = props;

    const handleOpenAnswer = () => {
        onClick(idx); // Notify parent about the click
    };

    useEffect(() => {
        // Update height when open state changes
        if (isOpen) {
            const answerElH = answerElRef.current.childNodes[0].offsetHeight;
            setAnswerH(`${answerElH + 0}px`);
        } else {
            setAnswerH("0px");
        }
    }, [isOpen]);

    return (
        <div className="accordian overflow-hidden" key={idx}>
            <h4 
                className={`accordian-title ${isOpen ? "active" : ""}`}
                onClick={handleOpenAnswer}
            >
                {faqsList.q}
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-100 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
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
                style={{ height: answerH }}
            >
                <div className="bodyContent">
                    <p>{faqsList.a}</p>
                </div>
            </div>
        </div>
    );
};

const faqsData = [
    {
        category: "Frequently Asked Questions ",
        content: [
            {
                q: "Will my website be mobile-friendly?",
                a: " Yes! We design websites that adjust to all screen sizes, ensuring a smooth user experience. A mobile-friendly site also helps improve search rankings.",
            },
            {
                q: "How long does it take to build a website?",
                a: " It typically takes 1 to 4 months, depending on the complexity and features required. The process includes planning, design, development, and testing.",
            },
            {
                q: "What's the difference between a website and a web app?",
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
];

const FaqSection = ({secData}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="faqsec ">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-y-15 gap-x-15 max-w-[900px] mx-auto">
                    {secData.faqs.map((item, index) => (
                        <div className="leading-relaxed mt-12" key={index}>
                            <div className="space-y-3 text-center">
                                <h2 className="text-4xl faqCatHeading font-semibold mb-10">
                                Frequently Asked Questions
                                </h2>
                            </div>
                            <div className="mt-16">
                                {item.content.map((faq, idx) => (
                                    <FaqsCard 
                                        key={idx}
                                        idx={idx} 
                                        faqsList={faq} 
                                        isOpen={openIndex === idx}
                                        onClick={handleToggle}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;