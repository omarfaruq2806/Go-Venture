"use client";

import { useEffect, useState } from "react";
import { Hourglass } from "lucide-react";

const Countdown = ({ departureDateTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const departure = new Date(departureDateTime).getTime();
      const diff = departure - now;

      if (diff <= 0) {
        setTimeLeft((prev) => ({ ...prev, isExpired: true }));
        return true; // Stop loop signal
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      return false;
    };

    // First immediate execution hydration glitch bypass korar jonno
    const shouldStop = calculateTime();
    if (shouldStop) return;

    const timer = setInterval(() => {
      const stop = calculateTime();
      if (stop) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [departureDateTime]);

  if (timeLeft.isExpired) {
    return (
      <div className="badge badge-error border-none font-black tracking-wide text-sm py-4 px-6 rounded-xl shadow-inner uppercase animate-pulse text-white">
        🚫 Trip Departed / Closed
      </div>
    );
  }

  // Time matrix configuration metadata layout loop chunk helper
  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {timeUnits.map((unit, idx) => (
        <div key={idx} className="flex flex-col items-center">
          {/* Main Numeric Capsule Bubble */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-base-100 text-base-content border border-base-300 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl shadow-sm tracking-tighter">
            {String(unit.value).padStart(2, "0")}
          </div>
          {/* Label Subtext */}
          <span className="text-[10px] font-black uppercase tracking-wider text-primary-content/70 mt-1.5">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
