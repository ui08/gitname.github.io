// IdleTimeoutContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { decryptData } from "./CryptoJS";
import { getIdleTimer } from "./index";

// Create a context
const IdleTimeoutContext = createContext();

// Provide IdleTimeout Context
export const IdleTimeoutProvider = ({ children }) => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null); // Use a ref for the timer

  const resetIdleTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Clear the existing timer
    }

    // Set a new idle timer
    timerRef.current = setTimeout(() => {
      setIsIdle(true); // User is idle
    }, decryptData(getIdleTimer())); // E.g., 5 minutes

    setIsIdle(false); // User is active
  };

  useEffect(() => {
    // Add event listeners to reset timer on activity
    const events = [
      "mousemove",
      "mousedown",
      "mouseup",
      "mouseenter",
      "mouseleave",
      "mouseover",
      "mouseout",
      "keydown",
      "keyup",
      "keypress",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "resize",
      "focus",
      "blur",
      "visibilitychange",
      "pointerdown",
      "pointerup",
      "pointermove",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Initialize the idle timer on component mount
    resetIdleTimer();

    // Clean up event listeners
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs once

  return (
    <IdleTimeoutContext.Provider value={{ isIdle, resetIdleTimer }}>
      {children}
    </IdleTimeoutContext.Provider>
  );
};

// Custom Hook to use the IdleTimeoutContext
export const useIdleTimeout = () => useContext(IdleTimeoutContext);
