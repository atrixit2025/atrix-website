import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const FaqsCard = (props) => {
    const answerElRef = useRef();
    const [answerH, setAnswerH] = useState("0px");
    const { faqsList, idx, isOpen, onClick } = props;

    const handleOpenAnswer = () => {
        onClick(idx);
    };

    useEffect(() => {
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
                {faqsList.title}
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
                    <p>{faqsList.description}</p>
                </div>
            </div>
        </div>
    );
};

const FaqSectionBackend = ({ FAQCategories }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [faqsData, setFaqsData] = useState([]);


    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
              
                
                const response = await axios.get("http://localhost:5300/FAQ/get", {
                    
                });
                

                if (!response.data || !response.data.FAQ) {
                    throw new Error("Invalid API response format");
                  }
                  const filteredFaqs = response.data.FAQ.filter(faq => {
                  
                    const hasCategory = FAQCategories.includes(faq.category);
                    // if (!hasCategory) {
                    //     console.log(`FAQ ${faq._id} skipped - category ${faq.category} not in service categories`);
                    // }
                    return hasCategory;
                })

                const groupedFaqs = FAQCategories.map(category => ({
                    category,
                    content: filteredFaqs.filter(faq => faq.category === category)
                }));

                // if (groupedFaqs.every(group => group.content.length === 0)) {
                //     console.warn("No FAQs found for any of the specified categories");
                // }

                setFaqsData(groupedFaqs);
            } catch (error) {
                console.error("Detailed error:", {
                    message: error.message,
                    response: error.response?.data,
                    config: error.config
                });
             
            } 
        };

        if (FAQCategories && FAQCategories.length > 0) {
            fetchFaqs();
        } else {
            console.warn("No FAQ categories provided");
            setFaqsData([]);
        }
    }, [FAQCategories]);


    return (
        <section className="faqsec my-36">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-y-15 gap-x-15 max-w-[900px] mx-auto">
                    {faqsData.map((item, index) => (
                        <div className="leading-relaxed mt-12" key={index}>
                            <div className="space-y-3 text-center">
                                <h2 className="text-4xl faqCatHeading font-semibold mb-10">
                                    {item.category}
                                </h2>
                            </div>
                            <div className="mt-16">
                                {item.content.map((faq, idx) => (
                                    <FaqsCard 
                                        key={faq._id || idx}
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

export default FaqSectionBackend;