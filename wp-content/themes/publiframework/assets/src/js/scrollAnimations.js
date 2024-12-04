import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/**
 * GSAP on scroll animations
 *
 * - Fade animations
 * - Animated Counters
 * - Parallax effect
 * - Scroll to ID section
 */
export default function scrollAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

   /**
     * Fade animations
     * needs .animation-container
     * needs data-animation="" attribute
     * optional data-speed="0.5" for animation speed (1 is 1 second)
     * optional data-staggered="true" for an incremental entering of elements (not on mobile)
     * optional data-delay="0.5" // to add a start delay (1 is 1 second)
     */
    const animationContainers = document.querySelectorAll(
        '.animation-container'
    );
    if (animationContainers) {
        const isMobile = window.innerWidth < 768 ? true : false;

        for (let container of animationContainers) {
            const animationElements =
                container.querySelectorAll('[data-animation]');

            // ScrollTrigger
            ScrollTrigger.batch(animationElements, {
                onEnter: batch => {
                    batch.forEach((element, index) => {
                        const speed = element.dataset.speed
                            ? element.dataset.speed
                            : 0.5;
                        const isStaggered = element.dataset.staggered;
                        const delay = element.dataset.delay
                            ? element.dataset.delay
                            : 0;

                        // Animation options
                        let animationOptions = {
                            duration: speed,
                            delay:
                                isStaggered && !isMobile
                                    ? index * 0.3 + delay
                                    : delay,
                            opacity: 1,
                        };

                        // Animation type
                        switch (element.dataset.animation) {
                            case 'fade-in':
                            case 'fade-in-centered':
                                animationOptions.scale = 1;
                                break;
                            case 'fade-left':
                            case 'fade-right':
                            case 'fade-left-full':
                            case 'fade-right-full':
                                animationOptions.x = 0;
                                break;
                            case 'fade-up':
                                animationOptions.y = 0;
                                break;
                            default:
                                console.error(
                                    'Wrong or missing data-animation type'
                                );
                        }

                        gsap.to(element, {
                            ...animationOptions,
                        });
                    });
                },
                once: true,
            });
        }
    }
    
    /**
     * Animated Counters
     */
    const animatedCounters = document.querySelectorAll('.animated-counter');

    for (const counter of animatedCounters) {
        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: '100px 90%',
            },
            textContent: '0',
            duration: 1,
            ease: 'power1.inOut',
            modifiers: {
                // italian puntuation and no decimals
                textContent: value =>
                    value.toLocaleString('it-IT', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    }),
            },
        });
    }

    /**
     * Parallax effect
     * needs .parallax-section and .parallax-image classes
     */
    const parallaxParent = document.querySelector('.parallax-section');
    if (parallaxParent) {
        gsap.to('.parallax-image', {
            yPercent: +50,
            ease: 'none',
            scrollTrigger: {
                trigger: parallaxParent,
                scrub: true,
            },
        });
    }

    /**
     * Scroll to ID section (only if needed for particular situations)
     */
    const urlHash = window.location.href.split('#')[1];
    const scrollElem = document.querySelector('#' + urlHash);

    if (urlHash && scrollElem) {
        const scrollTop = scrollElem.offsetTop;
        // get css header offset custom property and convert to px
        let headerOffset = getComputedStyle(
            document.documentElement
        ).getPropertyValue('--header-scrolled');
        headerOffset = parseInt(headerOffset) * 10;

        gsap.to(window, {
            scrollTo: {
                y: scrollTop - headerOffset,
                autoKill: false,
            },
            duration: 0.5,
        });
    }
}
