<?php
class StarterSite extends Timber\Site
{
	/**
	 * Add Timber Support
	 */

	public function __construct()
	{
		add_action('after_setup_theme', array($this, 'theme_supports'));
		add_filter('timber/context', array($this, 'add_to_context'));
		add_filter('timber/twig', array($this, 'add_to_twig'));
		add_action('init', array($this, 'register_my_menus'));
		add_action('after_setup_theme', array($this, 'remove_core_updates'));
		add_filter('site_transient_update_plugins', array($this, 'disable_plugin_updates'));
		add_filter('auto_update_core', array($this, 'disable_auto_update_core'));
		parent::__construct();
	}

	/**
	 * Theme Support
	 */

	public function theme_supports()
	{

		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		add_theme_support('woocommerce');
		add_theme_support('menus');
		add_theme_support('responsive-embeds');
		add_theme_support('align-wide');

		add_post_type_support('page', 'excerpt');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		// Switch default core markup for search form, comment form, and comments to output valid HTML5.
		add_theme_support(
			'html5',
			array('comment-form', 'comment-list', 'gallery', 'caption',)
		);

		// // Enable support for Post Formats.
		// add_theme_support(
		// 	'post-formats',
		// 	array('aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio',)
		// );

		// Color Palette
		add_theme_support('editor-color-palette', array(
			array(
				'name'  => 'Colore Tema 1',
				'slug'  => 'colore-tema-1',
				'color' => get_option('_colore_tema_1'),
			),
			array(
				'name'  => 'Colore Tema 2',
				'slug'  => 'colore-tema-2',
				'color' => get_option('_colore_tema_2'),
			),
			array(
				'name'  => 'Colore Tema 3',
				'slug'  => 'colore-tema-3',
				'color' => get_option('_colore_tema_3'),
			),
			array(
				'name'  => 'Colore Tema 4',
				'slug'  => 'colore-tema-4',
				'color' => get_option('_colore_tema_4'),
			),
			array(
				'name'  => 'Colore Tema 5',
				'slug'  => 'colore-tema-5',
				'color' => get_option('_colore_tema_5'),
			),
			array(
				'name'  => 'Colore Tema 6',
				'slug'  => 'colore-tema-6',
				'color' => get_option('_colore_tema_6'),
			)
		));
	}

	/**
	 * Add To Context
	 */

	public function add_to_context($context)
	{

		if (is_admin()) return false;

		$context['is_front_page'] = is_front_page();
		$context['theme_slug'] = THEME_SLUG;
		$context['menu']  = Timber::get_menu('testata');
		$context['menu_top']  = Timber::get_menu('menu_top');
		$context['site']  = $this;
		if (class_exists('woocommerce')) {
			$context['woocommerce_active'] = true;
			$context['woocommerce_count_cart'] = WC()->cart->cart_contents_count;
			$context['shop_page'] = get_permalink(wc_get_page_id('shop'));
		} else {
			$context['woocommerce_active'] = false;
		}

		if (function_exists('icl_get_languages')) {
			$languages = icl_get_languages('skip_missing=1');
			$context['lang_switcher'] = (count($languages) > 1) ? $languages : null;
		} else {
			$context['lang_switcher'] = null;
		}

		$context['img_dir'] = get_stylesheet_directory_uri() . '/images/';
		$context['url_catalogo'] = wp_get_attachment_url(carbon_get_theme_option('file_catalogo'));

		$context['wp_nonce_field'] = wp_nonce_field('ajax-login-nonce', 'security', true, false);
		$context['the_search_query'] = get_search_query();
		
		return $context;
	}

	/**
	 * Add To Twig
	 */

