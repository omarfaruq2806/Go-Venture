"use client"; // এটি অবশ্যই দিতে হবে

import { Swiper, SwiperSlide } from "swiper/react"; // সঠিক ইম্পোর্ট
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // মডিউলগুলো ইম্পোর্ট করো

// CSS ইম্পোর্ট করো
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SwiperSlider = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
      title: "Bus Travel",
    },
    {
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      title: "Flight",
    },
    {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      title: "Train Journey",
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      title: "Launch Cruise",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // এখানে মডিউলগুলো দাও
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000 }}
      className="mySwiper w-full"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
              <p className="text-white font-bold">{img.title}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
