<?php

/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::context();
$posts = Timber::get_posts();
$context['posts'] = $posts;

$context = StarterSite::passVariables($context);

$templates = array('index.twig');
if (is_home()) {
	array_unshift($templates, 'home.twig');

	//	$page_for_posts = get_option('page_for_posts');
	//	$context['sidebar'] = Timber::get_widgets('sidebar_blog');
	//	$context['title'] = get_the_title($page_for_posts);
	//	$context['content'] = get_post_field('post_content', $page_for_posts);

	$categorie = get_terms(array(
		'taxonomy' => 'category',
	));
	$context['categorie_blog'] = $categorie;

	// Get blocks from page News
	$post_id = get_option( 'page_for_posts' );
	$post_content = get_post( $post_id  )->post_content;
	$blocks = parse_blocks( $post_content );

	$hero_block = render_block($blocks[0]);
	$context['hero_block'] = $hero_block;

	$breadcrumb_block = render_block($blocks[2]);
	$context['breadcrumb_block'] = $breadcrumb_block;

	$form_block = render_block($blocks[4]);
	$context['form_block'] = $form_block;

	// News archive url
	$context['news_archive_url'] = get_post_type_archive_link('post');

	// Get categories
	$blog_categories = get_categories();
	if($blog_categories) {
		foreach($blog_categories as $blog_cat) {
			$blog_cat->link = get_term_link($blog_cat->term_id);
		}
	}
	$context['blog_categories'] = $blog_categories;

}
Timber::render($templates, $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false);
