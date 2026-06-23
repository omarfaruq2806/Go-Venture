import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      desc: "Book tickets in just a few clicks.",
    },
    {
      title: "Secure Payment",
      desc: "Safe Stripe payment system.",
    },
    {
      title: "Instant Confirmation",
      desc: "Get booking status instantly.",
    },
    {
      title: "Best Price",
      desc: "Affordable ticket pricing always.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">⭐ Why Choose Us</h1>

      <div className="grid md:grid-cols-4 gap-5">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition text-center"
          >
            <h2 className="font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
