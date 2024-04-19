import {React, useRef, useEffect} from "react";
import 'swiper/css/effect-fade';
import '../Styles/home.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import img from "../assets/img.jpeg"
import { Navigation, EffectFade, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";

function Home() { 
  return (
  // <div>
  // <Link to ="/whitelist"> join whitelist </Link>
  // </div>

<Swiper
modules={[Navigation, Pagination,EffectFade,]}
  spaceBetween={50}
  effect={'fade'}
  // fadeEffect: { crossFade: true }
  slidesPerView={1}
  direction="horizontal"
  navigation
  >

  <section class="container">
  <div class="Home-Swiper">
    <SwiperSlide>
      <div className="card">
      <div className="image-container">
      <img src={img} alt="img" className="image"/> 
      </div>
        <div className="caption">
        We're leveraging NFT technology to cultivate a tight-knit 
        community of individuals who share experiences navigating the 
        impact of web3 culture on mental well-being.
        </div>
      </div>
     
    </SwiperSlide>
    <SwiperSlide>
        <img src="#" alt="" class="image" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
          saepe provident dolorem a quaerat quo error facere nihil deleniti
          eligendi ipsum adipisci, fugit, architecto amet asperiores
          doloremque deserunt eum nemo.
        </p>
        <i class="bx bxs-quote-alt-left quote-icon"></i>
        <div class="details">
          <span class="name"> Lotter</span>
          <span class="job">Web Developer</span>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <img src="#" alt="" class="image" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
          saepe provident dolorem a quaerat quo error facere nihil deleniti
          eligendi ipsum adipisci, fugit, architecto amet asperiores
          doloremque deserunt eum nemo.
        </p>
        <i class="bx bxs-quote-alt-left quote-icon"></i>
        <div class="details">
          <span class="name">Marnie Lotter</span>
          <span class="job">Web Developer</span>
        </div>
    </SwiperSlide>
    </div> 
</section>
</Swiper>
  )
}

export default Home;