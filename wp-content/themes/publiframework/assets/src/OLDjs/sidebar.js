const sidebar = () => {
  $(() => {
    if ($(window).width() < 990) {
      $(".titolo_sidebar_shop").click(function (e) {
        e.preventDefault();
        $(".sidebar_shop").toggleClass("open");
      });
    }

    $(".sidebar_shop .titolo-widget-sidebar").click(function () {
      $(this).toggleClass("aperto");
      $(this).next(".woocommerce-widget-layered-nav-list").toggleClass("aperto");
    });
  });
};

export default sidebar;
