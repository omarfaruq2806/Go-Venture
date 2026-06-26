import AdvertisedTickets from "@/components/homepage/AdvertisedTickets";
import Hero from "@/components/homepage/Hero";
import LatestTickets from "@/components/homepage/LatestTickets";
import PopularRoutes from "@/components/homepage/PopularRoutes";
import SwiperSlider from "@/components/homepage/SwiperSlider";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
