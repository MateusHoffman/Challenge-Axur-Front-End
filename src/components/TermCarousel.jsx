// import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import IconDeleteBlack from '../images/icon-X-black.svg'
import IconDeleteWhite from '../images/icon-X-white.svg'
import "./TermCarousel.css";

// import required modules
import { Navigation } from "swiper";

const TermCarousel = ({ arrResFetchTerm, handleDeleteButton, selectTerm, setSelectTerm }) => {
  // const [selectTerm, setSelectTerm] = useState('');

  // const handleTerm = (e) => {
  //   setSelectTerm(e.target.innerText)
  //   console.log(selectTerm);
  // }

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        navigation={true}
        centeredSlides={true}
        modules={[Navigation]}
      >
        {
          arrResFetchTerm.map((term, index) => (
            <SwiperSlide
              key={index}
              onClick={ (e) => setSelectTerm(e.target.innerText) }
              className={ selectTerm === term.name ? 'item-selected' : '' }
            >
              <p>{term.name}</p>
              <button
                onClick={ () => handleDeleteButton(term.id) }
              >
                <img src={ selectTerm === term.name ? IconDeleteWhite : IconDeleteBlack } alt="Delete icon" />
              </button>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

export default TermCarousel