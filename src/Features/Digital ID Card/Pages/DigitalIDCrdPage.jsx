/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackSide from '../Components/Backside';
import DigitalIDCardFront from '../Components/DigitalIDCardFront';
import WelcomeVideoModal from '../Components/WelcomeVideoModal';
const DigitalIDCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  return (
    <>
      <WelcomeVideoModal/>
    <div className="relative w-[350px] h-[220px] perspective mx-auto mt-28">
      {/* Company Logo - Top Left */}

      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden">
          <DigitalIDCardFront onFlip={handleFlip}/>
        </div>

        {/* Back Side (Visiting Card) */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden">
          <BackSide onFlip={handleFlip} />
        </div>
      </div>
    </div>
    </>
  );
};

export default DigitalIDCard;
