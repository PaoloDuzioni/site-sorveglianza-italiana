export default function servicesFilters() {
    const servicesForm = document.getElementById('services-form');
    if (servicesForm) {
        if (
            servicesForm.classList.contains('active') ||
            sessionStorage.getItem('servicesFormfilteres') === 'true'
        ) {
            // scroll page to #top-archive
            const topArchive = document.getElementById('top-archive');
            topArchive.scrollIntoView({ behavior: 'instant' });

            // keep track of filtering even when those are cleared
            sessionStorage.setItem('servicesFormfilteres', 'true');
        }

        // TODO: clean up

        // TODO: disable animation for scrool header when filtering services
    } else {
        sessionStorage.removeItem('servicesFormfilteres');
    }
}
