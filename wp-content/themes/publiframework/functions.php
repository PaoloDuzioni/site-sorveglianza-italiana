<?php
define('THEME_SLUG', get_stylesheet());

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
	require_once $composer_autoload;
	Timber\Timber::init();
	\Carbon_Fields\Carbon_Fields::boot();
}

// /**
//  * Notice for Required Plugins
//  */

// add_action('tgmpa_register', 'iw_framework_register_required_plugins');
// function iw_framework_register_required_plugins()
// {
// 	$plugins = array(
// 		array(
// 			'name'      => 'All-In-One Security (AIOS) – Security and Firewall',
// 			'slug'      => 'all-in-one-wp-security-and-firewall',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'Contact Form 7',
// 			'slug'      => 'contact-form-7',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'SVG Support',
// 			'slug'      => 'svg-support',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'WP Mail SMTP',
// 			'slug'      => 'wp-mail-smtp',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'WP Migrate Lite',
// 			'slug'      => 'wp-migrate-db',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'Flamingo',
// 			'slug'      => 'flamingo',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'GTM4WP',
// 			'slug'      => 'duracelltomi-google-tag-manager',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'Rank Math SEO',
// 			'slug'      => 'seo-by-rank-math',
// 			'required'  => false
// 		),
// 		array(
// 			'name'      => 'Duplicate post',
// 			'slug'      => 'duplicate-post',
// 			'required'  => false
// 		)
// 	);

// 	/*
// 	 * Array of configuration settings. Amend each line as needed.
// 	 *
// 	 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
// 	 * strings available, please help us make TGMPA even better by giving us access to these translations or by
// 	 * sending in a pull-request with .po file(s) with the translations.
// 	 *
// 	 * Only uncomment the strings in the config array if you want to customize the strings.
// 	 */
// 	$config = array(
// 		'id'           => 'publi-framework',                 // Unique ID for hashing notices for multiple instances of TGMPA.
// 		'default_path' => '',                      // Default absolute path to bundled plugins.
// 		'menu'         => 'tgmpa-install-plugins', // Menu slug.
// 		'parent_slug'  => 'themes.php',            // Parent menu slug.
// 		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
// 		'has_notices'  => true,                    // Show admin notices or not.
// 		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
// 		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
// 		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
// 		'message'      => '',                      // Message to output right before the plugins table.
// 	);

// 	tgmpa($plugins, $config);
// }

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