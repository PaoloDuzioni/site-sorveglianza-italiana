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

    // Setup
    let previousSearchController = null;
    const apiBaseUrl =
        servicesForm.dataset.baseUrl + '/wp-json/si-api/v1/services?';
    const postsPerPage = servicesForm.dataset.postsPerPage;
    let page = 1;
    // from sidebar filters
    let taxonomiesSectors = [];
    let taxonomiesServices = [];
    // from external page link pre-filter
    const service = null;

    // Get services
    fetchServices();

    // TODO: pagination
    // TODO: pre filter from external page link

    // Filter inputs
    filterInputs.forEach(input => {
        input.addEventListener('change', e => {
            page = 1;

            // get checked inputs
            const inputChecked = input
                .closest('.tanonomy-list')
                .querySelectorAll('input:checked');

            // handle reset button visibility
            const resetBtn = input
                .closest('.tanonomy-list')
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
            console.log(taxonomiesIds);

            if (input.name === 'taxonomies_sectors') {
                taxonomiesSectors = taxonomiesIds;
            } else {
                taxonomiesServices = taxonomiesIds;
            }

            // sed API call
            fetchServices();
            topArchive.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Reset inputs
    clearFiltersBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            const inputElementsChecked = btn
                .closest('.tanonomy-list')
                .querySelectorAll('.list input:checked');
            console.log(inputElementsChecked);

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

    function fetchServices() {
        if (previousSearchController) {
            previousSearchController.abort();
            previousSearchController = null;
        }

        const params = new URLSearchParams({
            posts_per_page: postsPerPage,
            page,
            taxonomiesSectors,
            taxonomiesServices,
            service,
        });

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
                service,
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
        if (!data) return;

        if (data.length === 0) {
            displayResultsElement.innerHTML = `<p class="no-items-text">Nessun servizio trovato per la corrente selezione. Riprova con altre opzioni.</p>`;
            return;
        }

        // Search main title
        data.forEach((service, index) => {
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
    }
}
