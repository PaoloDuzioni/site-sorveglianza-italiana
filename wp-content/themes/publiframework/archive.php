<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array( 'archive.twig', 'index.twig' );

$context = Timber::context();

$context['title'] = 'Archive';
if ( is_day() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'D M Y' );
} elseif ( is_month() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'M Y' );
}
elseif ( is_year() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'Y' );
}
elseif ( is_tag() ) {
	$context['title'] = single_tag_title( '', false );
}
elseif ( is_category() ) {
	$blog_categories = get_categories();
	if($blog_categories) {
		foreach($blog_categories as $blog_cat) {
			$blog_cat->link = get_term_link($blog_cat->term_id);
		}
	}
	$context['blog_categories'] = $blog_categories;

	// News archive url
	$context['news_archive_url'] = get_post_type_archive_link('post');

	$context['active_taxonomy_id'] = get_queried_object_id();

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

	array_unshift( $templates, 'home.twig' );
}
elseif ( is_post_type_archive('servizi') ) {
	// From sidebar filters
	$context['query_sectors'] = $_POST['taxonomies_sectors'] ?? '';
	$context['query_services'] = $_POST['taxonomies_services'] ?? '';

	// From services category boxes on external pages
	$link_service = $_GET['service'] ? array($_GET['service']) : [];
	if(!empty($link_service) && empty($context['query_services'])) {
		$context['query_services'] = $link_service;
	}

	$context['taxonomies_sectors'] = Timber::get_terms([
		'taxonomy' => 'categoria_settori',
		'hide_empty' => false,
		'orderby' => 'term_order',
		'order' => 'ASC'
	]);

	$context['taxonomies_services'] = Timber::get_terms([
		'taxonomy' => 'categoria_servizi',
		'hide_empty' => false,
		'orderby' => 'term_order',
		'order' => 'ASC'
	]);

	// Get blocks from page Servizi
	$post_content = get_post( 320 )->post_content;
	$blocks = parse_blocks( $post_content );

	$hero_block = render_block($blocks[0]);
	$context['hero_block'] = $hero_block;

	$breadcrumb_block = render_block($blocks[2]);
	$context['breadcrumb_block'] = $breadcrumb_block;

	$news_block = render_block($blocks[4]);
	$context['news_block'] = $news_block;

	$form_block = render_block($blocks[6]);
	$context['form_block'] = $form_block;

	$context['title'] = post_type_archive_title( '', false );
	$templates = array( 'archive-servizi.twig', 'index.twig' );
}


$posts = Timber::get_posts();

if ( is_category() ) {
	foreach($posts as $post) {
		$post_categories = wp_get_post_categories($post->ID);
		if($post_categories) {
			$cats = [];
			foreach($post_categories as $cat) {
				$categoria = get_term($cat);
				$cats[] = [
					'nome' => $categoria->name,
					'link' => get_term_link($categoria->term_id)
				];
			}
			$post->post_categories = $cats;
		}
	}


	$latest_posts_args = [
		'post_type' => 'post',
		'posts_per_page' => 1
	];
	$latest_posts = Timber::get_posts($latest_posts_args);
	foreach($latest_posts as $late) {
		$post_categories = wp_get_post_categories($late->ID);
		if($post_categories) {
			$cats = [];
			foreach($post_categories as $cat) {
				$categoria = get_term($cat);
				$cats[] = [
					'nome' => $categoria->name,
					'link' => get_term_link($categoria->term_id)
				];
			}
			$late->post_categories = $cats;
		}
	}
	$context['latest_posts'] = $latest_posts;


}

$context['posts'] = $posts;


$context = StarterSite::passVariables($context);
Timber::render( $templates, $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false );
