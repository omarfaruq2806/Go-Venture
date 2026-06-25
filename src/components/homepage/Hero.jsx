import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-20">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Book Bus, Train, Flight & Launch Tickets Easily
            </h1>
            <p className="py-6 text-lg text-primary-content/80 max-w-xl mx-auto">
              Fast, secure and simple ticket booking platform for everyone.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/tickets"
                className="btn btn-white text-primary font-bold hover:bg-base-100"
              >
                View Tickets
              </Link>
              <Link
                href="/about"
                className="btn btn-outline btn-white text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition">
            <div className="card-body">
              <h2 className="card-title text-xl text-primary">
                🚍 Bus Tickets
              </h2>
              <p className="text-base-content/70">
                Book bus tickets across all major routes easily.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition">
            <div className="card-body">
              <h2 className="card-title text-xl text-secondary">
                ✈️ Flight Tickets
              </h2>
              <p className="text-base-content/70">
                Find cheap and fast flight booking options.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition">
            <div className="card-body">
              <h2 className="card-title text-xl text-accent">
                🚆 Train & Launch
              </h2>
              <p className="text-base-content/70">
                Comfortable train and launch ticket booking system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-neutral text-neutral-content py-16 text-center">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-3xl font-bold">Start Booking Your Ticket Now</h2>
          <p className="text-neutral-content/70 mt-2">
            Join thousands of users booking daily
          </p>
          <Link
            href="/tickets"
            className="btn btn-primary mt-6 text-white px-8"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
