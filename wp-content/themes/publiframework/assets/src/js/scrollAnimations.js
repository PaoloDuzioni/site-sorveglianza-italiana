import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/**
 * GSAP on scroll animations
 *
 * Scroll animation
 * Scroll to ID section
 */
export default function scrollAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /**
     * Scroll Animation
     */
    // Setup
    const isMobile = window.innerWidth < 768 ? true : false;

    function commonScrollOptions(section) {
        return {
            scrollTrigger: {
                trigger: section,
                start: isMobile ? 'top bottom' : '100px 90%',
                //markers: true,
            },
            opacity: 0,
            duration: 0.5,
        };
    }

    // Block Slider video
    const blockSliderVideo = document.querySelector('.block-slider-video');
    if (blockSliderVideo) {
        const title = blockSliderVideo.querySelector('.section-title');
        const cta = blockSliderVideo.querySelector('.button');

        gsap.from(title, {
            ...commonScrollOptions(blockSliderVideo),
            delay: 0.4,
            y: -30,
        });

        gsap.from(cta, {
            ...commonScrollOptions(blockSliderVideo),
            delay: 0.9,
            duration: 0.3,
        });
    }

    // Block Text Side Image and Block Text Side Carousel
    const blockSTextSideImage = document.querySelector(
        '.block-text-side-image, .block-text-side-carousel',
    );
    if (blockSTextSideImage) {
        const colLeft = blockSTextSideImage.querySelector(
            '.wp-block-evidenzio-column:first-child',
        );
        const image = blockSTextSideImage.querySelector(
            '.wp-block-image, .block-carousel',
        );

        const delay =
            blockSTextSideImage.previousElementSibling.classList.contains(
                'block-slider-video',
            )
                ? 0.4
                : 0;

        gsap.from(colLeft, {
            ...commonScrollOptions(blockSTextSideImage),
            x: -100,
            delay,
        });

        gsap.from(image, {
            ...commonScrollOptions(image),
            x: 100,
            delay,
        });
    }

    // Block Slider Fullwidth
    const blockSliderFullwidth = document.querySelector(
        '.block-slider-fullwidth',
    );
    if (blockSliderFullwidth) {
        const content = blockSliderFullwidth.querySelector('.content');

        gsap.from(content, {
            ...commonScrollOptions(content),
            x: 100,
        });
    }

    // Block News Section
    const blockNewsSection = document.querySelector('.block-news-section');
    if (blockNewsSection) {
        const title = blockNewsSection.querySelector('.titolo_pb');
        const wrapper = blockNewsSection.querySelector('.boxes-news');
        const cols = blockNewsSection.querySelectorAll(
            '.news-section .row > div',
        );

        gsap.from(title, {
            ...commonScrollOptions(title),
            scale: 0,
        });

        if (isMobile) {
            for (const col of cols) {
                gsap.from(col, {
                    ...commonScrollOptions(col),
                    scale: 0,
                    stagger: 0.3,
                });
            }
        } else {
            gsap.from(cols, {
                ...commonScrollOptions(wrapper),
                scale: 0,
                stagger: 0.3,
            });
        }
    }

    // Page News Archive
    const pageNewsArchive = document.querySelector('.news-archive');
    if (pageNewsArchive) {
        const wrapper = pageNewsArchive.querySelector('.boxes-news');
        const cols = pageNewsArchive.querySelectorAll('.boxes-news > div');
        const delay = 0.4;

        if (isMobile) {
            for (const col of cols) {
                gsap.from(col, {
                    ...commonScrollOptions(col),
                    scale: 0,
                    stagger: 0.3,
                    delay,
                });
            }
        } else {
            gsap.from(cols, {
                ...commonScrollOptions(wrapper),
                scale: 0,
                stagger: 0.3,
                delay,
            });
        }
    }

    // Page News Single
    const pageNewsSingle = document.querySelector('.single-news-content');
    if (pageNewsSingle) {
        const colLeft = pageNewsSingle.querySelectorAll(
            '.wp-block-evidenzio-column:nth-child(1), .wp-block-evidenzio-column:nth-child(2)',
        );
        const colRight = pageNewsSingle.querySelector(
            '.wp-block-evidenzio-column:nth-child(3)',
        );
        const delay = 0.4;

        gsap.from(colLeft, {
            ...commonScrollOptions(colLeft),
            x: -100,
            delay,
        });

        gsap.from(colRight, {
            ...commonScrollOptions(colRight),
            x: 100,
            delay,
        });
    }

    // Block Form Section
    const blockFormSection = document.querySelector('.block-form-section');
    if (blockFormSection) {
        const titles = blockFormSection.querySelectorAll('.titolo_pb');

        const form = blockFormSection.querySelector('.wpcf7-form');

        gsap.from(titles, {
            ...commonScrollOptions(titles),
            scale: 0,
            stagger: 0.3,
        });

        gsap.from(form, {
            ...commonScrollOptions(form),
            scale: 0,
        });
    }

    // Block Hero
    const blockHero = document.querySelector('.block-hero');
    if (blockHero) {
        const titolo = blockHero.querySelector('.titolo_pb');

        gsap.from(titolo, {
            ...commonScrollOptions(titolo),
            scale: 0,
            delay: 0.4,
        });
    }

    // Block Text Section, Block Banner Testo
    const blockTextSection = document.querySelector(
        '.block-text-section, .block-banner-testo',
    );
    if (blockTextSection) {
        const columns = blockTextSection.querySelectorAll(
            '.wp-block-evidenzio-column',
        );

        gsap.from(columns, {
            ...commonScrollOptions(columns),
            x: 100,
            delay: 0.4,
        });
    }

    // Block Two Columns
    const blockTwoColumns = document.querySelectorAll('.block-two-columns');
    if (blockTwoColumns) {
        for (const block of blockTwoColumns) {
            const colLeft = block.querySelector(
                '.wp-block-evidenzio-column:nth-child(1)',
            );
            const colRight = block.querySelector(
                '.wp-block-evidenzio-column:nth-child(2)',
            );

            gsap.from(colLeft, {
                ...commonScrollOptions(colLeft),
                x: -100,
            });

            if (colRight)
                gsap.from(colRight, {
                    ...commonScrollOptions(colRight),
                    x: 100,
                });
        }
    }

    // Block Text Box Contacts
    const blockTextBoxContacts = document.querySelector(
        '.block-text-box-contacts',
    );
    if (blockTextBoxContacts) {
        const colLeft = blockTextBoxContacts.querySelector(
            '.wp-block-evidenzio-column:nth-child(1)',
        );
        const colRight = blockTextBoxContacts.querySelector(
            '.wp-block-evidenzio-column:nth-child(2)',
        );
        const delay = 0.4;

        gsap.from(colLeft, {
            ...commonScrollOptions(colLeft),
            x: -100,
            delay,
        });

        gsap.from(colRight, {
            ...commonScrollOptions(colRight),
            x: 100,
            delay,
            // detect when animation is complete
            onComplete: () => {
                blockTextBoxContacts.style.overflow = 'visible';
            },
        });
    }

    // Block Carousel
    const blockCarousel = document.querySelector(
        '.block-carousel .wrap-carousel',
    );
    if (blockCarousel) {
        gsap.from(blockCarousel, {
            ...commonScrollOptions(blockCarousel),
            x: 100,
        });
    }

    // Block Boxes Cat Services, Block Boxes Services Related
    const blockCatServices = document.querySelector(
        '.block-boxes-cat-services, .block-boxes-services-related',
    );
    if (blockCatServices) {
        const topElements = blockCatServices.querySelectorAll(
            '.top .section-subtitle, .top .cta',
        );
        const wrapper = blockCatServices.querySelector('.wrap-boxes');
        const cols = wrapper.querySelectorAll('.wrap-boxes > div');

        gsap.from(topElements, {
            ...commonScrollOptions(topElements),
            scale: 0,
        });

        if (isMobile) {
            for (const col of cols) {
                gsap.from(col, {
                    ...commonScrollOptions(col),
                    scale: 0,
                    stagger: 0.3,
                });
            }
        } else {
            gsap.from(cols, {
                ...commonScrollOptions(wrapper),
                scale: 0,
                stagger: 0.3,
            });
        }
    }

    // Block Work Application
    const blockWorkApplication = document.querySelector(
        '.block-work-application',
    );
    if (blockWorkApplication) {
        const elements = blockWorkApplication.querySelectorAll(
            '.wp-block-evidenzio-column',
        );

        gsap.from(elements, {
            ...commonScrollOptions(blockWorkApplication),
            x: 100,
            delay: 0.4,
            // Avoid boostrap modal to be under the animated columns
            onComplete: () => {
                elements.forEach(element => {
                    element.style.transform = 'none';
                });
            },
        });
    }

    // Block Text With Boxes
    const blockTextWithBoxes = document.querySelector('.block-text-with-boxes');
    if (blockTextWithBoxes) {
        const container = blockTextWithBoxes.querySelectorAll('.container');

        gsap.from(container, {
            ...commonScrollOptions(container),
            x: 100,
        });
    }

    /**
     * Scroll to ID section
     */
    const urlHash = window.location.href.split('#')[1];
    const scrollElem = document.querySelector('#' + urlHash);

    if (urlHash && scrollElem) {
        const scrollTop = scrollElem.offsetTop;
        // get css header offset custom property and convert to px
        let headerOffset = getComputedStyle(
            document.documentElement,
        ).getPropertyValue('--header-scrolled-height');
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
