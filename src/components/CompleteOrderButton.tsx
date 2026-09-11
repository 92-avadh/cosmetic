"use client";

import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

export interface CompleteOrderButtonRef {
  triggerAnimation: () => Promise<void>;
  reset: () => void;
}

interface CompleteOrderButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  defaultText?: string;
  completedText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAnimationStart?: () => void;
  onTruckLoaded?: () => void;
  onAnimationComplete?: () => void;
}

const CompleteOrderButton = forwardRef<CompleteOrderButtonRef, CompleteOrderButtonProps>(
  (
    {
      type = "submit",
      disabled = false,
      className = "",
      defaultText = "Complete Purchase",
      completedText = "Order Placed",
      onClick,
      onAnimationStart,
      onTruckLoaded,
      onAnimationComplete,
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [boxLoaded, setBoxLoaded] = useState(false);
    const [doorsOpen, setDoorsOpen] = useState(false);
    const [lightsOn, setLightsOn] = useState(false);
    const [speeding, setSpeeding] = useState(false);

    const truckRef = useRef<HTMLDivElement>(null);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const setTruckTransform = (xPx: number, durationSec: number, easing = "cubic-bezier(0.25, 1, 0.5, 1)") => {
      if (truckRef.current) {
        truckRef.current.style.transition = `transform ${durationSec}s ${easing}`;
        truckRef.current.style.transform = `translateX(${xPx}px)`;
      }
    };

    const reset = () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      setIsAnimating(false);
      setIsCompleted(false);
      setShowBox(false);
      setBoxLoaded(false);
      setDoorsOpen(false);
      setLightsOn(false);
      setSpeeding(false);

      if (truckRef.current) {
        truckRef.current.style.transition = "none";
        truckRef.current.style.transform = "translateX(270px)";
        void truckRef.current.offsetWidth;
      }
    };

    const delay = (ms: number) => new Promise<void>((resolve) => {
      animationTimeoutRef.current = setTimeout(resolve, ms);
    });

    const runOrderAnimation = async () => {
      if (isAnimating) return;

      setIsAnimating(true);
      setIsCompleted(false);
      onAnimationStart?.();

      // Step 1: Click -> Button depresses, text slides up, Box drops in
      setShowBox(true);
      await delay(250);

      // Step 2: Truck drives in from the right
      setTruckTransform(100, 0.5, "cubic-bezier(0.25, 1, 0.5, 1)");
      await delay(500);

      // Step 3: Rear doors swing open wide
      setDoorsOpen(true);
      await delay(350);

      // Step 4: Truck reverses left over the package
      setTruckTransform(36, 0.75, "cubic-bezier(0.4, 0, 0.2, 1)");
      await delay(750 * 0.45);
      setBoxLoaded(true);
      onTruckLoaded?.();
      await delay(750 * 0.55);

      // Step 5: Rear doors close shut
      setDoorsOpen(false);
      await delay(500);

      // Step 6: Headlights on & speed forward off-screen
      setLightsOn(true);
      setSpeeding(true);
      setTruckTransform(280, 2, "cubic-bezier(0.2, 0, 0.4, 1)");
      await delay(2000);

      // Step 7: Completed state with checkmark
      setSpeeding(false);
      setShowBox(false);
      setLightsOn(false);
      setIsCompleted(true);
      setIsAnimating(false);
      onAnimationComplete?.();
    };

    useImperativeHandle(ref, () => ({
      triggerAnimation: runOrderAnimation,
      reset,
    }));

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }
    };

    const btnClasses = [
      "order-btn",
      isAnimating ? "animating" : "",
      showBox ? "show-box" : "",
      boxLoaded ? "box-loaded" : "",
      speeding ? "speeding" : "",
      isCompleted ? "completed" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const truckClasses = [
      "truck-wrapper",
      doorsOpen ? "doors-open" : "",
      lightsOn ? "lights-on" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type={type}
        disabled={disabled || isAnimating}
        className={btnClasses}
        onClick={handleClick}
        aria-label={isCompleted ? completedText : defaultText}
      >
        {/* Default Button Text */}
        <span className="btn-text default-text">{defaultText}</span>

        {/* Success Text with Checkmark */}
        <span className="btn-text success-text">
          <svg
            className="check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{completedText}</span>
        </span>

        {/* Dashed Highway Road Line */}
        <div className="road-dashed" />

        {/* Cardboard Box Package SVG */}
        <div className="box-wrapper">
          <svg className="box-svg" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="26" height="24" rx="4" fill="#E5A853" />
            <rect x="9.5" width="7" height="24" fill="#C48432" />
            <line x1="0" y1="1" x2="26" y2="1" stroke="#FCE7C8" strokeOpacity="0.6" />
          </svg>
        </div>

        {/* Delivery Truck SVG Container */}
        <div ref={truckRef} className={truckClasses}>
          <svg className="truck-svg" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="beamGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#FACC15" stopOpacity="0.45" />
                <stop offset="85%" stopColor="#FACC15" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Headlight Light Cones */}
            <g className="light-beams">
              <polygon points="96,7 165,-8 165,24" fill="url(#beamGlow)" />
              <polygon points="96,41 165,24 165,56" fill="url(#beamGlow)" />
              <polygon points="96,24 175,10 175,38" fill="url(#beamGlow)" opacity="0.5" />
            </g>

            {/* Side Mirrors */}
            <line x1="72" y1="4" x2="65" y2="-1" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="72" y1="44" x2="65" y2="49" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

            {/* Rear Doors */}
            <g className="truck-doors">
              <line className="door-top" x1="16" y1="4" x2="16" y2="24" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line className="door-bottom" x1="16" y1="44" x2="16" y2="24" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* White Cargo Container Body */}
            <rect x="16" y="4" width="56" height="40" rx="4" fill="#FFFFFF" />
            <line x1="62" y1="4" x2="62" y2="44" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Blue Truck Cab */}
            <path d="M72 4 H88 C94 4 98 9 98 24 C98 39 94 44 88 44 H72 V4 Z" fill="#2563EB" />

            {/* Dark Windshield with Shine */}
            <path d="M76 7 H86 C89.5 7 92 11 92 24 C92 37 89.5 41 86 41 H76 V7 Z" fill="#0F172A" />
            <line x1="79" y1="10" x2="89" y2="20" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />

            {/* Headlights */}
            <rect className="headlight-top" x="94" y="6" width="4" height="7" rx="1.5" fill="#FACCB1" />
            <rect className="headlight-bottom" x="94" y="35" width="4" height="7" rx="1.5" fill="#FACCB1" />
          </svg>
        </div>
      </button>
    );
  }
);

CompleteOrderButton.displayName = "CompleteOrderButton";

export default CompleteOrderButton;
