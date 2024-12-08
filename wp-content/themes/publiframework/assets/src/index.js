import 'bootstrap/js/dist/collapse'; // Collapse: for navbar mobile collapse and accordion
import 'bootstrap/js/dist/dropdown'; // Dropdown: for navbar submenus

// Site styles
import './index.scss';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// import 'swiper/css/scrollbar';

// Custom functions
import scrollHeader from './js/scrollHeader';
import siteSliders from './js/sliders';
import customSelect from './js/customSelect';

/**
 * Check if the header is scrolled
 */
scrollHeader();

/**
 * Site sliders
 */
siteSliders();

/**
 * Custom select input
 */
customSelect();

// TODO: put in separate file
const servicesForm = document.getElementById('services-form');
if (servicesForm && servicesForm.classList.contains('active')) {
    // scroll page to #top-archive
    const topArchive = document.getElementById('top-archive');
    topArchive.scrollIntoView({ behavior: 'instant' });
}

/**
 * Site scroll animations
 */
// scrollAnimations();
