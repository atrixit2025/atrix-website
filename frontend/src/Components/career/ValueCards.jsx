import React, { useEffect } from 'react';
import icon5 from "../../assets/AboutUs/keys-sec/Culture.svg";
import icon6 from "../../assets/AboutUs/keys-sec/Innovation.svg";
import icon7 from "../../assets/AboutUs/keys-sec/Integrity.svg";
import icon8 from "../../assets/AboutUs/keys-sec/Kindness.svg";
import icon9 from "../../assets/AboutUs/keys-sec/value.svg";
import icon10 from "../../assets/AboutUs/keys-sec/Agile-Solutions.svg";
import './ValueCards.css'; // Import the CSS file

const ValueCardContent = [
  {
    icon: icon5,
    title: "Loyalty",
    desc: "We believe in creating long-lasting relationships based on commitment and trust. Our team is committed to providing reliable support and solutions.",
  },
  {
    icon: icon6,
    title: " Innovation ",
    desc: "We support innovative, inspiring, and well-considered ideas to keep everyone on the cutting edge.",
  },
  {
    icon: icon7,
    title: " Integrity",
    desc: "Everything we do is based on honesty and openness. To build trust, we uphold strong ethical values.",
  },
  {
    icon: icon8,
    title: "Agile solutions ",
    desc: "We provide smart and flexible solutions, quickly adjusting to any changes. This helps businesses grow easily and succeed over time.",
  },
  {
    icon: icon9,
    title: " Culture ",
    desc: "We create a friendly workplace where people work together, share ideas, and keep learning. A happy team leads to better results.",
  },
  {
    icon: icon10,
    title: " Kindness",
    desc: "We treat our client with respect and care. Being kind helps us build strong and lasting relationships.",
  },
];

const ValueCards = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.vcard-fade-slide');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vcard-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  }, []);

  return (
    <div className="container mx-auto mt-14 md:pt-32 w-[90%]">
      <div>
        <h2 className="sec-heading text-center mb-4">Our Values</h2>
        <p className="mb-12 text-center">Our values shape how we work, delivering results you can trust.</p>
      </div>
      <div className="contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ValueCardContent.map((item, index) => (
          <div
            key={index}
            className="contact-card vcard-fade-slide bg-(--black) py-10 px-8 rounded-3xl shadow-2xl shadow-white/5"
          >
            <div className="max-w-16 h-auto mb-5">
              <img
                src={item.icon}
                alt=""
                className="w-full h-full"
                style={{ filter: 'grayscale(1) brightness(20.255)' }}
              />
            </div>
            <h3 className="sub-sec-heading text-3xl font-bold">{item.title}</h3>
            <p className="mt-4">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueCards;
