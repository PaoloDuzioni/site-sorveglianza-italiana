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
} elseif ( is_year() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'Y' );
} elseif ( is_tag() ) {
	$context['title'] = single_tag_title( '', false );
} elseif ( is_category() ) {
	$category = get_category( get_query_var( 'cat' ) );
	$cat_id = $category->cat_ID;

	$context['title'] = single_cat_title( '', false );
	$context['content'] = category_description( $cat_id );
	$context['sidebar'] = Timber::get_widgets( 'sidebar_blog' );
	$context['descrizione_aggiuntiva'] = get_field('descrizione_aggiuntiva', 'category_'.$cat_id );

	$blog_categories = get_categories();
	if($blog_categories) {
		foreach($blog_categories as $blog_cat) {
			$blog_cat->link = get_term_link($blog_cat->term_id);
		}
	}
	$context['blog_categories'] = $blog_categories;

	array_unshift( $templates, 'category.twig' );
} elseif ( is_post_type_archive() ) {

	if(get_post_type()=='events') {
		
		$context['next_events'] = next_events(4);

		$today = date('Ymd');
		$archivio_eventi_args = [
			'post_type' => 'events',
			'posts_per_page' => -1,
			'meta_query' => array(
				array(
					'key'     => 'data_fine',
					'compare' => '<=',
					'value'   => $today,
				)
			)
		];
		$archivio_eventi = Timber::get_posts($archivio_eventi_args);
		$context['archivio_eventi'] = $archivio_eventi;

	}

	$context['title'] = post_type_archive_title( '', false );
	array_unshift( $templates, 'archive-' . get_post_type() . '.twig' );
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
