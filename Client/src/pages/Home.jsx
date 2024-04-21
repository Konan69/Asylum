import {React, useRef, useEffect} from "react";
import 'swiper/css/effect-fade';
import '../Styles/home.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import img from "../assets/img.jpeg"
import { Navigation, EffectFade, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() { 
  const swiperRef = useRef(null);

  const handleNavButtonClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
  <>
<Navbar handleNavButtonClick={handleNavButtonClick} />
<Swiper
modules={[Navigation, Pagination,EffectFade,]}
  ref={swiperRef}
  effect={'fade'}
  slidesPerView={1}
  navigation
>
  <div class="Home-Swiper">
    <SwiperSlide>
      <div className="card">
      <div className="image-container">
      <img src={img} alt="img" className="image"/> 
      </div>
      <div className="text-container">
      <div className="heading">
      BaseBound
      </div>
      <div className="caption">
        We're leveraging NFT technology to cultivate a tight-knit 
        community of individuals who share experiences navigating the 
        impact of web3 culture on mental well-being.
      </div>
      </div>
      </div>
     
    </SwiperSlide>
    <SwiperSlide>
    <div className="card">
      <div className="image-container">
      <img src={img} alt="img" className="image"/> 
      </div>
      <div className="text-container">
      <div className="heading">
      BaseBound NFT
      </div>
      <div className="caption">
      Our NFT collection “BaseBound” showcases our unique
      perspective on the evolving landscape of web3 culture and its 
      influence on society. Launching soon on Base.
      </div>
      <div className="Join-wl">
       <button>
      <Link to="/whitelist" className="button">
      <span style={{ color: "black" }}>Join Whitelist</span>
      </Link>
      </button> 
      </div>
      
      </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
    <div className="card">
      <div className="image-container">
      <img src={img} alt="img" className="image"/> 
      </div>
      <div className="text-container">
      <div className="heading">
      The Bound
      </div>
      <div className="caption">
      Each piece in the collection is labeled “The Bound”.
      The collection captures the exhilarating yet consuming nature of web3's rapid evolution, 
      illustrating how we're often "bound" to prioritize it,
      sometimes neglecting its impact on our well-being.
      </div>
      </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
    <div className="card">
      <div className="image-container">
      <img src={img} alt="img" className="image"/> 
      </div>
      <div className="text-container">
      <div className="heading">
      $BOUND
      </div>
      <div className="caption">
      $BOUND, our governance token, will launch as a token of 
      appreciation for those who contribute to and believe in our 
      project, while also serving as a means to support our cause and 
      community initiatives. Coming soon on Base.
      </div>
      </div>
      </div>
      </SwiperSlide>
    </div>
</Swiper>
</>
  )
}

export default Home;