const search = () => {
  $(() => {
    (function ($) {
      $.fn.delayKeyup = function (callback, ms) {
        var timer = 0;
        $(this).keyup(function () {
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
        });
        return $(this);
      };
    })(jQuery);

    for (let ii = 1; ii < 4; ii++) {
      $(".search_form #search-" + ii).delayKeyup(function () {
        var string = $(".search_form #search-" + ii).val();
        if (string.length > 3) {
          var security = $(".search_form #security").val();
          $.ajax({
            type: "POST",
            dataType: "json",
            url: ajax_auth_object.ajaxurl,
            data: {
              action: "ajaxsearch",
              string: string,
              security: security,
              lang: ajax_auth_object.languagecode,
            },
            beforeSend: function () {
              $(".search_results").html('<div class="lds-ripple"><div></div><div></div></div>');
            },
            success: function (data) {
              var html = '<div class="row">';

              $.each(data, function (index, item) {
                html += '<article class="mb-2 mb-lg-3 col-12 col-lg-4 product type-product status-publish has-post-thumbnail">';
                html += '<div class="wrapper"><div class="top">' + item.thumb + "</div>";
                html += '<div class="bottom p-2"><h3 class="entry-title">' + item.post_title + "</h3><p>" + item.post_excerpt + "</p>";
                html += '<a href="' + item.url + '" data-quantity="1" class="button product_type_variable add_to_cart_button">Scegli</a></div></div></article>';
              });

              html += "</div>";

              $(".search_results").html(html);
            },
          });
        }
      }, 500);
    }
  });
};

export default search;
