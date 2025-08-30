// src/components/LineTrail.jsx
import React, { useState, useEffect, useRef } from "react";

function LineTrail() {
  const [points, setPoints] = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef();
  const isTouchInteraction = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only track mouse movement if it's not from a touch event
      if (!isTouchInteraction.current) {
        mousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleTouchStart = () => {
      isTouchInteraction.current = true;
    };

    const handleTouchEnd = () => {
      // Reset after a short delay to avoid immediate mouse events
      setTimeout(() => {
        isTouchInteraction.current = false;
      }, 100);
    };

    const animate = () => {
      if (!isTouchInteraction.current) {
        lastPos.current.x += (mousePos.current.x - lastPos.current.x) * 0.2;
        lastPos.current.y += (mousePos.current.y - lastPos.current.y) * 0.2;

        const newPoint = { x: lastPos.current.x, y: lastPos.current.y };
        setPoints((prevPoints) => [...prevPoints, newPoint].slice(-30));
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const pathData =
    "M " + points.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ");

  return (
    <svg className="line-trail-svg">
      <defs>
        <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#766DA7" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#9b93c8" />
        </linearGradient>
      </defs>
      <path d={pathData} stroke="url(#aurora-gradient)" />
    </svg>
  );
}

export default LineTrail;