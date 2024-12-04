<?php

class ImageSizes
{

    public function __construct()
    {
        // Remove default
        remove_image_size('woocommerce_thumbnail');
        remove_image_size('woocommerce_single');
        remove_image_size('woocommerce_gallery_thumbnail');
        remove_image_size('shop_catalog');
        remove_image_size('shop_single');
        remove_image_size('shop_thumbnail');

        // Add custom
        add_image_size('prodotti', 800, 800, true);
        add_image_size('prodotti_big', 1600, 1600, true);
    }
}
