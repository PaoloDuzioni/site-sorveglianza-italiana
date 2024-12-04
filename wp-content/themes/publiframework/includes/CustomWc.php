<?php

function timber_set_product($post)
{
    global $product;
    if (is_woocommerce()) {
        $product = wc_get_product($post->ID);
    }
}

remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0);
remove_action('woocommerce_before_shop_loop', 'woocommerce_result_count', 20, 0);
add_action('woocommerce_before_cart', 'add_container_div', 10);
add_action('woocommerce_before_checkout_form', 'add_container_div', 10);
// remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );
add_action('woocommerce_after_cart', 'close_div', 10);
// remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
// remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
// add_action( 'woocommerce_single_product_summary', 'woocommerce_template_loop_add_to_cart', 50 );
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);
add_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 10);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
remove_action('woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15);
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);
// add_action( 'woocommerce_checkout_order_review', 'woocommerce_checkout_coupon_form', 15 );

/**
 * Update Item From Cart
 */

add_action('wp_ajax_update_item_from_cart', 'update_item_from_cart');
add_action('wp_ajax_nopriv_update_item_from_cart', 'update_item_from_cart');
function update_item_from_cart()
{
    $cart_item_key = $_POST['cart_item_key'];
    $quantity = $_POST['qty'];

    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
        if ($cart_item_key == $_POST['cart_item_key']) {
            WC()->cart->set_quantity($cart_item_key, $quantity, $refresh_totals = true);
        }
    }
    ob_start();
    woocommerce_mini_cart();
    $mini_cart = ob_get_clean();
    $data = array(
        'fragments' => apply_filters(
            'woocommerce_add_to_cart_fragments',
            array(
                'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>',
            )
        ),
        'cart_hash' => WC()->cart->get_cart_hash(),
    );

    wp_send_json($data);
}

/**
 * Get Minicart
 */

add_action('wp_ajax_get_minicart', 'get_minicart');
add_action('wp_ajax_nopriv_get_minicart', 'get_minicart');
function get_minicart()
{
    ob_start();
    woocommerce_mini_cart();
    $mini_cart = ob_get_clean();
    $data = array(
        'fragments' => apply_filters(
            'woocommerce_add_to_cart_fragments',
            array(
                'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>',
            )
        ),
        'cart_hash' => WC()->cart->get_cart_hash(),
    );
    wp_send_json($data);
}

/**
 * Woocommerce Menu Cart Shortcode
 */

add_shortcode('woo_menu_cart', 'woo_menu_cart');
function woo_menu_cart()
{
    ob_start();
    $cart_count = WC()->cart->cart_contents_count; // Set variable for cart item count
    $cart_url = wc_get_cart_url();  // Set Cart URL
    echo $cart_count;
    return ob_get_clean();
}

/**
 * Cart Counter
 */

add_filter('woocommerce_add_to_cart_fragments', 'woo_cart_but_count');
function woo_cart_but_count($fragments)
{
    ob_start();
    $cart_count = WC()->cart->cart_contents_count;
    $cart_url = wc_get_cart_url();
    echo '<span class="cart-contents-count" data-count="' . $cart_count . '">' . $cart_count . '</span>';
    $fragments['.cart-contents-count'] = ob_get_clean();
    return $fragments;
}

/**
 * AJAX add to cart variable
 */

add_action('wp_ajax_woocommerce_add_to_cart_variable_rc', 'woocommerce_add_to_cart_variable_rc_callback');
add_action('wp_ajax_nopriv_woocommerce_add_to_cart_variable_rc', 'woocommerce_add_to_cart_variable_rc_callback');
function woocommerce_add_to_cart_variable_rc_callback()
{
    ob_start();
    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity = empty($_POST['quantity']) ? 1 : apply_filters('woocommerce_stock_amount', $_POST['quantity']);
    $variation_id = $_POST['variation_id'];
    $cart_item_data = $_POST;
    unset($cart_item_data['quantity']);
    $variation = array();

    foreach ($cart_item_data as $key => $value) {
        if (preg_match("/^attribute*/", $key)) {
            $variation[$key] = $value;
        }
    }

    foreach ($variation as $key => $value) {
        $variation[$key] = stripslashes($value);
    }
    $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity);

    if ($passed_validation && WC()->cart->add_to_cart($product_id, $quantity, $variation_id, $variation, $cart_item_data)) {
        do_action('woocommerce_ajax_added_to_cart', $product_id);
        if (get_option('woocommerce_cart_redirect_after_add') == 'yes') {
            wc_add_to_cart_message($product_id);
        }
        global $woocommerce;
        $items = $woocommerce->cart->get_cart();
        wc_setcookie('woocommerce_items_in_cart', count($items));
        wc_setcookie('woocommerce_cart_hash', md5(json_encode($items)));
        do_action('woocommerce_set_cart_cookies', true);
        // Return fragments
        WC_AJAX::get_refreshed_fragments();
    } else {

        // If there was an error adding to the cart, redirect to the product page to show any errors
        $data = array(
            'error' => true,
            'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id)
        );
        wp_send_json_error($data);
    }
}

