const woocommerce = () => {
  $(() => {
    // wc_add_to_cart_params is required to continue, ensure the object exists
    if (typeof wc_add_to_cart_params === "undefined") return false;

    // Ajax add to cart
    ajaxAddToCart();

    variationSelect();

    if ($(".wc-block-product-categories").length) {
      $(".wc-block-product-categories > ul > li").each(function () {
        if ($(this).find("ul").length) {
          $(this).append('<span class="toggler"></span>');
        }
      });
      $("body").on("click", ".wc-block-product-categories .toggler", function () {
        $(this).prev("ul").toggle();
        $(this).toggleClass("aperto");
      });
      var currentH1 = $("#content h1").text();
      $(".wc-block-product-categories a").each(function () {
        var titolo = $(this).text();
        if (titolo == currentH1) {
          $(this).addClass("active");
          $(this).parents("ul").prevAll("a").addClass("active");
          $(this).parents("ul").show();
          $(this).parents("ul").next(".toggler").addClass("aperto");
        }
      });
    }

    $("body").on("click", ".qtyupdate", function (e) {
      e.preventDefault();

      var item_hash = $(this).data("hash");
      var item_quantity = $(this).data("qty");

      if ($(this).hasClass("disabled")) return false;

      $(".loader-spinner").removeClass("hidden");

      $.ajax({
        type: "POST",
        dataType: "json",
        url: ajax_auth_object.ajaxurl,
        data: {
          action: "update_item_from_cart",
          cart_item_key: item_hash,
          qty: item_quantity,
        },
        success: function (data) {
          if (data && data.fragments) {
            $.each(data.fragments, function (key, value) {
              $(key).replaceWith(value);
            });
            $(document.body).trigger("wc_fragments_refreshed");
          }
        },
      });
    });

    $("body").on("click", ".add_coupon_custom button", function (e) {
      e.preventDefault();
      var data = {
        coupon_code: jQuery(this).prev("input").val(),
        security: ajax_auth_object.apply_coupon_nonce,
      };

      $(".loader-spinner").removeClass("hidden");
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/?wc-ajax=apply_coupon",
        data: data,
        complete: function () {
          //$( document.body ).trigger( 'applied_coupon', [ coupon_code ] );
          get_minicart();
        },
      });
    });

    function get_minicart() {
      var data = {
        action: "get_minicart",
        coupon_code: jQuery(this).prev("input").val(),
        security: ajax_auth_object.apply_coupon_nonce,
      };

      $.ajax({
        type: "POST",
        dataType: "json",
        url: ajax_auth_object.ajaxurl,
        data: data,
        success: function (data) {
          if (data && data.fragments) {
            $.each(data.fragments, function (key, value) {
              $(key).replaceWith(value);
            });
            $(document.body).trigger("wc_fragments_refreshed");
          }
        },
      });
    }

    $(".add_coupon_box .toggler").click(function () {
      $(".add_coupon_custom").toggleClass("hidden");
    });

    $("body").on("click", ".close_cart", function () {
      $("#minicart_box").addClass("d-none");
    });

    $("body").on("click", ".menu_cart", function () {
      var count = $(this).find(".cart-contents-count").data("count");
      if (count > 0) $("#minicart_box").removeClass("d-none");
    });

    $("body").on("added_to_cart", function () {
      $("#minicart_box").removeClass("d-none");
    });

    if ($(".varianti_radio").length) {
      $(".varianti_radio a").click(function (e) {
        e.preventDefault();
        var attributo = $(this).attr("data-attributo");
        var opzione = $(this).attr("data-opzione");
        $(this).parent().parent(".row").find("a").removeClass("selected");
        $(this).addClass("selected");
        $("select#" + attributo)
          .val(opzione)
          .change();
        $(".varianti_radio a").each(function () {
          var l = $("select#" + $(this).attr("data-attributo")).find('option[value="' + $(this).attr("data-opzione") + '"]');
          if (l.length == 0) {
            $(this).parent("div").addClass("disabled");
          } else {
            $(this).parent("div").removeClass("disabled");
          }
        });
        $(".single_variation_wrap p.price").hide();
      });
    }
  });
};

export default woocommerce;

/**
 *  Ajax add to cart
 */

const ajaxAddToCart = () => {
  $(document).on("click", ".variations_form .single_add_to_cart_button", function (e) {
    e.preventDefault();

    var $variation_form = $(this).closest(".variations_form");
    var var_id = $variation_form.find("input[name=variation_id]").val();
    var product_id = $variation_form.find("input[name=product_id]").val();
    var quantity = $variation_form.find("input[name=quantity]").val();

    //attributes = [];
    $(".ajaxerrors").remove();
    var item = {},
      check = true;

    var variations = $variation_form.find("select[name^=attribute]");

    /* Updated code to work with radio button - mantish - WC Variations Radio Buttons - 8manos */
    if (!variations.length) {
      variations = $variation_form.find("[name^=attribute]:checked");
    }

    /* Backup Code for getting input variable */
    if (!variations.length) {
      variations = $variation_form.find("input[name^=attribute]");
    }

    variations.each(function () {
      var $this = $(this),
        attributeName = $this.attr("name"),
        attributevalue = $this.val(),
        index,
        attributeTaxName;

      $this.removeClass("error");

      if (attributevalue.length === 0) {
        index = attributeName.lastIndexOf("_");
        attributeTaxName = attributeName.substring(index + 1);

        $this.addClass("required error").before('<div class="ajaxerrors"><p>Please select ' + attributeTaxName + "</p></div>");

        check = false;
      } else {
        item[attributeName] = attributevalue;
      }
    });

    if (!check) {
      return false;
    }

    var $thisbutton = $(this);

    if ($thisbutton.is(".variations_form .single_add_to_cart_button")) {
      $thisbutton.removeClass("added");
      $thisbutton.addClass("loading");

      var data = {
        action: "woocommerce_add_to_cart_variable_rc",
      };

      $variation_form.serializeArray().map(function (attr) {
        if (attr.name !== "add-to-cart") {
          if (attr.name.endsWith("[]")) {
            let name = attr.name.substring(0, attr.name.length - 2);
            if (!(name in data)) {
              data[name] = [];
            }
            data[name].push(attr.value);
          } else {
            data[attr.name] = attr.value;
          }
        }
      });

      // Trigger event
      $("body").trigger("adding_to_cart", [$thisbutton, data]);

      // Ajax action
      $.post(wc_add_to_cart_params.ajax_url, data, function (response) {
        if (!response) {
          return;
        }

        if (response.error && response.product_url) {
          window.location = response.product_url;
          return;
        }

        // Redirect to cart option
        if (wc_add_to_cart_params.cart_redirect_after_add === "yes") {
          window.location = wc_add_to_cart_params.cart_url;
          return;
        }

        // Trigger event so themes can refresh other areas.
        $(document.body).trigger("added_to_cart", [response.fragments, response.cart_hash, $thisbutton]);
      });

      return false;
    } else {
      return true;
    }
  });
};

const variationSelect = () => {
  $(".variations select").each(function () {
    var opz = $(this).val();
    console.log($(this).val());
    $('a[data-opzione="' + opz + '"]').addClass("selected");
  });
};
