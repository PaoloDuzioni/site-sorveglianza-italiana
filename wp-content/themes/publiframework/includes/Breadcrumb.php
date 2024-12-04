<?php

/**
 * Generate a breadcrumb trail.
 *
 * @global WP_Post $post 
 * 
 * @return string|null 
 */

function pubfa_breadcrumb()
{
    if (is_front_page() || is_404()) return;

    global $post;
    $breadcrumb = [];
    $breadcrumb[] = get_breadcrumb_item(__('Home', THEME_SLUG), 1, home_url());

    if (is_single() || is_post_type_archive()) {
        $post_type = get_post_type();
        $archive_position =  2;

        if ($post_type == 'post') {
            $archive_label = __('News', THEME_SLUG);
        }

        if ($post_type === 'casehistory') {
            $archive_label = __('Case History', THEME_SLUG);
        }

        if ($post_type === 'eventi') {
            $archive_label = __('Eventi', THEME_SLUG);
            $archive_position = 3;
        }

        if (is_single()) {
            $breadcrumb[] = get_breadcrumb_item($archive_label, $archive_position, get_post_type_archive_link($post_type));
            $breadcrumb[] = get_breadcrumb_item(get_the_title($post), $archive_position + 1);
        } else {
            $breadcrumb[] = get_breadcrumb_item($archive_label, 2);
        }
    } elseif (is_home()) {
        $breadcrumb[] = get_breadcrumb_item(get_the_title(get_option('page_for_posts')), 2);
    } elseif (is_category()) {
        $breadcrumb[] = get_breadcrumb_item(get_the_title(get_option('page_for_posts')), 2, get_the_permalink(get_option('page_for_posts')));
        $breadcrumb[] = get_breadcrumb_item(single_cat_title('', false), 3);
    } elseif (is_page()) {
        $ancestors = array_reverse(get_post_ancestors($post->ID));
        foreach ($ancestors as $i => $ancestor) {
            $breadcrumb[] = get_breadcrumb_item(get_the_title($ancestor), $i + 2, get_permalink($ancestor));
        }
        $breadcrumb[] = get_breadcrumb_item(get_the_title($post), count($ancestors) + 2);
    }

    return '<nav style="--bs-breadcrumb-divider: \'|\';" aria-label="breadcrumb"><ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">' . implode('', $breadcrumb) . '</ol></nav>';
}

/**
 * Generate a single breadcrumb item.
 *
 * @param string  $label    
 * @param int     $position 
 * @param string|null $url 
 * 
 * @return string 
 */

function get_breadcrumb_item($label, $position, $url = null)
{
    $is_active = !$url;
    return '<li class="breadcrumb-item breadcrumb__item' . ($is_active ? ' active" aria-current="page"' : '"') .
        ' itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">' .
        ($is_active ? '' : '<a href="' . esc_url($url) . '" itemprop="item" class="breadcrumb__link">') .
        '<span itemprop="name" class="breadcrumb__label">' . esc_html($label) . '</span>' .
        ($is_active ? '' : '</a>') .
        '<meta itemprop="position" content="' . intval($position) . '" /></li>';
}
 