function cc_post_title_filter($where, &$wp_query)
{
    global $wpdb;
    if ($search_term = $wp_query->get('cc_search_post_title')) {
        $where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . $wpdb->esc_like($search_term) . '%\'';
    }
    return $where;
}

/**
 * Ajax Search
 */

add_action('wp_ajax_nopriv_ajaxsearch', 'ajaxsearch');
add_action('wp_ajax_ajaxsearch', 'ajaxsearch');
function ajaxsearch()
{

    check_ajax_referer('ajax-login-nonce', 'security');
    $string = $_POST['string'];
    $currentLang = $_POST['lang'];

    $args = array(
        'post_type' => array('product'),
        'cc_search_post_title' => $string,
        'post_status' => 'publish',
    );
    add_filter('posts_where', 'cc_post_title_filter', 10, 2);
    $query = new WP_Query($args);
    remove_filter('posts_where', 'cc_post_title_filter', 10);
    $posts1 = $query->posts;

    $args2 = array(
        'post_type' => array('product'),
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => '_sku',
                'value' => $string,
                'compare' => 'LIKE'
            )
        )
    );
    $query2 = new WP_Query($args2);
    $posts2 = $query2->posts;

    $unique = array_merge($posts1, $posts2);

    foreach ($unique as $p) {
        $p->url = get_permalink($p->ID);
        if (has_post_thumbnail($p->ID)) {
            $p->thumb = get_the_post_thumbnail($p->ID, 'medium');
        }
        $p->post_excerpt = substr($p->post_excerpt, 0, 50) . '...';
    }

    echo json_encode($unique);
    die();
}

/**
 * Filter Woocommerce Layered Nav
 */

add_filter('woocommerce_layered_nav_term_html', 'filter_woocommerce_layered_nav_term_html', 10, 4);
function filter_woocommerce_layered_nav_term_html($term_html, $term, $link, $count)
{
    if ($term->taxonomy == 'pa_colors') {
        $colore = get_field('colore', 'term_' . $term->term_id);
        if (!$colore) $colore = '#cccccc';
        $term_html = '<a rel="nofollow" class="filtro_colore" href="' . $link . '" title="' . $term->name . '" style="background-color:' . $colore . '"></a>';
    }
    return $term_html;
};

/**
 * Loop Shop per page
 */

add_filter('loop_shop_per_page', 'new_loop_shop_per_page', 20);
function new_loop_shop_per_page($cols)
{
    // $cols contains the current number of products per page based on the value stored on Options –> Reading
    // Return the number of products you wanna show per page.
    $cols = 15;
    return $cols;
}

/**
 * Add Bootstrap classes to Woocommerce Inputs
 */

add_filter('woocommerce_form_field_args', 'lv2_add_bootstrap_input_classes', 10, 3);
function lv2_add_bootstrap_input_classes($args, $key, $value = null)
{

    // Start field type switch case
    switch ($args['type']) {

        case "select":  /* Targets all select input type elements, except the country and state select input types */
            $args['class'][] = 'form-group'; // Add a class to the field's html element wrapper - woocommerce input types (fields) are often wrapped within a <p></p> tag
            $args['input_class'] = array('form-control', 'input-lg'); // Add a class to the form input itself
            //$args['custom_attributes']['data-plugin'] = 'select2';
            $args['label_class'] = array('control-label');
            $args['custom_attributes'] = array('data-plugin' => 'select2', 'data-allow-clear' => 'true', 'aria-hidden' => 'true',); // Add custom data attributes to the form input itself
            break;

        case 'country': /* By default WooCommerce will populate a select with the country names - $args defined for this specific input type targets only the country select element */
            $args['class'][] = 'form-group single-country';
            $args['label_class'] = array('control-label');
            break;

        case "state": /* By default WooCommerce will populate a select with state names - $args defined for this specific input type targets only the country select element */
            $args['class'][] = 'form-group'; // Add class to the field's html element wrapper
            $args['input_class'] = array('form-control', 'input-lg'); // add class to the form input itself
            //$args['custom_attributes']['data-plugin'] = 'select2';
            $args['label_class'] = array('control-label');
            $args['custom_attributes'] = array('data-plugin' => 'select2', 'data-allow-clear' => 'true', 'aria-hidden' => 'true',);
            break;


        case "password":
        case "text":
        case "email":
        case "tel":
        case "number":
            $args['class'][] = 'form-group';
            //$args['input_class'][] = 'form-control input-lg'; // will return an array of classes, the same as bellow
            $args['input_class'] = array('form-control', 'input-lg');
            $args['label_class'] = array('control-label');
            break;

        case 'textarea':
            $args['input_class'] = array('form-control', 'input-lg');
            $args['label_class'] = array('control-label');
            break;

        case 'checkbox':
            $args['input_class'] = array();
            break;

        case 'radio':
            $args['input_class'] = array();
            break;

        default:
            $args['class'][] = 'form-group';
            $args['input_class'] = array('form-control', 'input-lg');
            $args['label_class'] = array('control-label');
            break;
    }

    return $args;
}

/**
 * Add Bootstrap Class To Checkput Fields
 */

