"use client";

import React from "react";
import { MousePointerClick, ShieldCheck, Zap, Banknote } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      desc: "Book your bus or transport tickets seamlessly in just a few clicks.",
      icon: <MousePointerClick className="w-6 h-6 text-primary" />,
      bgClass: "bg-primary/10",
    },
    {
      title: "Secure Payment",
      desc: "Your transactions are 100% safe with our integrated Stripe system.",
      icon: <ShieldCheck className="w-6 h-6 text-success" />,
      bgClass: "bg-success/10",
    },
    {
      title: "Instant Ticket",
      desc: "Get your digital booking status and token instantly via email.",
      icon: <Zap className="w-6 h-6 text-warning" />,
      bgClass: "bg-warning/10",
    },
    {
      title: "Best Price",
      desc: "No hidden fees. We guarantee affordable ticket pricing always.",
      icon: <Banknote className="w-6 h-6 text-secondary" />,
      bgClass: "bg-secondary/10",
    },
  ];

  return (
    <div className="w-full bg-base-100 transition-colors duration-200 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            ✨ Features
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-base-content flex items-center justify-center gap-2">
            <span className="text-amber-500">⭐</span> Why Choose TicketBari
          </h2>

          <p className="text-base-content/70 text-sm md:text-base font-medium mt-3">
            We provide the top-tier ticketing framework to ensure your journey
            remains smooth and comfortable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="card bg-base-100 border border-base-200/80 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300 p-6 text-center flex flex-col items-center group"
            >
              <div
                className={`p-4 ${item.bgClass} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-base-content tracking-tight mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-base-content/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
