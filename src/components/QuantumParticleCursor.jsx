// src/components/QuantumParticleCursor.jsx
import React, { useState, useEffect } from "react";
import { useMousePosition } from "../useMousePosition";

function QuantumParticleCursor() {
  const position = useMousePosition();
  const [quantumState, setQuantumState] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Detect if the device has a fine pointer (mouse/trackpad)
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setShowCursor(hasFinePointer);
    };

    checkPointer();

    // Listen for changes (e.g., plugging in a mouse to a tablet)
    const mq = window.matchMedia("(pointer: fine)");
    mq.addEventListener("change", checkPointer);

    return () => mq.removeEventListener("change", checkPointer);
  }, []);

  useEffect(() => {
    if (!showCursor) return;

    const interval = setInterval(() => {
      setQuantumState((prev) => (prev + 1) % 4);
    }, 300);

    return () => clearInterval(interval);
  }, [showCursor]);

  // Don’t render at all on touch-only devices
  if (!showCursor) return null;

  return (
    <div
      className={`quantum-particle-cursor normal-state`}
      style={{
        left: position.x,
        top: position.y,
        position: "fixed",
        width: "40px",
        height: "40px",
        pointerEvents: "none",
        zIndex: 10000,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`quantum-core state-${quantumState}`}
        style={{
          width: "10px",
          height: "10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 15px rgba(34, 197, 94, 0.8)",
        }}
      ></div>
      <div className="quantum-field field-1"></div>
      <div className="quantum-field field-2"></div>
      <div className="quantum-field field-3"></div>
      <div className="probability-cloud"></div>
    </div>
  );
}

export default QuantumParticleCursor;
