import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the FontAwesome icon for the up arrow
import '../button/button.css';




const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to handle scroll event and toggle button visibility
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener when component mounts
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button className="back-to-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
