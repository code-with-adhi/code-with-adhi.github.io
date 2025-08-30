// src/components/ClickSparkles.jsx
import React, { useState, useEffect } from 'react';

function ClickSparkles() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      const newSparkles = [];
      // Create a burst of 20 sparkles
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * 2 * Math.PI; // Random angle
        const distance = Math.random() * 50 + 20; // Random distance from 20 to 70 pixels
        
        newSparkles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          // Calculate the end position for the animation
          endX: Math.cos(angle) * distance,
          endY: Math.sin(angle) * distance,
          color: `hsl(${Math.random() * 360}, 100%, 75%)`,
        });
      }
      setSparkles(prev => [...prev, ...newSparkles]);
    };

    window.addEventListener('mousedown', handleMouseClick);
    return () => window.removeEventListener('mousedown', handleMouseClick);
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="click-sparkle"
          style={{
            top: `${sparkle.y}px`,
            left: `${sparkle.x}px`,
            '--end-x': `${sparkle.endX}px`,
            '--end-y': `${sparkle.endY}px`,
            background: sparkle.color,
          }}
          // Remove the sparkle from the DOM after animation
          onAnimationEnd={() => {
            setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
          }}
        />
      ))}
    </>
  );
}

export default ClickSparkles;