add_filter('woocommerce_checkout_fields', 'addBootstrapToCheckoutFields');
function addBootstrapToCheckoutFields($fields)
{
    foreach ($fields as &$fieldset) {
        foreach ($fieldset as &$field) {
            $field['class'][] = 'form-group';
            $field['input_class'][] = 'form-control';
        }
    }
    return $fields;
}

/**
 * Shop
 */

// Remove the product archive title
add_filter('woocommerce_show_page_title', '__return_false');
// Remove WooCommerce breadcrumbs
remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
// Remove the WooCommerce result count
remove_action('woocommerce_before_shop_loop', 'woocommerce_result_count', 20);
// Remove the "Order By" dropdown from product archives
remove_action('woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30);
// Remove the default shop page description
remove_action('woocommerce_archive_description', 'woocommerce_product_archive_description', 10);

// Add a custom container before the woocommerce_before_main_content hook
add_action('woocommerce_before_shop_loop', 'container_start', 5);
function container_start()
{

    open_container_with_class('container pt-5');
    open_container_with_class('row');
    open_container_with_class('col-12 col-lg-3');

    // Query default args
    $args = [
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids'
    ];

    // Query
    $products = get_posts($args);
    if (!empty($products)) {
        $categories = wp_get_object_terms($products, 'product_cat');
        if (!empty($categories)) {
            echo '<ul class="woocommerce-categories">';
            foreach ($categories as $category) {
                $current = (is_product_category($category->slug)) ? 'current' : '';
                echo '<li class="woocommerce-product-category-page ' . $current . '">';
                echo '<a href="' . esc_url(get_term_link($category)) . '" class="' . esc_attr($category->slug) . '">';
                echo esc_html($category->name);
                echo '</a>';
                echo '</li>';
            }
            echo '</ul>';
        }
    }

    close_container();
    open_container_with_class('col-12 col-lg-9');
}

// Close the custom container after the main content
add_action('woocommerce_after_shop_loop', function () {
    close_container();
    close_container();
    close_container();
}, 15);

// Set Products Archive Layout
add_filter('woocommerce_output_related_products_args', 'pubfa_prod_archive_layout', 20);
function pubfa_prod_archive_layout($args)
{
    $args['posts_per_page'] = 9;
    $args['columns'] = 3;
    return $args;
}

/**
 * Product
 */

// Open container before product
add_action('woocommerce_before_single_product', function () {
    open_container_with_class('container');
}, 5);

// Open row and column before product gallery
add_action('woocommerce_before_single_product_summary', function () {
    open_container_with_class('row');
    open_container_with_class('col-12 col-md-6');
}, 5);

// Close column product gallery and open column product summary
add_action('woocommerce_before_single_product_summary', function () {
    close_container();
    open_container_with_class('col-12 col-md-6');
}, 25);

// Close column product summary and open column product related
add_action('woocommerce_after_single_product_summary', function () {
    close_container();
    open_container_with_class('col-12');
}, 15);

// Close column product related and close row
add_action('woocommerce_after_related_products', function () {
    close_container();
    close_container();
}, 5);

// Close container after product
add_action('woocommerce_after_single_product', function () {
    close_container();
});

// /**
//  * Move product description under the title
//  */

// add_action('woocommerce_single_product_summary', 'move_product_description_under_title', 15);
// function move_product_description_under_title()
// {
//     global $post;

//     // Get the product description
//     $product_description = apply_filters('the_content', $post->post_content);

//     if ($product_description) {
//         echo '<div class="woocommerce-product-description">' . $product_description . '</div>';
//     }
// }

// /**
//  * Add new Custom Tabs to Product
//  */

// add_filter('woocommerce_product_tabs', 'add_custom_product_tabs');
// function add_custom_product_tabs($tabs)
// {

//     // Remove Description Tab
//     // unset($tabs['description']);

//     // Example Tab
//     $tabs['example_tab'] = array(
//         'title'    => __('example', THEME_SLUG),
//         'priority' => 50,
//         'callback' => 'example_tab_content'
//     );
//     return $tabs;
// }

// function example_tab_content()
// {
//     if (!empty($example = get_field('example'))) {
//         echo '<h2>' . __('example', THEME_SLUG) . '</h2>';
//         echo '<div>' . $example . '</div>';
//     }
// }

/**
 * Checkout
 */

// Open the row and the first column (8/12)
add_action('woocommerce_checkout_before_customer_details', function () {
    open_container_with_class('row');
    open_container_with_class('col-12 col-md-8');
});

// Close the first column and open the second column (4/12) after customer details
add_action('woocommerce_checkout_after_customer_details', function () {
    close_container();
    open_container_with_class('col-12 col-md-4');
});

// Close the second column and the row after order review
add_action('woocommerce_checkout_after_order_review', function () {
    close_container();
    close_container();
});

/**
 * Open Container 
 * 
 * @param string $class
 */

function open_container_with_class($class = '')
{
    echo '<div class="' . esc_attr($class) . '">';
}

/**
 * Close Container
 */

function close_container()
{
    echo '</div>';
}
