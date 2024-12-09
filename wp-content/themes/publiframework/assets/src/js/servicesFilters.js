export default function servicesFilters() {
    const servicesForm = document.getElementById('services-form');
    if (servicesForm) {
        const clearFiltersBtn = servicesForm.querySelectorAll('.clear-filters');
        const filterInputs = servicesForm.querySelectorAll('.list input');

        // Autoscroll
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

        // Reset inputs
        clearFiltersBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();

                const inputElementsChecked = btn
                    .closest('.tanonomy-list')
                    .querySelectorAll('.list input:checked');

                inputElementsChecked.forEach(input => {
                    input.removeAttribute('checked');
                });

                // remove query string from url (prefilter from external pages)
                cleanQueryString();

                servicesForm.submit();
            });
        });

        // Filter inputs
        filterInputs.forEach(input => {
            input.addEventListener('change', e => {
                e.preventDefault();

                // remove query string from url (prefilter from external pages)
                cleanQueryString();

                servicesForm.submit();
            });
        });

        // TODO: disable animation for scrool header when filtering services
    } else {
        sessionStorage.removeItem('servicesFormfilteres');
    }

    function cleanQueryString() {
        const queryString = window.location.search;
        if (queryString) {
            const url = window.location.href.split(queryString)[0];
            window.history.pushState({}, '', url);
        }
    }
}
