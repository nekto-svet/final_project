import React from 'react';

const CoolText = React.memo(({ text }) => {
    const randomColor = () => {
        const r = Math.floor(128 + Math.random() * 127).toString(16).padStart(2, '0'); 
        const g = Math.floor(128 + Math.random() * 127).toString(16).padStart(2, '0'); 
        const b = Math.floor(128 + Math.random() * 127).toString(16).padStart(2, '0'); 
        return `#${r}${g}${b}`;
      };
    const randomRotate = () => Math.floor(Math.random() * 7 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const randomTranslateY = () => Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? 1 : -1);
    const colorfulText = text.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <span key={index} style={{ whiteSpace: 'pre' }}>
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={index}
          style={{
            color: randomColor(),
            transform: `rotate(${randomRotate()}deg) translateY(${randomTranslateY()}px)`,
            display: 'inline-block', 
          }}
        >
          {char}
        </span>
      );
    });
    return <>{colorfulText}</>;
});

export default CoolText;