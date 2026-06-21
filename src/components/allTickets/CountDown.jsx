"use client";

import { useEffect, useState } from "react";

const Countdown = ({ departureDateTime }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const departure = new Date(departureDateTime);

      const diff = departure - now;

      if (diff <= 0) {
        setTime("Trip Departed");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [departureDateTime]);

  return <div className="text-xl font-bold text-blue-600">{time}</div>;
};

export default Countdown;
