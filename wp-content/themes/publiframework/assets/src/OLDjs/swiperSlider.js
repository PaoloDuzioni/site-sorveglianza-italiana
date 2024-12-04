const swiperSlider = () => {
  //   const swiper = new Swiper(".swiper", {
  //     direction: "vertical",
  //     loop: true,
  //     // If we need pagination
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },
  //     // Navigation arrows
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     // And if we need scrollbar
  //     scrollbar: {
  //       el: ".swiper-scrollbar",
  //     },
  //     modules: [Navigation, Pagination, Scrollbar],
  //   });

  const swiperSlider = new Swiper(".slider_banner", {
    slidesPerView: 1,
    loop: true,
  });
};
