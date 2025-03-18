// import React, { useState, useEffect, useRef } from 'react';

// const TypewriterEffect = ({ text, speed, deleteSpeed, delay }) => {
//   const [displayText, setDisplayText] = useState(''); 
//   const [isDeleting, setIsDeleting] = useState(false); 
//   const index = useRef(0); 
//   const timeoutRef = useRef(null); 

//   useEffect(() => {
//     const typeText = () => {
//       if (!isDeleting) {
//         setDisplayText((prev) => prev + text.charAt(index.current));
//         index.current++;

//         if (index.current === text.length) {
//           setIsDeleting(true);
//         }
//       } else {
//         setDisplayText((prev) => prev.slice(0, -1));
//         index.current--;

//         if (index.current === 0) {
//           setIsDeleting(false);
//         }
//       }
//     };

//     if (index.current < text.length || isDeleting) {
//       timeoutRef.current = setTimeout(typeText, isDeleting ? deleteSpeed : speed);
//     }

    
//     return () => clearTimeout(timeoutRef.current);
//   }, [displayText, isDeleting, text, speed, deleteSpeed]);

//   return (
//     <div>
//       <p 
//         style={{
//           display: 'inline-block',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//           borderRight: '2px solid rgb(216, 216, 216)', 
//           animation: 'blink 0.5s step-end infinite normal', 
//           height:"55px",
//           marginTop:"9px"
//         }}
//       >
//         {displayText}
//       </p>
//     </div>
//   );
// };

// export default TypewriterEffect;


import React, { useState, useEffect, useRef } from 'react';

const TypewriterEffect = ({ lines, speed, deleteSpeed, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const index = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const typeText = () => {
      const currentLine = lines[currentLineIndex];

      if (!isDeleting) {
        setDisplayText((prev) => prev + currentLine.charAt(index.current));
        index.current++;

     
        if (index.current === currentLine.length) {
          setIsDeleting(true);
          timeoutRef.current = setTimeout(typeText, delay); 
        } else {
          timeoutRef.current = setTimeout(typeText, speed);
        }
      } else {
        setDisplayText((prev) => prev.slice(0, -1));
        index.current--;

       
        if (index.current === 0) {
          setIsDeleting(false);
          setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        }
        timeoutRef.current = setTimeout(typeText, deleteSpeed);
      }
    };

    timeoutRef.current = setTimeout(typeText, speed);

   
    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentLineIndex, lines, speed, deleteSpeed, delay]);

  return (
    <div>
      <p className='md:h-[55px] h-[30px] '
        style={{
          display: 'inline-block',
          whiteSpace: 'pre-wrap', 
          overflow: 'hidden',
          borderRight: '2px solid rgb(216, 216, 216)',
          animation: 'blink 0.5s step-end infinite normal',
          // height: '55px',
          marginTop: '9px',
        }}
      >
        {displayText}
      </p>
    </div>
  );
};

export default TypewriterEffect;