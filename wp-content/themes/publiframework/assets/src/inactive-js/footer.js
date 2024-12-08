const footer = () => {
  if ($(window).width() < 990) {
    $("footer .titolo-widget-sidebar").click(function () {
      if ($(this).find(".toggler").length) $(this).nextAll("div").slideToggle();
    });
    $("footer .toggler").each(function () {
      $(this).parent(".titolo-widget-sidebar").nextAll().hide();
    });
  }
};

export default footer;
