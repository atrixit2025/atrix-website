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
    // const faqsList = [

    //     {
    //         q: "What are some random questions to ask?",
    //         a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
    //     },
    //     {
    //         q: "Do you include common questions?",
    //         a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
    //     },
    //     {
    //         q: "Can I use this for 21 questions?",
    //         a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
    //     },
    //     {
    //         q: "Are these questions for girls or for boys?",
    //         a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
    //     },
    //     {
    //         q: "What do you wish you had more talent doing?",
    //         a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
    //     },
    // ];


    const faqsData = [
        {
            category: "Web designing",
            content: [
                {
                    q: "What are some random questions to ask?",
                    a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
                },
                {
                    q: "Do you include common questions?",
                    a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
                },
                {
                    q: "Can I use this for 21 questions?",
                    a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
                },
                {
                    q: "Are these questions for girls or for boys?",
                    a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
                },
                {
                    q: "What do you wish you had more talent doing?",
                    a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
                },
            ]
        },
        {
            category: "Graphic designing",
            content: [
                {
                    q: "What are some random questions to ask?",
                    a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
                },
                {
                    q: "Do you include common questions?",
                    a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
                },
                {
                    q: "Can I use this for 21 questions?",
                    a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
                },
                {
                    q: "Are these questions for girls or for boys?",
                    a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
                },
                {
                    q: "What do you wish you had more talent doing?",
                    a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
                },
            ]
        },
        {
            category: "Graphic designing",
            content: [
                {
                    q: "What are some random questions to ask?",
                    a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
                },
                {
                    q: "Do you include common questions?",
                    a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
                },
                {
                    q: "Can I use this for 21 questions?",
                    a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
                },
                {
                    q: "Are these questions for girls or for boys?",
                    a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
                },
                {
                    q: "What do you wish you had more talent doing?",
                    a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
                },
            ]
        },
        {
            category: "Graphic designing",
            content: [
                {
                    q: "What are some random questions to ask?",
                    a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
                },
                {
                    q: "Do you include common questions?",
                    a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
                },
                {
                    q: "Can I use this for 21 questions?",
                    a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
                },
                {
                    q: "Are these questions for girls or for boys?",
                    a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
                },
                {
                    q: "What do you wish you had more talent doing?",
                    a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
                },
            ]
        }

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
