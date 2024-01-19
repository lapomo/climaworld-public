import { useState, useEffect, useCallback } from 'react';

function Typewriter({ text, onTypingDone }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  const updateText = useCallback(() => {
    if (index < text.length) {
      setDisplayText(prevText => prevText + text[index]);
      setIndex(prevIndex => prevIndex + 1);
    }
  }, [index, text]);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(updateText, 100);
      return () => clearTimeout(timeoutId);
    } else {
        onTypingDone && onTypingDone()
    }
  }, [index, text, updateText, onTypingDone]);

  return <div>{displayText}</div>;
}

export default Typewriter;
