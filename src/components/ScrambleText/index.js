import { useEffect, useState } from 'react';

const ScrambleText = ({ text }) => {
  const [scrambledText, setScrambledText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const originalText = text.split('');

    const intervalId = setInterval(() => {
      const tempText = [...originalText];

      for (let i = currentIndex; i < originalText.length; i++) {
        const randomIndex = Math.floor(Math.random() * (originalText.length - currentIndex)) + currentIndex;
        [tempText[i], tempText[randomIndex]] = [tempText[randomIndex], tempText[i]];
      }

      setScrambledText(tempText.join(''));

      currentIndex += 1;

      if (currentIndex === originalText.length) {
        clearInterval(intervalId);
        setScrambledText(text);
      }
    }, 100); 

    return () => clearInterval(intervalId);
  }, [text]);

  return <span className='scramble'>{scrambledText}</span>;
};

export default ScrambleText;
