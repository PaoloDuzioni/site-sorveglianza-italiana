<?php
/**
 * The template for displaying Author Archive pages
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

global $wp_query;

$context          = Timber::context();
$context['posts'] = Timber::get_posts();
if ( isset( $wp_query->query_vars['author'] ) ) {
	$author            = Timber::get_user( $wp_query->query_vars['author'] );
	$context['author'] = $author;
	$context['title']  = 'Author Archives: ' . $author->name();
}
$context = StarterSite::passVariables($context);
Timber::render( array( 'author.twig', 'archive.twig' ), $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false );
