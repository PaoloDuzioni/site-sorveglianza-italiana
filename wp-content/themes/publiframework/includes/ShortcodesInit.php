<?php

class ShortcodesInit
{

    public function __construct()
    {

        add_shortcode('iconesocial', array($this, 'iconesocial'));
        add_shortcode('year', array($this, 'year_shortcode'));
        add_shortcode('privacy_page', array($this, 'privacy_page'));
        add_shortcode('cookie_page', array($this, 'cookie_page'));
    }

    /**
     * Shortcode Icone Social
     * 
     * @param {*} $atts
     * @param {*} $content
     */

    public function iconesocial($atts, $content = null)
    {
        $arrayIcone = carbon_get_theme_option('icone');
        if ($arrayIcone && carbon_get_theme_option('attiva_social') == 'yes') {
            $html = '<ul class="list-inline social-icons">';
            foreach ($arrayIcone as $icona) {
                $html .= '<li class="list-inline-item"><a class="icona-social" href="' . $icona['link'] . '" target="_blank" rel="nofollow">';
                $html .= '<i class="' . $icona['social'] . '"></i>';
                $html .= '</a></li>';
            }
            $html .= '</ul>';
            return $html;
        }
    }

    /**
     * Shortcode Current Year
     * 
     * @param {*} $atts
     * @param {*} $content
     */
    public function year_shortcode($atts, $content = null)
    {
        return date("Y");
    }

    /**
     * Shortcode Privacy Page Link
     * 
     * @param {*} $atts
     * @param {*} $content
     */

    public function privacy_page($atts, $content = null)
    {
        if (carbon_get_theme_option('pagina_privacy')) {
            $pagina_privacy = carbon_get_theme_option('pagina_privacy')[0]['id'];
            return get_the_permalink(apply_filters('wpml_object_id', $pagina_privacy, 'page'));
        }
    }

    /**
     * Shortcode Cookie Page Link
     * 
     * @param {*} $atts
     * @param {*} $content
     */

    public function cookie_page($atts, $content = null)
    {
        if (carbon_get_theme_option('pagina_cookie')) {
            $pagina_privacy = carbon_get_theme_option('pagina_cookie')[0]['id'];
            return get_the_permalink(apply_filters('wpml_object_id', $pagina_privacy, 'page'));
        }
    }
}
