export default function workWithUsForms() {
    const parentSection = document.querySelector('.work-with-us-forms-section');
    if (!parentSection) return;

    const formsContainer = parentSection.querySelector('.forms-container');
    const wrapForms = parentSection.querySelectorAll('.wrap-form');
    const modal = parentSection.querySelector('.application-modal');
    const successMessage = parentSection.querySelector('.success-section');

    // TODO: prepopolate input of modal from with the cv form
    //    const modalCta = document.querySelector('.base-candidature');
    //    const positionInput = formModal.querySelector('.position input');
    // CTA button
    //    modalCta.addEventListener('click', () => {
    //        positionInput.value = 'Candidatura spontanea';
    //    });

    wrapForms.forEach(formParent => {
        const form = formParent.querySelector('.wpcf7');

        // Success message
        form.addEventListener('wpcf7mailsent', () => {
            // hide modal
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
                modalBackdrop.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.overflow = 'initial';
                document.body.paddingRight = '0';
            }

            // message sent section
            formsContainer.classList.add('hidden');
            successMessage.classList.remove('hidden');

            if (modalBackdrop) {
                setTimeout(() => {
                    parentSection.scrollIntoView({
                        behavior: 'smooth',
                    });
                }, 200);
            } else {
                parentSection.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        });
    });
}
