import React, { useEffect, useRef } from 'react';

const svgIocns =   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
<path d="M20 9.47811L26.1809 0L25.8767 11.4983L36.1889 7.6431L29.5116 16.7508L40 20L29.5116 23.2492L36.1889 32.3569L25.8767 28.5017L26.1809 40L20 30.5219L13.8191 40L14.1233 28.5017L3.82706 32.3569L10.4884 23.2492L0 20L10.4884 16.7508L3.82706 7.6431L14.1233 11.4983L13.8191 0L20 9.47811Z"></path>
</svg>

const LetterMarquee = () => {
    const letterMarquee = [
        {
            icons: svgIocns,
            title: "WELCOME TO ATRIX IT SOLUTIONS",
        },
        {
            icons: svgIocns,
            title: "EMAIL MARKETING",
        },
        {
            icons: svgIocns,
            title: "DIGITAL STUDIO",
        },
        {
            icons: svgIocns,
            title: "UI/UX DESIGN",
        },
        {
            icons: svgIocns,
            title: "EMAIL MARKETING",
        },
        {
            icons: svgIocns,
            title: "DIGITAL STUDIO ",
        },
    ];

    const marqueeRef = useRef(null);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;

        if (marqueeElement) {
            const marqueeContent = marqueeElement.innerHTML;
            marqueeElement.innerHTML += marqueeContent;

            let scrollPosition = 0;
            const speed = 1; 

            const animateMarquee = () => {
                scrollPosition -= speed; 
                if (scrollPosition <= -marqueeElement.scrollWidth / 2) {
                    scrollPosition = 0; 
                }
                marqueeElement.style.transform = `translateX(${scrollPosition}px)`;
                requestAnimationFrame(animateMarquee);
            };

            animateMarquee();
        }
    }, []);

    return (
 
            <div className="overflow-hidden flex bg-(--black) text-(--white)">
                <div
                    ref={marqueeRef}
                    className="flex items-center gap-5 whitespace-nowrap p-6"
                >
                    {letterMarquee.map((item, index) => (
                        <div key={index} className="flex items-center gap-5 filter invert brightness-0 contrast-100 z-10">
                            {item.icons}
                            <h2 className="text-center mt-2 font-bold text-2xl">{item.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
       
    );
};

export default LetterMarquee;