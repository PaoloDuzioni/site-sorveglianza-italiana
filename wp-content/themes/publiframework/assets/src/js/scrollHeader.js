/**
 * Check if the header is scrolled
 */
export default function scrollHeader() {
    const header = document.querySelector('.site-header');
    // Check in case of page refresh or history back navigation
    checkScrollHeader(header);
    // Check on scroll
    document.addEventListener('scroll', () => checkScrollHeader(header));
    
    function checkScrollHeader(header) {
        const scrollTop = window.scrollY;
        if (scrollTop > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}
