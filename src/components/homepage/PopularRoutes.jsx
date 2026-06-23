import React from "react";

const PopularRoutes = () => {
  const routes = [
    "Dhaka → Chittagong",
    "Dhaka → Sylhet",
    "Dhaka → Rajshahi",
    "Dhaka → Khulna",
    "Chittagong → Cox's Bazar",
    "Sylhet → Dhaka",
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛣️ Popular Routes</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {routes.map((route, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer text-center font-medium"
          >
            {route}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
