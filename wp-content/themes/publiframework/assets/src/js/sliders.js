import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

/**
 * Site Sliders
 */
export default function siteSliders() {
    // Site Slider video
    new Swiper('.site-slider-video', {
        // Modules
        modules: [Autoplay, Navigation, Pagination, EffectFade],
        // Optional parameters
        //    autoplay: {
        //      delay: 5000,
        //    },
        speed: 700,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // Navigation arrows
        //    navigation: {
        //      nextEl: ".swiper-button-next",
        //      prevEl: ".swiper-button-prev",
        //    },
    });

    // Site Slider fullwidth
    new Swiper('.site-slider-fullwidth', {
        // Modules
        modules: [Autoplay, Navigation, Pagination, EffectFade],
        // Optional parameters
        //    autoplay: {
        //      delay: 5000,
        //    },
        speed: 700,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Site Slider fullwidth
    const referenceElelement = document.querySelector(
        '.block-text-box-contacts > .container',
    );
    const carouselParent = document.querySelector('.block-carousel');
    if (referenceElelement && carouselParent) {
        new Swiper('.site-carousel', {
            // Modules
            modules: [Autoplay, Navigation],
            // Optional parameters
            //    autoplay: {
            //      delay: 5000,
            //    },
            speed: 700,
            slidesPerView: 'auto',
            spaceBetween: 30,
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                // Align slider to previus content (inside container and untill the right of the viewport)
                beforeInit: function () {
                    carouselParent.style.marginLeft =
                        referenceElelement.offsetLeft + 'px';
                },
                resize: function () {
                    console.log('resize');
                    carouselParent.style.marginLeft =
                        referenceElelement.offsetLeft + 'px';
                },
            },
        });
    }

    // Text section with side carousel
    new Swiper('.block-text-side-carousel .site-carousel', {
        // Modules
        modules: [Autoplay, Navigation],
        // Optional parameters
        //    autoplay: {
        //      delay: 5000,
        //    },
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
