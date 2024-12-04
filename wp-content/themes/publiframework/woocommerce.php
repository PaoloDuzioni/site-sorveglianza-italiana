<?php

if (!class_exists('Timber')) {
    echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
    return;
}

$context = Timber::context();
$context['sidebar'] = Timber::get_widgets('sidebar_shop');
$context = StarterSite::passVariables($context);

if (is_singular('product')) {

    $context['post'] = Timber::get_post();
    $product = wc_get_product($context['post']->ID);
    $context['product_gallery'] = $product->get_gallery_image_ids();
    $context['product'] = $product;

    // Get related products
    $related_limit = 3;
    $related_ids = wc_get_related_products($context['post']->ID, $related_limit);
    $context['related_products'] =  Timber::get_posts($related_ids);

    $linea = get_the_terms($context['post']->ID, 'product_cat');
    $link_linea = get_term_link($linea[0]->term_id, 'product_cat');
    $linea[0]->link_linea = $link_linea;
    $thumbnail_id_linea = get_term_meta($linea[0]->term_id, 'thumbnail_id', true);
    $linea[0]->img_linea = wp_get_attachment_image($thumbnail_id_linea, 'full');
    $context['linea'] = $linea[0];

    foreach ($context['related_products'] as $rel) {
        $linee = get_the_terms($rel->ID, 'product_cat');
        $rel->linee = $linee;
    }

    // if ($product->is_type('variable')) {
    //     $variations = $product->get_available_variations();
    //     echo '<pre>'; print_r($variations); echo '</pre>'; die();
    // }

    // Restore the context and loop back to the main query loop.
    wp_reset_postdata();

    Timber::render('woocommerce/single-product.twig', $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false);
} else {

    $posts = Timber::get_posts();
    $context['products'] = $posts;
    $term = get_queried_object();
    $term_id = $term->term_id;

    if (is_product_category()) {
        $context['category'] = get_term($term_id, 'product_cat');
        $context['title'] = single_term_title('', false);

        $thumbnail_id_linea = get_term_meta($term_id, 'thumbnail_id', true);
        $img_linea = wp_get_attachment_image($thumbnail_id_linea, 'full');
    } elseif (is_tax()) {
        $context['title'] = $term->name;

        $thumbnail_id_linea = get_field('immagine_copertina', 'term_' . $term_id);
        $img_linea = ($thumbnail_id_linea) ? wp_get_attachment_image($thumbnail_id_linea['ID'], 'full') : null;
    }

    $context['img_linea'] = $img_linea;
    $context['esigenze'] = esigenze();

    Timber::render('woocommerce/archive.twig', $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false);
}
