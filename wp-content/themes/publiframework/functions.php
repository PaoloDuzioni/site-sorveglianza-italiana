<?php
define('THEME_SLUG', get_stylesheet());

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
	require_once $composer_autoload;
	Timber\Timber::init();
	\Carbon_Fields\Carbon_Fields::boot();
}

/**
 * Notice for unistalled Timber
 */
if (!class_exists('Timber')) {

	add_action(
		'admin_notices',
		function () {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function ($template) {
			return get_template_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Notice for Unistalled ACF
 */
if (!class_exists('ACF')) {
	add_action('admin_notices', function () {
		echo '<div class="error">
			<p>Questo tema necessita del plugin ACF PRO per poter funzionare; per favore installa il plugin!</p>
		</div>';
	});
	return;
}

/**
 * Set Timber default directories in the theme
 */

Timber::$dirname = array('templates', 'views');

/**
 * Set Timber autoescape (default: false)
 */

Timber::$autoescape = false;

$theme_data = wp_get_theme();
$theme_version = $theme_data->get('Version');
define('PUBLIFARM_CURRENT_VERSION', $theme_version);

/**
 * Add Defer Attr CSS
 */

add_filter('style_loader_tag', 'prefix_defer_css_rel_preload', 10, 4);
function prefix_defer_css_rel_preload($html, $handle, $href, $media)
{
	if (!is_admin() && carbon_get_theme_option('critical_path_css') !== '') {
		$html = '<link rel="preload" href="' . $href . '" as="style" id="' . $handle . '" media="' . $media . '" onload="this.onload=null;this.rel=\'stylesheet\'">'
			. '<noscript>' . $html . '</noscript>';
	}
	return $html;
}

/**
 * Remove Phi Theme Support
 */

add_action('after_setup_theme', 'phi_theme_support');
function phi_theme_support()
{
	remove_theme_support('widgets-block-editor');
}

/**
 * Check if User is Admin (Class TGM, Opzioni Tema)
 */

function is_user_ev_admin()
{
	$cu = wp_get_current_user();
	if (strpos($cu->user_email, '@publifarm.it') !== false) {
		return true;
	} else {
		return false;
	}
}

require_once(get_template_directory() . '/includes/OpzioniTema.php');
require_once(get_template_directory() . '/includes/AcfSettings.php');
require_once(get_template_directory() . '/includes/class-tgm-plugin-activation.php');
require_once(get_template_directory() . '/includes/Breadcrumb.php');
require_once(get_template_directory() . '/includes/StarterSite.php');
require_once(get_template_directory() . '/includes/CustomPostType.php');
require_once(get_template_directory() . '/includes/Utilities.php');
require_once(get_template_directory() . '/blocks/BlocchiCustom.php');
require_once(get_template_directory() . '/includes/SidebarsInit.php');
require_once(get_template_directory() . '/includes/Widgets.php');
require_once(get_template_directory() . '/includes/ShortcodesInit.php');
require_once(get_template_directory() . '/includes/ImageSizes.php');
require_once(get_template_directory() . '/includes/AssetsRegister.php');
require_once(get_template_directory() . '/includes/CustomWc.php');
require_once(get_template_directory() . '/includes/Cf7.php');
require_once(get_template_directory() . '/includes/Patterns.php');

new StarterSite();
new AcfSettings();
new CustomPostType();
new Utilities();
new BlocchiCustom();
new ImageSizes();
new SidebarsInit();
new ShortcodesInit();
new AssetsRegister();

/**
 * Create Standard Pages and Users
 */

if (isset($_GET['activated']) && is_admin()) {
	// StarterSite::CreateStandardUsers();
	StarterSite::CreateStandardPages();
}

/**
 * SERVICES API END POINT
 *
 * API URL example: http://yoursite.com/wp-json/si/v1/services/
 */
add_action('rest_api_init', function () {
	register_rest_route('si-api/v1', '/services', array(
		'methods' => 'POST',
		'callback' => 'pb_get_services',
		'permission_callback' => '__return_true'
	));
});

function pb_get_services($data): array|bool
{
	// Extract parameters
	$query_sectors = $data['taxonomiesSectors'] ?? [];
	$query_services = $data['taxonomiesServices'] ?? [];

	$args = array(
		'post_type' => 'servizi',
		'post_status' => 'publish',
		'paged' => $data['page'],
		'posts_per_page' => $data['postsPerPage'],
	);

	if(!empty($query_services) || !empty($query_sectors)) {
		$tax_query = array(
			'relation' => 'AND',
		);

		if(!empty($query_sectors)) {
			$tax_query[] = array(
				array(
					'taxonomy' => 'categoria_settori',
					'field'    => 'term_id',
					'terms'    => $query_sectors,
				),
			);
		}

		if(!empty($query_services)) {
			$tax_query[] = array(
				array(
					'taxonomy' => 'categoria_servizi',
					'field'    => 'term_id',
					'terms'    => $query_services,
				),
			);
		}

		$args['tax_query'] = $tax_query;
	}

	$services = array();
	$posts_count = 0;
	$the_query = new WP_Query($args);

	if ($the_query->have_posts()) {
		while ($the_query->have_posts()) {
			$the_query->the_post();

			$item = array(
				'id' => get_the_ID(),
				'title' => get_the_title(),
				'permalink' => get_the_permalink(),
				'thumbnail' => get_the_post_thumbnail_url(),
			);
			$services[] = $item;
		}

		$posts_count = $the_query->found_posts;
	}

	return [
		'postsCount' => $posts_count,
		'services' => $services
    ];
}


/**
 * TESTING MAIL SMTP
 */
function setup_phpmailer_init($phpmailer)
{
	$phpmailer->Host = 'smtp.mailtrap.io';   // for example, smtp.mailtrap.io
	$phpmailer->Port = 2525;                 // set the appropriate port: 465, 2525, etc.
	$phpmailer->Username = 'b00b814c4a876e'; // your SMTP username
	$phpmailer->Password = 'c692e2a0c745e9'; // your SMTP password
	$phpmailer->SMTPAuth = true;
	$phpmailer->SMTPSecure = 'tls'; // preferable but optional
	$phpmailer->IsSMTP();
}
add_action('phpmailer_init', 'setup_phpmailer_init');
