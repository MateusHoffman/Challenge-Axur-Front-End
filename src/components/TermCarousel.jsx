import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./TermCarousel.css";

// import required modules
import { Navigation } from "swiper";

const TermCarousel = () => {
  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        navigation={true}
        centeredSlides={true}
        modules={[Navigation]}
      >
        <SwiperSlide>Linux 🗑</SwiperSlide>
        <SwiperSlide>Google 🗑</SwiperSlide>
        <SwiperSlide>Programação 🗑</SwiperSlide>
        <SwiperSlide>Axur 🗑</SwiperSlide>
        <SwiperSlide>ProgramaçãoProgramação 🗑</SwiperSlide>
        <SwiperSlide>Search 🗑</SwiperSlide>
        <SwiperSlide> 🗑</SwiperSlide>
        <SwiperSlide> 🗑</SwiperSlide>
        <SwiperSlide> 🗑</SwiperSlide>
      </Swiper>
    </>
  );
}

export default TermCarousel