// Site styles
import './index.scss';

// Bootstrap
import 'bootstrap/js/dist/collapse'; // Collapse: for navbar mobile collapse and accordion
import 'bootstrap/js/dist/dropdown'; // Dropdown: for navbar submenus
import 'bootstrap/js/dist/modal'; // Modal: for modals

// Particle effect as in News block
import './js/particles';

// Custom functions
import scrollHeader from './js/scrollHeader';
import siteSliders from './js/sliders';
import customSelect from './js/customSelect';
import servicesFilters from './js/servicesFilters';
import workWithUsForms from './js/workWithUsForms';

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

/**
 * Services filters
 */
servicesFilters();

/**
 * Forms for work with us
 */
workWithUsForms();

/**
 * Site scroll animations
 */
// scrollAnimations();
