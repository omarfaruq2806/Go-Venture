import React from "react";
import Link from "next/link";
import {SwiperSlider }from "./SwiperSlider"; 

const Hero = () => {
  return (
    <div className="bg-base-100 border-b-6 border-base-300">
      <div className="relative w-full h-[500px] overflow-hidden pt-10">
        <SwiperSlider />
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 text-center">
          <div className="max-w-2xl px-4">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your Journey Begins <span className="text-primary">Here</span>
            </h1>
            <Link
              href="/tickets"
              className="btn btn-primary btn-lg rounded-full px-10 text-lg shadow-xl shadow-primary/20"
            >
              Explore Routes
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Bus Tickets",
              icon: "🚍",
              color: "text-primary",
              desc: "Reliable bus services on all major routes.",
            },
            {
              title: "Flight Tickets",
              icon: "✈️",
              color: "text-secondary",
              desc: "Global connectivity at your fingertips.",
            },
            {
              title: "Train & Launch",
              icon: "🚆",
              color: "text-accent",
              desc: "Scenic journeys for a comfortable travel.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-2xl border border-base-200 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h2 className={`card-title ${item.color}`}>{item.title}</h2>
                <p className="text-base-content/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-20 text-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow-lg border border-base-200">
          <div className="stat">
            <div className="stat-title">Happy Travelers</div>
            <div className="stat-value text-primary">10K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Routes</div>
            <div className="stat-value text-secondary">500+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Support</div>
            <div className="stat-value text-accent">24/7</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
