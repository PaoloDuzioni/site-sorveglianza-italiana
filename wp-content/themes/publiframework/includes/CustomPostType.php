<?php

class CustomPostType
{

	public function __construct()
	{
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
	}

	/**
	 * Register Post Types
	 */

	public function register_post_types()
	{
		// Register Servizi Post Type
		register_post_type(
			'servizi',
			array(
				'labels'			=> array(
					'name' 			=> __('Servizi'),
					'singular_name' => __('Servizi')
				),
				'public' 			=> true,
				'show_ui' 			=> true,
				'has_archive'		=> true,
				'menu_position' 	=> 10,
				'hierarchical' 		=> false,
				'show_in_rest' 		=> true,
				'show_in_nav_menus ' => true,
				'menu_icon' 		=> 'dashicons-editor-ul',
				'supports' 			=> array(
					'title',
					'editor',
					'thumbnail',
					'excerpt',
					'revisions'
				)
			)
		);

		// Register Sistema Post Type
//		register_post_type(
//			'sistema',
//			array(
//				'labels'			=> array(
//					'name' 			=> __('Pagine di sistema'),
//					'singular_name' => __('Pagina di sistema')
//				),
//				'show_ui' 			=> true,
//				'has_archive'		=> false,
//				'menu_position' 	=> 3,
//				'hierarchical' 		=> false,
//				'show_in_rest' 		=> true,
//				'menu_icon' 		=> 'dashicons-admin-tools',
//				'supports' 			=> array(
//					'title',
//					'editor',
//					'thumbnail'
//				)
//			)
//		);



		// Register Eventi Post Type
		if (carbon_get_theme_option('attiva_cpt_eventi')) {
			register_post_type(
				'eventi',
				array(
					'labels' => array(
						'name' 			=> __('Eventi'),
						'singular_name' => __('Evento')
					),
					'public' 			=> true,
					'has_archive' 		=> false,
					'menu_position' 	=> 4,
					'hierarchical' 		=> true,
					'show_in_rest'		=> true,
					'menu_icon' 		=> 'dashicons-feedback',
					'taxonomies'		=> array('tipo_evento'),
					'supports' 			=> array(
						'title',
						'editor',
						'thumbnail',
						'excerpt',
						'revisions'
					),
				)
			);
		}

		// Register Case History Post Type
		if (carbon_get_theme_option('attiva_cpt_case_history')) {
			register_post_type(
				'casehistory',
				array(
					'labels' => array(
						'name' 			=> __('Case History'),
						'singular_name' => __('Case History')
					),
					'public' 			=> true,
					'has_archive' 		=> false,
					'menu_position' 	=> 5,
					'hierarchical' 		=> true,
					'show_in_rest' 		=> true,
					'menu_icon' 		=> 'dashicons-feedback',
					'taxonomies'		=> array('tipo_casehistory'),
					'supports' 			=> array(
						'title',
						'editor',
						'thumbnail',
						'excerpt',
						'revisions'
					),
				)
			);
		}

		// Register Landing Post Type
		if (carbon_get_theme_option('attiva_cpt_landing')) {
			register_post_type(
				'landing',
				array(
					'labels' => array(
						'name' 			=> __('Landing'),
						'singular_name' => __('Landing')
					),
					'public' 			=> true,
					'has_archive' 		=> false,
					'menu_position' 	=> 6,
					'hierarchical' 		=> true,
					'show_in_rest' 		=> true,
					'menu_icon' 		=> 'dashicons-feedback',
					'supports' 			=> array(
						'title',
						'editor',
						'thumbnail',
						'excerpt',
						'revisions'
					)
				)
			);
		}
	}

	/**
	 * Register Taxonomies
	 */

	public function register_taxonomies()
	{
		// Register Categoria Servizi Taxonomy
		register_taxonomy(
			'categoria_servizi',
			'servizi',
			array(
				'label' 				=> __('Categoria Servizi'),
				'hierarchical' 			=> true,
				'show_ui'       		=> true,
				'query_var' 			=> true,
				'show_in_rest' 			=> true,
				'sort' 					=> true,
				'show_admin_column' 	=> true,
				// 'publicly_queryable'	=> false,
				'args' 					=> array(
					'orderby' 	=> 'term_order',
					'order' 	=> 'DESC'
				),
			)
		);

		// Register Categoria Settori Taxonomy
		register_taxonomy(
			'categoria_settori',
			'servizi',
			array(
				'label' 				=> __('Categoria Settori'),
				'hierarchical' 			=> true,
				'show_ui'       		=> true,
				'query_var' 			=> true,
				'show_in_rest' 			=> true,
				'sort' 					=> true,
				'show_admin_column' 	=> true,
				// 'publicly_queryable'	=> false,
				'args' 					=> array(
					'orderby' 	=> 'term_order',
					'order' 	=> 'DESC'
				),
			)
		);

		// Register Tipo Case History Taxonomy
//		if (carbon_get_theme_option('attiva_cpt_case_history')) {
//			register_taxonomy(
//				'tipo_casehistory',
//				'casehistory',
//				array(
//					'label'					=> __('Tipo case history'),
//					'hierarchical'			=> true,
//					'show_ui'           	=> true,
//					'query_var'				=> true,
//					'show_in_rest'			=> true,
//					'sort'					=> true,
//					'show_admin_column'		=> true,
//					//'publicly_queryable'	=> false,
//					'args'					=> array(
//						'orderby' => 'term_order',
//						'order' => 'DESC'
//					),
//				)
//			);
//		}
	}
}
