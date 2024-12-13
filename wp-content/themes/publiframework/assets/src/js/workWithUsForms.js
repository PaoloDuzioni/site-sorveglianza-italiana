export default function workWithUsForms() {
    const parentSection = document.querySelector('.work-with-us-forms-section');
    if (!parentSection) return;

    // Elelemts
    const formsContainer = parentSection.querySelector('.forms-container');
    const wrapForms = parentSection.querySelectorAll('.wrap-form');
    const modal = parentSection.querySelector('.application-modal');
    const successMessage = parentSection.querySelector('.success-section');

    // Pre-populate modal from fields
    const btnShowModal = parentSection.querySelector('.btn-show-modal');
    const applicationForm = parentSection.querySelector(
        '.application-form-section .wpcf7',
    );
    const modalForm = modal.querySelector('.wpcf7');

    /**
     * Prepopolate input of modal from with the cv form
     * to avoid re-typing the data.
     */
    btnShowModal.addEventListener('click', () => {
        modalForm.querySelector('input[name="nome"]').value =
            applicationForm.querySelector('input[name="nome"]').value;
        modalForm.querySelector('input[name="cognome"]').value =
            applicationForm.querySelector('input[name="cognome"]').value;
        modalForm.querySelector('input[name="telefono"]').value =
            applicationForm.querySelector('input[name="telefono"]').value;
        modalForm.querySelector('input[name="email"]').value =
            applicationForm.querySelector('input[name="email"]').value;
        modalForm.querySelector('select[name="provincia"]').value =
            applicationForm.querySelector('select[name="provincia"]').value;
    });

    /**
     * Form submits for thank you message
     */
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
