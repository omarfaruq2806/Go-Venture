import React from "react";

import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Book Bus, Train, Flight & Launch Tickets Easily
            </h1>

            <p className="mt-4 text-lg text-white/80">
              Fast, secure and simple ticket booking platform for everyone.
            </p>

            <div className="mt-6 flex gap-4 justify-center">
              <Link
                href="/tickets"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold"
              >
                View Tickets
              </Link>

              <Link
                href="/about"
                className="border border-white px-6 py-3 rounded-full"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">🚍 Bus Tickets</h3>
            <p className="text-gray-600 mt-2">
              Book bus tickets across all major routes easily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">✈️ Flight Tickets</h3>
            <p className="text-gray-600 mt-2">
              Find cheap and fast flight booking options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">🚆 Train & Launch</h3>
            <p className="text-gray-600 mt-2">
              Comfortable train and launch ticket booking system.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white py-16 text-center">
          <h2 className="text-3xl font-bold">Start Booking Your Ticket Now</h2>

          <p className="text-gray-400 mt-2">
            Join thousands of users booking daily
          </p>

          <Link
            href="/tickets"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Hero;
