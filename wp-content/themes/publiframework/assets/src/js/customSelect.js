export default function customSelect() {
    const customSelects = document.querySelectorAll('.wrap-select select');
    if (!customSelects) return;

    customSelects.forEach(customSelect => {
        // In case on pre-selected values
        if (customSelect.value === '') {
            customSelect.classList.add('empty');
        }

        customSelect.addEventListener('change', () => {
            customSelect.value === ''
                ? customSelect.classList.add('empty')
                : customSelect.classList.remove('empty');
        });
    });
}
