<?php

class AssetsRegister
{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'wp_jquery_manager_plugin_front_end_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'scripts_frontend'));
        add_action('admin_enqueue_scripts', array($this, 'scripts_admin'));
        add_action('login_enqueue_scripts', array($this, 'scripts_login'));
        add_action('enqueue_block_editor_assets', array($this, 'gutenberg_customs'));
    }

    /**
     * Register JQuery
     */

    public function wp_jquery_manager_plugin_front_end_scripts()
    {
        $wp_admin = is_admin();
        $wp_customizer = is_customize_preview();

        if ($wp_admin || $wp_customizer) {
            return;
        } else {

            // Deregister jQuery Scripts
            wp_deregister_script('jquery');
            wp_deregister_script('jquery-core');
            wp_deregister_script('jquery-migrate');

            // Register jQuery Core
            wp_register_script('jquery-core', get_template_directory_uri() . '/assets/src/jquery-3.6.0.min.js', array(), null, true);

            // Register jQuery using jquery-core as a dependency, so other scripts could use the jquery handle
            wp_register_script('jquery', false, array('jquery-core'), null, true);
            wp_enqueue_script('jquery');
        }
    }

    /**
     * Register Frontend CSS and JS
     */

    public function scripts_frontend()
    {

        // Deregister default scripts
        wp_deregister_script('comment-reply');
        wp_deregister_script('wp-embed');

        // Include CSS
        $cssFilePath = glob(get_template_directory() . '/assets/dist/css/main.css');
        $cssFileURI = get_template_directory_uri() . '/assets/dist/css/' . basename($cssFilePath[0]);
        wp_enqueue_style('site_main_css', $cssFileURI, array(), null);

        // Include JS
        $jsFilePath = glob(get_template_directory() . '/assets/dist/js/main.js');
        $jsFileURI = get_template_directory_uri() . '/assets/dist/js/' . basename($jsFilePath[0]);
        wp_enqueue_script('site_main_js', $jsFileURI, array('jquery'), null, true);

        // Ajax
        wp_localize_script('site_main_js', 'ajax_auth_object', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'loadingmessage' => __('Invio dati in corso, attendi...'),
            'baseurl' => get_template_directory_uri(),
            'apply_coupon_nonce' => wp_create_nonce("apply-coupon"),
            'languagecode' => defined('ICL_LANGUAGE_CODE') ? ICL_LANGUAGE_CODE : null
        ));
    }

    /**
     * Register Admin CSS
     */

    public function scripts_admin()
    {
        wp_enqueue_style('admin-css', get_template_directory_uri() . '/assets/dist/css/style_admin.css', array(), PUBLIFARM_CURRENT_VERSION);
    }

    /**
     * Register Login CSS
     */

    public function scripts_login()
    {
        wp_enqueue_style('login-css', get_template_directory_uri() . '/assets/dist/css/style_login.css', array(), PUBLIFARM_CURRENT_VERSION);
    }

    /**
     * Register Gutenberg CSS and JS
     */

    public function gutenberg_customs()
    {
        wp_enqueue_style('ff-editor-css', get_stylesheet_directory_uri() . '/assets/dist/css/style_buttons.css', array(), microtime());
        wp_enqueue_script('ff-editor-js', get_template_directory_uri() . '/assets/dist/js/editor.js', array(), microtime(), true);
    }
}
