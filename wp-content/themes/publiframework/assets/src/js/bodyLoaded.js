/**
 * REMOVE BODY ONLOAD LAYER
 * Remove the body layer after bootstrap's plugins ( menu, etc...) are loaded
 */
export default function bodyLoaded() {
    document.body.classList.remove('body-loading');
    const bodyLoader = document.querySelector('.body-loader');

    // Fade out (remove when the CSS animation finishes)
    bodyLoader.addEventListener('animationend', function () {
        this.style.display = 'none';
    });
    bodyLoader.classList.add('fadeout');
}
