<?php
/**
 * The Template for the sidebar containing the main widget area
 *
 * @package  WordPress
 * @subpackage  Timber
 */

Timber::render( array( 'sidebar.twig' ), $data, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false );
