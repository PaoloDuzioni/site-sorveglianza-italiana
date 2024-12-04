<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();
$context = StarterSite::passVariables($context);

$timber_post     = Timber::get_post( apply_filters( 'wpml_object_id', carbon_get_theme_option('pagina_404')[0]['id'], 'page' ));
$context['post'] = $timber_post;
Timber::render( '404.twig', $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false );