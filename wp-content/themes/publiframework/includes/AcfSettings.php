<?php

class AcfSettings
{
    public function __construct()
    {
        // Google API Key
        add_action('acf/init', array($this, 'acf_init_google_api_key'));

        // Image Dimentions
        add_filter('acf/load_field/name=dimensione_immagine', array($this, 'acf_load_dimensione_immagine'));

        // Post Types
        add_filter('acf/load_field/name=cpt', array($this, 'acf_load_post_types'));
        
        // Contact Forms
        add_filter('acf/load_field/name=form_cf7', array($this, 'acf_load_form_cf7'));
        add_filter('acf/load_field/name=form_cf7_form_prodotti', array($this, 'acf_load_form_cf7'));
        add_filter('acf/load_field/name=form_cf7_newsletter', array($this, 'acf_load_form_cf7'));
        add_filter('acf/load_field/name=form_cf7_api', array($this, 'acf_load_form_cf7'));

        // add_filter('acf/settings/url', array( $this, 'my_acf_settings_url'));
        // add_filter('acf/settings/show_admin', array( $this, 'my_acf_settings_show_admin'));

        // ??? - Dove sono le funzioni?
        // add_action('manage_videocorsi_posts_custom_column', array($this, 'videocorsi_custom_column'), 10, 2);
        // add_filter('manage_edit-videocorsi_sortable_columns', array( $this, 'my_column_register_sortable' ));
    }

    /**
     * Set Google API Key for ACF
     */

    function acf_init_google_api_key()
    {
        if (get_option('_google_api_key')) {
            acf_update_setting('google_api_key', get_option('_google_api_key'));
        }
    }

    /**
     * Load Image Dimention Set By ACF
     * 
     * @param array $field
     */

    public function acf_load_dimensione_immagine($field)
    {
        $field['choices'] = array();
        $imageSizes = get_intermediate_image_sizes();
        $field['choices']['full'] = 'full';
        foreach ($imageSizes as $choice) {
            $field['choices'][$choice] = $choice;
        }
        return $field;
    }

    /**
     * Load Post Types Set By ACF
     * 
     * @param array $field
     */

    function acf_load_post_types($field)
    {
        $field['choices'] = array();
        $postTypes = get_post_types();
        unset($postTypes['attachment']);
        unset($postTypes['revision']);
        unset($postTypes['nav_menu_item']);
        unset($postTypes['custom_css']);
        unset($postTypes['customize_changeset']);
        unset($postTypes['oembed_cache']);
        unset($postTypes['user_request']);
        unset($postTypes['wp_block']);
        unset($postTypes['acf-field-group']);
        unset($postTypes['acf-field']);
        unset($postTypes['product_variation']);
        unset($postTypes['shop_order']);
        unset($postTypes['shop_order_refund']);
        unset($postTypes['wpcf7_contact_form']);
        unset($postTypes['flamingo_contact']);
        unset($postTypes['flamingo_inbound']);
        unset($postTypes['flamingo_outbound']);
        unset($postTypes['wp_template']);
        unset($postTypes['wp_template_part']);
        unset($postTypes['wp_global_styles']);
        unset($postTypes['wp_navigation']);

        foreach ($postTypes as $choice) {
            $field['choices'][$choice] = $choice;
        }

        return $field;
    }

    /**
     * Load Contact Form Set By ACF
     * 
     * @param array $field
     */

    function acf_load_form_cf7($field)
    {
        $field['choices'] = array();
        $args = array(
            'numberposts'   => -1,
            'post_type'     => 'wpcf7_contact_form',
            'orderby'       => 'title',
            'order'         => 'ASC',
        );
        $myposts = get_posts($args);
        foreach ($myposts as $choice) {
            $field['choices'][$choice->ID] = $choice->post_title;
        }
        return $field;
    }

    // /**
    //  * Set ACF URL
    //  * 
    //  * @param url $url
    //  */

    // function my_acf_settings_url($url)
    // {
    //     return MY_ACF_URL;
    // }

    // /**
    //  * Hide the ACF admin menu item
    //  * 
    //  * @param bool $show_admin
    //  */

    // function my_acf_settings_show_admin($show_admin)
    // {
    //     return false;
    // }
}
