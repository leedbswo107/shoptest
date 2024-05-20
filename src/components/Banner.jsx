import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import style from '../css/Banner.module.css';

const Banner = () => {
  return (
    <section className={`secBanner ${style.bannerCon}`}>
      <h2 hidden>배너리스트</h2>
      <div>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className={style.bannerList}
        >
          <SwiperSlide className={style.slide}>
            <img src="/img/Img_bg1.jpg" alt="bg" />
          </SwiperSlide>
          <SwiperSlide className={style.slide}>
            <img src="/img/Img_bg2.jpg" alt="bg" />
          </SwiperSlide>
          <SwiperSlide className={style.slide}>
            <img src="/img/Img_bg3.jpg" alt="bg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
