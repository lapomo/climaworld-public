import { useState, useEffect } from "react";

function Typewriter({ words, style }) {
  const [displayText, setDisplayText] = useState([""]);
  const [index, setIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const startTyping = () => {
    if (currentWordIndex < words.length) {
      const currentWord = words[currentWordIndex];

      if (index < currentWord.length) {
        let displayWords = displayText;
        if (displayWords[currentWordIndex]) {
          displayWords[currentWordIndex] += currentWord.charAt(index);
        } else {
          displayWords[currentWordIndex] = currentWord.charAt(index);
        }
        // console.log(JSON.stringify(displayWords))
        setDisplayText(displayWords);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setIndex(0);
        // setDisplayText((prevText) => prevText + "\n");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(startTyping, 50);
    return () => clearTimeout(timer);
  }, [index, currentWordIndex]);

  return displayText.map((text, index) => {
    return (
      <div key={index} 
      style={style}
      >
        {text}
      </div>
    );
  });
}

export default Typewriter;
