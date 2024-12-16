export default function servicesFilters() {
    const servicesForm = document.getElementById('services-form');
    if (!servicesForm) return;

    // Elements
    const topArchive = document.getElementById('top-archive');
    const loader = document.querySelector('.loader');
    const displayResultsElement = document.querySelector('.services-list');
    const template = document.querySelector('#post-box-template');
    const filterInputs = servicesForm.querySelectorAll('.list input');
    const clearFiltersBtn = servicesForm.querySelectorAll('.clear-filters');
    const pagination = document.querySelector('.services-pagination');
    const paginationPrev = pagination.querySelector('.prev');
    const paginationNext = pagination.querySelector('.next');

    // Setup
    let previousSearchController = null;
    const apiBaseUrl =
        servicesForm.dataset.baseUrl + '/wp-json/si-api/v1/services?';
    const postsPerPage = servicesForm.dataset.postsPerPage;
    let totalPages = 1;
    let page = 1;

    // sidebar filters
    let taxonomiesSectors = [];
    let taxonomiesServices = [];

    // pre-filter from external page link
    const urlParams = new URLSearchParams(window.location.search);
    const serviceQuery = urlParams.get('service') ?? null;

    // Optional pre-filter from external page link
    if (serviceQuery) {
        // clean query string
        topArchive.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, null, window.location.pathname);

        // Check filters input and set the taxonomy
        const prefilterInput = servicesForm.querySelector(
            `input[value="${serviceQuery}"]`,
        );
        prefilterInput.checked = true;
        taxonomiesServices.push(serviceQuery);

        // Show clear filters button
        prefilterInput
            .closest('.taxonomy-list')
            .querySelector('.clear-filters')
            .classList.remove('hidden');
    }

    // Fetch services
    fetchServices();

    // Filter inputs
    filterInputs.forEach(input => {
        // API call with filters on change
        input.addEventListener('change', e => {
            page = 1;

            // get checked inputs
            const inputChecked = input
                .closest('.taxonomy-list')
                .querySelectorAll('input:checked');

            // handle reset button visibility
            const resetBtn = input
                .closest('.taxonomy-list')
                .querySelector('.clear-filters');
            if (inputChecked.length > 0) {
                resetBtn.classList.remove('hidden');
            } else {
                resetBtn.classList.add('hidden');
            }

            // setup taxonomies
            const taxonomiesIds = [];
            inputChecked.forEach(input => {
                taxonomiesIds.push(input.value);
            });

            if (input.name === 'taxonomies_sectors') {
                taxonomiesSectors = taxonomiesIds;
            } else {
                taxonomiesServices = taxonomiesIds;
            }

            // sed API call
            fetchServices();
        });
    });

    // Reset inputs
    clearFiltersBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            console.log('lorem');

            const inputElementsChecked = btn
                .closest('.taxonomy-list')
                .querySelectorAll('.list input:checked');

            inputElementsChecked.forEach(input => {
                input.checked = false;
            });

            // clean related filters
            if (inputElementsChecked[0].name === 'taxonomies_sectors') {
                taxonomiesSectors = [];
            } else {
                taxonomiesServices = [];
            }

            btn.classList.add('hidden');

            // sed API call
            fetchServices();
        });
    });

    // Pagination
    paginationPrev.addEventListener('click', () => {
        if (page > 1) {
            page--;
            fetchServices();
        }
    });

    paginationNext.addEventListener('click', () => {
        if (page < totalPages) {
            page++;
            fetchServices();
        }
    });

    /**
     * UTILITIES
     */

    function fetchServices() {
        // Cancel previous request that still running
        if (previousSearchController) {
            previousSearchController.abort();
            previousSearchController = null;
        }

        loader.classList.add('active');

        const apiUrl = apiBaseUrl;
        previousSearchController = new AbortController();

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                posts_per_page: postsPerPage,
                page,
                taxonomiesSectors,
                taxonomiesServices,
            }),
            signal: previousSearchController.signal,
        })
            .then(response => response.json())
            .then(generateResults)
            .catch(error => {
                console.error(error);
                displayResultsElement.innerHTML = `<p class="no-items-text"> Si è verificato un errore. Si pregna di riprovare più tardi.</p>`;
            })
            .finally(() => {
                loader.classList.remove('active');
            });
    }

    function generateResults(data) {
        displayResultsElement.innerHTML = '';

        if (taxonomiesSectors.length > 0 || taxonomiesServices.length > 0) {
            topArchive.scrollIntoView({ behavior: 'smooth' });
        }

        // No data response from server
        if (!data) {
            displayResultsElement.innerHTML = `<p class="no-items-text"> Siè verificato un errore. Si pregna di riprovare più tardi.</p>`;
            return;
        }

        // No results
        if (data.services.length === 0) {
            displayResultsElement.innerHTML = `<p class="no-items-text">Nessun servizio trovato per la corrente selezione. Riprova con altre opzioni.</p>`;
            // hide pagination
            paginationPrev.classList.add('hidden');
            paginationNext.classList.add('hidden');
            return;
        }

        // Add results
        data.services.forEach((service, index) => {
            // Create item from HTML template
            const clone = template.content.cloneNode(true);

            // Fill template with data
            const link = clone.querySelector('.box-services');
            link.href = service.permalink;

            const title = clone.querySelector('.title');
            title.innerHTML = service.title;

            const image = clone.querySelector('.image');
            image.src = service.thumbnail;
            image.alt = service.title;

            // Append to DOM
            displayResultsElement.appendChild(clone);
        });

        // Pagination
        totalPages = Math.ceil(data.postsCount / postsPerPage);

        // pagination prev
        if (page > 1) {
            paginationPrev.classList.remove('hidden');
        } else {
            paginationPrev.classList.add('hidden');
        }

        // pagination next
        if (page + 1 <= totalPages) {
            paginationNext.classList.remove('hidden');
        } else {
            paginationNext.classList.add('hidden');
        }
    }
}