	public function add_to_twig($twig)
	{
		$twig->addExtension(new Twig\Extension\StringLoaderExtension());
		$twig->addFilter(new Twig\TwigFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

	/**
	 * Register Menus
	 */

	public function register_my_menus()
	{
		register_nav_menus(array(
			'testata' => __('Menu Testata', 'iw-framework'),
//			'menu_top' => __('Menu Top', 'iw-framework')
		));
	}

	/**
	 * Remove Wordpress Core Update
	 */

	public function remove_core_updates()
	{
		if (get_option('_disattiva_aggiornamenti_core_major_release')) {
			if (!current_user_can('update_core')) {
				return;
			}
			add_filter('pre_option_update_core', '__return_null');
			add_filter('pre_site_transient_update_core', '__return_null');
		}
	}

	/**
	 * Disable Plugins Updates
	 */

	function disable_plugin_updates($value)
	{
		$pluginsToDisable = carbon_get_theme_option('disattiva_aggiornamenti_plugins');
		if ($pluginsToDisable && isset($value) && is_object($value)) {
			foreach ($pluginsToDisable as $plugin) {
				if (isset($value->response[$plugin])) {
					unset($value->response[$plugin]);
				}
			}
		}
		return $value;
	}

	/**
	 * Disabel Wordpress Core Update
	 */

	function disable_auto_update_core()
	{
		if (carbon_get_theme_option('disattiva_aggiornamenti_core_minor_release')) {
			return false;
		}
	}

	/**
	 * Create System and Standard Pages
	 */

	public static function CreateStandardPages()
	{
		$systemPages = ['404', 'Maintenance'];
		foreach ($systemPages as $page) {
			self::createPage($page, 'sistema');
		}

		$standardPages = ['Cookie policy'];
		foreach ($standardPages as $page) {
			self::createPage($page, 'page');
		}
	}

	/**
	 * Create New Page
	 */

	private static function createPage($title, $post_type)
	{
		$templateFile = get_template_directory() . '/system-pages/' . sanitize_title($title) . '.html';
		$content = file_exists($templateFile) ? file_get_contents($templateFile) : '';

		// Check if page already exists
		$pageCheck = get_posts([
			'name'        => sanitize_title($title),
			'post_type'   => $post_type,
			'post_status' => 'publish',
			'numberposts' => 1,
		]);

		if (empty($pageCheck)) {
			$newPage = [
				'post_type'    => $post_type,
				'post_title'   => $title,
				'post_content' => $content,
				'post_status'  => 'publish',
			];

			wp_insert_post($newPage);
		}
	}

	// /**
	//  * Create Standard Users
	//  */

	// public static function CreateStandardUsers()
	// {
	// 	$usersArray = array(
	// 		0 => array(
	// 			'name' => 'masbovi',
	// 			'email' => 'massimo.bovi@publifarm.it',
	// 			'pwd' => 'rh0BO058BbQf',
	// 			'first_name' => 'Massimo',
	// 			'last_name' => 'Bovi',
	// 			'show_admin_bar_front' => false
	// 		)
	// 	);

	// 	foreach ($usersArray as $user) {
	// 		if (!username_exists($user['name'])) {
	// 			$userdata = array(
	// 				'user_login'  => $user['name'],
	// 				'user_pass'   => $user['pwd'],
	// 				'user_email'  => $user['email'],
	// 				'first_name' => $user['first_name'],
	// 				'last_name' => $user['last_name'],
	// 				'role'	=> 'administrator'
	// 			);
	// 			wp_insert_user($userdata);
	// 		}
	// 	}
	// }

	/**
	 * Pass Variables to Context
	 */

	public static function passVariables($context)
	{
		/**
		 * Sidebar Wordpress
		 */

		$context['sidebar_top_sx'] = Timber::get_widgets('sidebar_top_sx');
		$context['sidebar_top_dx'] = Timber::get_widgets('sidebar_top_dx');
		$context['sidebar_blog'] = Timber::get_widgets('sidebar_blog');
		$context['sidebar_footer_1'] = Timber::get_widgets('sidebar_footer_1');
		$context['sidebar_footer_2'] = Timber::get_widgets('sidebar_footer_2');
		$context['sidebar_footer_3'] = Timber::get_widgets('sidebar_footer_3');
		$context['sidebar_footer_4'] = Timber::get_widgets('sidebar_footer_4');
		$context['sidebar_footer_5'] = Timber::get_widgets('sidebar_footer_5');
		$context['sidebar_footer_copyright_sx'] = Timber::get_widgets('sidebar_footer_copyright_sx');
		$context['sidebar_footer_copyright_dx'] = Timber::get_widgets('sidebar_footer_copyright_dx');
		$context['sidebar_menu'] = Timber::get_widgets('sidebar_menu');

		/**
		 * Options ACF
		 */

		// $context['options'] = get_fields('options');

		$context['ev_attiva_modulo_tracciamenti'] = carbon_get_theme_option('ev_attiva_modulo_tracciamenti');
		$context['g_tag_manager_id'] = carbon_get_theme_option('g_tag_manager_id');
		$context['ga_id'] = carbon_get_theme_option('ga_id');
		$context['ga4_id'] = carbon_get_theme_option('ga4_id');
		$context['gads_conversione_id'] = carbon_get_theme_option('gads_conversione_id');
		$context['ga_optimize_id'] = carbon_get_theme_option('ga_optimize_id');
		$context['cookiebot_id'] = carbon_get_theme_option('cookiebot_id');
		$context['facebook_pixel_id'] = carbon_get_theme_option('facebook_pixel_id');
		$context['microsoft_advertising_uet_tag_id'] = carbon_get_theme_option('microsoft_advertising_uet_tag_id');
		$context['linkedin_id_insight_tag'] = carbon_get_theme_option('linkedin_id_insight_tag');
		$context['criteo_id'] = carbon_get_theme_option('criteo_id');
		$context['criteo_email'] = carbon_get_theme_option('criteo_email');
		$context['hotjar_site_id'] = carbon_get_theme_option('hotjar_site_id');

		/**
		 * Colors
		 */

		if ($colore_tema_1 = carbon_get_theme_option('colore_tema_1'))
			$context['colore_tema_1'] = $colore_tema_1;
		if ($colore_tema_2 = carbon_get_theme_option('colore_tema_2'))
			$context['colore_tema_2'] = $colore_tema_2;
		if ($colore_tema_3 = carbon_get_theme_option('colore_tema_3'))
			$context['colore_tema_3'] = $colore_tema_3;
		if ($colore_tema_4 = carbon_get_theme_option('colore_tema_4'))
			$context['colore_tema_4'] = $colore_tema_4;
		if ($colore_tema_5 = carbon_get_theme_option('colore_tema_5'))
			$context['colore_tema_5'] = $colore_tema_5;
		if ($colore_tema_6 = carbon_get_theme_option('colore_tema_6'))
			$context['colore_tema_6'] = $colore_tema_6;

		/**
		 * Logos
		 */

		if ($logo_principale = carbon_get_theme_option('logo_principale'))
			$context['logo_principale'] = $logo_principale;
		if ($logo_principale_retina = carbon_get_theme_option('logo_principale_retina'))
			$context['logo_principale_retina'] = $logo_principale_retina;
		if ($logo_secondario = carbon_get_theme_option('logo_secondario'))
			$context['logo_secondario'] = $logo_secondario;
		if ($logo_secondario_retina = carbon_get_theme_option('logo_secondario_retina'))
			$context['logo_secondario_retina'] = $logo_secondario_retina;

		/**
		 * Favicons
		 */

		if ($manifest_json = carbon_get_theme_option('manifest_json'))
			$context['manifest_json'] = wp_get_attachment_url($manifest_json);
		if ($favicon_ico = carbon_get_theme_option('favicon_ico'))
			$context['favicon_ico'] = wp_get_attachment_url($favicon_ico);
		if ($favicons = carbon_get_theme_option('favicons')) {
			if (!empty($favicons)) {
				$context['favicons'] = [];
				foreach ($favicons as $favicon_id) {
					$favicon_meta = wp_get_attachment_metadata($favicon_id);
					$favicon = [
						'url' => wp_get_attachment_url($favicon_id),
						'mime_type' => get_post_mime_type($favicon_id),
						'width' => $favicon_meta['width'],
						'height' => $favicon_meta['height'],
						'title' => get_the_title($favicon_id),
						'type' => ''
					];

					if (str_contains($favicon['title'], 'android') || str_contains($favicon['title'], 'favicon')) {
						$favicon['type'] = 'icon';
					} else if (str_contains($favicon['title'], 'apple')) {
						$favicon['type'] = 'apple-touch-icon';
					} else if (str_contains($favicon['title'], 'ms-icon')) {
						$favicon['type'] = 'msapplication-TileImage';
					}

					$context['favicons'][] = $favicon;
				}
			}
		}

		/**
		 * Breadcrumb
		 */
		
		$context['breadcrumb'] = pubfa_breadcrumb();

		/**
		 * CTA Menu
		 */

		if ($cta_menu = carbon_get_theme_option('cta_menu') == 'yes') {
			$context['cta_menu'] = $cta_menu;
			if ($link_bottone_cta = $link_bottone_cta = carbon_get_theme_option('link_bottone_cta')) {
				$context['link_bottone_cta'] = get_the_permalink($link_bottone_cta[0]['id']);
			}
			$context['testo_bottone_cta'] = crb_get_i18n_theme_option('testo_bottone_cta');
		}

		$context['larghezza_navigazione_mobile'] = carbon_get_theme_option('larghezza_navigazione_mobile');
		$context['racchiudi_nel_container_header'] = carbon_get_theme_option('racchiudi_nel_container_header') == 'yes' ? true : false;
		$context['abilita_topbar'] = carbon_get_theme_option('abilita_topbar') == 'yes' ? true : false;
		$context['messaggio_topbar'] = crb_get_i18n_theme_option('messaggio_topbar');
		$context['abilita_scrolltop'] = carbon_get_theme_option('abilita_scrolltop') == 'yes' ? true : false;

		if ($critical_path_css = carbon_get_theme_option('critical_path_css'))
			$context['critical_path_css'] = $critical_path_css;
		if ($css_custom = carbon_get_theme_option('css_custom'))
			$context['css_custom'] = $css_custom;

		if ($attiva_credits = carbon_get_theme_option('attiva_credits')) {
			$context['attiva_credits'] = $attiva_credits == 'yes' ? true : false;
			$context['immagine_credits'] = carbon_get_theme_option('immagine_credits');
			$context['testo_credits'] = carbon_get_theme_option('testo_credits');
			$context['link_credits'] = carbon_get_theme_option('link_credits');
		}

		return $context;
	}
}
