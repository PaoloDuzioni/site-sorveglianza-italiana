<?php 

class BlocchiCustom {


	public function __construct() {

		add_filter( 'block_categories_all', array( $this, 'my_blocks_plugin_block_categories'), 10, 2 );
		add_action('acf/init', array( $this, 'iw_acf_init'));


	}


	function acf_blocchi_callback( $block, $content = '', $is_preview = false ) {

		//$context = Timber::context();
		$context['block'] = $block;
		$context['fields'] = get_fields();
		$context['is_preview'] = $is_preview;
		$slug = str_replace('acf/', '', $block['name']);
		$timber_post     = Timber::get_post();
		$context['post'] = $timber_post;
	

		if($slug=='elenco-pagine') $context['elementi'] = $this->makeElementi();

		if($slug=='form-cf7') {
			$context['pdf_allegato'] = get_field('pdf_allegato');
		}

		$str=rand();
		$context['custom_block_id'] = md5($str);
		
		if($slug=='gmaps') {
			$context['immagine_marker'] = carbon_get_theme_option('immagine_marker');
			$context['google_api_key'] = carbon_get_theme_option('google_api_key');
		}

		if($slug=='news-section') {
			$args = array(
				'post_type' => 'post',
				'posts_per_page' => get_field('numero_posts_news_section')
			);

			if(is_singular('post')) {
				$args['post__not_in'] = array(get_the_ID());
			}

			$posts = Timber::get_posts( new WP_Query($args));
			$context['posts'] = $posts;
			$context['news_url'] = get_post_type_archive_link( 'post' );
		}

		if($slug=='boxes-services-categories') {
			$context['servizi_url'] = get_post_type_archive_link( 'servizi' );

			// Add taxonomy acf fields
			$terms = get_field('servizi_correlati_block_cat_servizi');
			foreach($terms as $key => $tax) {
				$tax->fields = get_fields('categoria_servizi_'.$tax->term_id);
			}
		}

		if($slug=='boxes-services-related') {
			$context['servizi_url'] = get_post_type_archive_link( 'servizi' );

			// get taxonomy of the current post
			$terms = get_the_terms(get_the_ID(), 'categoria_servizi');
			$post_taxonomy = $terms[0]->term_id;

			$context['posts'] = Timber::get_posts( new WP_Query( [
				'post_type' => 'servizi',
				'posts_per_page' => 4,
				'post__not_in' => array(get_the_ID()),
				'tax_query' => array(
					array(
						'taxonomy' => 'categoria_servizi',
						'field' => 'term_id',
						'terms' => $post_taxonomy
					)
				)
			]) );
		}

		Timber::render( '/blocks/blocks/'.$slug.'.twig', $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false );
	}


