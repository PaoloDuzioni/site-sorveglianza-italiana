const navbar = () => {
  $(() => {
    $("body").on("click", ".menu-item .material-symbols-outlined", function () {
      $(this).next(".dropdown-menu").toggleClass("d-none");
    });

    if ($(window).width() > 990) {
      $("body").on("mouseenter", ".dropdown", function () {
        $(this).find(".dropdown-menu").removeClass("d-none");
      });
      $("body").on("mouseleave", ".dropdown", function () {
        $(this).find(".dropdown-menu").addClass("d-none");
      });
    }

    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler) {
      navbarToggler.addEventListener("click", () => {
        navbarToggler.classList.toggle("collapsed");
        $("#navbarToggler").toggleClass("aperto");
        $("body").toggleClass("noscroll");
      });
    }

    window.addEventListener("scroll", () => {
      var scroll = $(window).scrollTop();
      var header_top = $(".header-top").outerHeight();

      if (scroll > header_top) {
        $("body").addClass("stickyHeader");
      } else {
        $("body").removeClass("stickyHeader");
      }
    });
  });
};

export default navbar;
