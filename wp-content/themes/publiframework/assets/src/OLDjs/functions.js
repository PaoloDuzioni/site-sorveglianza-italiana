export const elementPageParallax = (elementClass, gap, section) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        //markers: true,
      },
    })
    .fromTo(elementClass, { y: gap }, { y: -gap });
};

export const mostraImmagini = (section) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        //markers: true,
      },
    })
    .from(section, { y: 30, opacity: 0, duration: 1 });
};
