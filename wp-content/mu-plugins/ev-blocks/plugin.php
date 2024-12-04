<?php
/**
 * Plugin Name:       Ev Blocks
 * Description:       Some custom gutenberg blocks.
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Massimo Bovi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ev-blocks
 *
 * @package           evidenzio
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function evidenzio_team_members_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'evidenzio_team_members_block_init' );

function filter_block_categories_when_post_provided( $block_categories, $editor_context ) {

    $newCategories = [
        array(
            'slug'  => 'evblocks',
            'title' => __( 'Pb Blocks', 'custom-plugin' ),
            'icon'  => null,
        ),
        array(
            'slug'  => 'evblocks_single',
            'title' => __( 'Ev Blocks Singoli', 'custom-plugin' ),
            'icon'  => null,
        )
    ];


    if ( ! empty( $editor_context->post ) ) {
        $merge = array_merge(
            $newCategories,
            $block_categories
        );
    }
    return $merge;
}
add_filter( 'block_categories_all', 'filter_block_categories_when_post_provided', 10, 2 );
