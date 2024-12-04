import Swiper, { Autoplay, Navigation, Pagination, EffectFade } from "swiper";
//import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

/**
 * Site Sliders
 *
 * - Site Carousel
 */
export default function siteSliders() {
  // Site Carousel
  new Swiper(".site-carousel", {
    // Modules
    modules: [Autoplay, Navigation, Pagination, EffectFade],
    // Optional parameters
    autoplay: {
      delay: 5000,
    },
    speed: 700,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
