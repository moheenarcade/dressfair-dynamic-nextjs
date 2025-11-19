"use client";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { TbClockHour3Filled } from "react-icons/tb";

export default function DealTimerMobile({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    percent: 0,
  });

  useEffect(() => {
    // Set start date as 24 hours before end date for all products
    const startDate = new Date(endDate);
    startDate.setHours(startDate.getHours() - 24);
    
    const total = endDate.getTime() - startDate.getTime();

    const interval = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          percent: 100,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const elapsed = total - diff;
      const percent = Math.min((elapsed / total) * 100, 100);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        percent,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex relative items-center gap-2 w-[95%] pb-3">
      {/* Progress Bar with Clock */}
      <div className="relative flex-1 h-[4px] bg-gray-200 rounded-full">
        {/* Elapsed Time (black section) */}
        <div
          className="absolute left-0 top-0 h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${timeLeft.percent}%` }}
        />

        {/* Clock Icon at End of Black Bar */}
        <div
          className="absolute top-[7px] -translate-y-1/2 flex items-center justify-center 
          w-3 h-3 rounded-full bg-black text-white text-[10px] z-10 transition-all duration-500"
          style={{
            left: `${timeLeft.percent}%`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <TbClockHour3Filled className="text-[10px]" />
        </div>
      </div>
    </div>
  );
}