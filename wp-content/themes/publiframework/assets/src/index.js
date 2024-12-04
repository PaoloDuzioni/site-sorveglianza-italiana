import "bootstrap/js/dist/collapse"; // Collapse: for navbar mobile collapse and accordion
import "bootstrap/js/dist/dropdown"; // Dropdown: for navbar submenus
import "./index.scss";
import "swiper/css";

//import Swiper from "swiper";
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// Custom
import scrollHeader from "./js/scrollHeader";
import siteSliders from "./js/sliders";

/**
 * Check if the header is scrolled
 */
scrollHeader();

/**
 * Site sliders
 */
siteSliders();

/**
 * Site scroll animations
 */
// scrollAnimations();
