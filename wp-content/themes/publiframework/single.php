<?php

/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
$context = StarterSite::passVariables($context);


if (is_singular('post')) {
	$post_cats = wp_get_post_categories(get_the_ID());
	$cats1 = [];
	foreach ($post_cats as $c) {
		$cat = get_category($c);
		$cats1[] = array('name' => $cat->name, 'link' => get_category_link($cat->ID), 'icona' => get_field('icona', 'term_' . $c), 'colore' => get_field('colore', 'term_' . $c));
	}

	$latest_posts_args = [
		'post_type' => 'post',
		'posts_per_page' => 3,
		'category__in' => $post_cats
	];
	$latest_posts = Timber::get_posts($latest_posts_args);
	foreach ($latest_posts as $late) {
		$post_categories = wp_get_post_categories($late->ID);
		if ($post_categories) {
			$cats = [];
			foreach ($post_categories as $cat) {
				$categoria = get_term($cat);
				$cats[] = [
					'nome' => $categoria->name,
					'link' => get_term_link($categoria->term_id)
				];
			}
			$late->post_categories = $cats;
		}
		$late->riassunto = strip_tags(get_the_excerpt($late->ID));
	}
	$context['latest_posts'] = $latest_posts;
	$context['post_cats'] = $cats1;
}


Timber::render(array('single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig'), $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false);
