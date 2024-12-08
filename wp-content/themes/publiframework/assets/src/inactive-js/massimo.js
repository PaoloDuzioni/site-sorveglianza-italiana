const massimo = () => {
  $(() => {


    $(".link-ev-modal").click(function () {
      $(this).next(".modal").appendTo("#wrapperModalLavora");
      var dest = $(this).data("dest");
      const myModal = new Modal(dest);
      myModal.show();
    });

    $(".filtro_colore").parents(".woocommerce-widget-layered-nav-list").addClass("wrapper_filtro_colore");

    $("a.scroll-link, .scroll-link>a").click(function (e) {
      e.preventDefault();
      var link = $(this).attr("href");
      $("html, body").animate({ scrollTop: $("#" + link).offset().top - 200 }, 800);
    });

    $(".titolo_pb").each(function () {
      var ancora = $(this).data("ancora");
      if (!(typeof ancora === "undefined" || ancora === null)) {
        $(this).on("click", function () {
          if ($("#idmanuale_" + ancora).length) $("html, body").animate({ scrollTop: $("#idmanuale_" + ancora).offset().top }, 800);
          else console.log("#idmanuale_" + ancora + " non trovato!!");
        });
      }
    });

    if ($(window).width() < 990) {
      $(".mobile-toggler .titolo_pb").click(function () {
        $(this).toggleClass("aperto");
        $(this).parents(".mobile-toggler").toggleClass("aperto");
      });
    }
  });
};

export default massimo;