	private function makeElementi() {

		$elementi = get_field('elementi');
		$cpt = get_field('cpt');
		$limite_massimo_elementi_visualizzati = get_field('limite_massimo_elementi_visualizzati');
		if($limite_massimo_elementi_visualizzati) $ppp = $limite_massimo_elementi_visualizzati; else $ppp = -1;
		$pageid = get_the_ID();

		if($cpt=='page') {
			$selezione_manuale = get_field('pagine');
		} elseif ($cpt=='webinar') {
			$selezione_manuale = get_field('pagine_webinar');
		} elseif ($cpt=='eventi') {
			$selezione_manuale = get_field('selezione_manuale_eventi');
		} elseif ($cpt=='post') {
			$selezione_manuale = get_field('selezione_manuale_news');
		} elseif ($cpt=='videocorsi') {
			$selezione_manuale = get_field('selezione_manuale_corso');
		} elseif ($cpt=='consulenze') {
			$selezione_manuale = get_field('selezione_manuale_consulenza');
		} elseif ($cpt=='casehistory') {
			$selezione_manuale = get_field('selezione_manuale_case_history');
		}
		
		if($elementi=='subpages') {
			$args = array(
				'post_type'              => $cpt,
				'posts_per_page'         => $ppp,
				'post_parent'            => $pageid,
				'order'          => 'ASC',
				'orderby'        => 'menu_order'
			);
		} elseif($elementi=='subpages_id') {

			$args = array(
				'post_type'              => $cpt,
				'posts_per_page'         => $ppp,
				'post_parent'            => get_field('pagina_madre'),
				'order'          => 'ASC',
				'orderby'        => 'menu_order',
				'post__not_in' => [$pageid]
			);
			$titolo_madre = get_the_title(get_field('pagina_madre'));
		} elseif($elementi=='manuale') {
			$args = array(
				'post_type'              => $cpt,
				'posts_per_page'         => -1,
				'post__in'		=> $selezione_manuale,
				'orderby' => 'post__in'
			);
		} elseif($elementi=='latest') {
			
			
			if($cpt=='eventi') {
				$today = date('Ymd');
				$args = array(
					'post_type'              => get_field('cpt'),
					'posts_per_page'         => $ppp,
					'meta_key'  => 'data',
					'orderby'   => 'meta_value_num'
				);
				$tipo_eventi = get_field('tipo_eventi');
				if($tipo_eventi=='evidenza') {
					$args['meta_query'] = array(
						array(
							'key'   => 'evidenza',
							'value' => '1',
						)
					);
					$args['order'] = 'ASC';
				} elseif($tipo_eventi=='prossimi') {
					$args['meta_query'] = array(
						array(
							'key'     => 'data',
							'compare' => '>=',
							'value'   => $today,
						)
					);
					$args['order'] = 'ASC';
				} elseif($tipo_eventi=='passati') {
					$args['meta_query'] = array(
						array(
							'key'     => 'data',
							'compare' => '<',
							'value'   => $today,
						)
					);
					$args['order'] = 'DESC';
				}
			} elseif($cpt=='videocorsi') {
				$args = array(
					'post_type'              => $cpt,
					'posts_per_page'         => $ppp,
				);

				$args['meta_query'] = array(
					array(
						'key'   => 'tipologia',
						'value' => get_field('tipo_corsi')
					)
				);

			} elseif($cpt=='post') {
				$args = array(
					'post_type'              => $cpt,
					'posts_per_page'         => $ppp,
					'cat' => 1
				);
			} else {
				$args = array(
					'post_type'              => $cpt,
					'posts_per_page'         => $ppp,
				);
			}
		}

		
		$posts = Timber::get_posts( $args );

		foreach($posts as $p) {
			$p->post_content = null;
			$p->riassunto = strip_tags(get_the_excerpt($p->ID));
		}

		//echo '<pre>'; print_r($args); echo '</pre>'; 
		//echo '<pre>'; print_r($posts); echo '</pre>'; die();

		if($cpt=='consulenze') {
			foreach($posts as $post) {
				$post_terms = wp_get_post_terms( $post->ID, 'tipo_consulenza' );
				foreach($post_terms as $pt) {
					$pt->colore = get_field('colore', 'term_'.$pt->term_id);
				}
				$post->taxs = $post_terms;

			}
		} 
		if($cpt=='webinar' || $cpt=='videocorsi') {
			foreach($posts as $post) {
				$post_terms = wp_get_post_terms( $post->ID, 'tipo_corso' );
				$post->taxs = $post_terms;
			}
		} 
		if($cpt=='page' && $elementi=='subpages_id') {
			foreach($posts as $post) {
				$post->titolo_madre = $titolo_madre;
			}
		}
		if($cpt=='casehistory') {
			foreach($posts as $post) {
				$post_terms = wp_get_post_terms( $post->ID, 'tipo_casehistory' );
				$post->taxs = $post_terms;
			}
		} 
		if($cpt=='videocorsi' || $cpt=='webinar') {
			foreach($posts as $post) {
				$post->durata_h = date('G', strtotime( get_field('durata', $post->ID).' +2 hours' ));
			}
		} 
		if($cpt=='eventi') {
			foreach($posts as $post) {
				$post->data_evento = date('d/m/Y', strtotime(get_field('data', $post->ID).' +1 day'));
			}
		} 

		//echo '<pre>'; print_r($posts); echo '</pre>';die();
		return $posts;

	}


	/**
	 * Custom block category
	 */

	function my_blocks_plugin_block_categories( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'publifarm',
					'title' => 'Pf Fasce',
					'icon'  => 'wordpress',
				),
				array(
					'slug' => 'publifarm_singoli',
					'title' => 'Pf Elementi singoli',
					'icon'  => 'wordpress',
				),
			)
		);
	}

	/**
	 * Register ACF Custom blocks
	 */
	function iw_acf_init() {
		if( function_exists('acf_register_block') ) {
			acf_register_block_type(array(
				'name'				=> 'slider-video',
				'title'				=> 'Pb Slider video',
				'description'		=> 'Slides di testo con sfondo video',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'slider-fullwidth',
				'title'				=> 'Pb Slider Fullwidth',
				'description'		=> 'Slides di testo con immagine fullwidth',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'news-section',
				'title'				=> 'Pb Sezione News',
				'description'		=> 'Sezione news',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'box-contatti',
				'title'				=> 'Pb Box Contatti',
				'description'		=> 'Box con informazioni di contatto',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'carousel',
				'title'				=> 'Pb Carousel',
				'description'		=> 'Carousel di immagini',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'google-maps-iframe',
				'title'				=> 'Pb Google Maps',
				'description'		=> 'Iframe Google Maps',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'boxes-services-categories',
				'title'				=> 'Pb Boxes Categorie Servizi',
				'description'		=> 'Boxes delle categorie servizi',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));

			acf_register_block_type(array(
				'name'				=> 'boxes-services-related',
				'title'				=> 'Pb Boxes Servizi Correlati',
				'description'		=> 'Boxes delle categorie servizi',
				'render_callback'	=> array( $this, 'acf_blocchi_callback'),
				'category'			=> 'publifarm_singoli',
				'keywords'			=> array( 'link', 'home' ),
				//'supports'			=> ['mode'=> false],
				'mode' => 'edit'
			));
		}
	}

}
