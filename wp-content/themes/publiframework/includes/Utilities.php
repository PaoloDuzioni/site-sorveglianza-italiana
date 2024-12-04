<?php

class Utilities
{

	public function __construct()
	{

		if (defined('ICL_LANGUAGE_CODE')):
			remove_action('wp_head', 'wp_generator');
			define('ICL_DONT_LOAD_NAVIGATION_CSS', true);
			define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);
			define('ICL_DONT_LOAD_LANGUAGES_JS', true); //non caricare css WPML
		endif;
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('wp_print_styles', 'print_emoji_styles');
		//show_admin_bar(false);

		// Rimuovi shortlink
		remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

		/* Disabilita l'editor temi e css nel backend */
		define('DISALLOW_FILE_EDIT', true);

		add_filter('wpcf7_autop_or_not', '__return_false');

		remove_action('wp_head', 'wp_generator');

		add_filter('upload_mimes', array($this, 'cc_mime_types'));

		add_filter('widget_text', 'do_shortcode');

		add_filter('excerpt_length', array($this, 'custom_excerpt_length'), 999);

		add_filter('excerpt_more', array($this, 'excerpt_readmore'));

		add_action('admin_notices', array($this, 'robots_notice'));

		add_action('template_redirect', array($this, 'remove_wp_archives'));

		add_filter('mod_rewrite_rules', array($this, 'AddHtaccessUpdate'));


		add_action('login_enqueue_scripts', array($this, 'custom_login'));

		add_filter('post_thumbnail_html', array($this, 'modify_post_thumbnail_html'), 99, 5);

		add_action('wp_loaded', array($this, 'ng_maintenance_mode'));

		//Hide Price Range for WooCommerce Variable Products
		add_filter('woocommerce_variable_sale_price_html', array($this, 'lw_variable_product_price'), 10, 2);
		add_filter('woocommerce_variable_price_html', array($this, 'lw_variable_product_price'), 10, 2);

		add_filter('acf/settings/show_admin', array($this, 'show_acf_menu'));
	}

	public function show_acf_menu()
	{
		if (carbon_get_theme_option('nascondi_menu_acf'))
			return false;
		else
			return true;
	}

	public function custom_login()
	{
		$html = '';
		$html .= '<style type="text/css">';

		if ($logoOpz = carbon_get_theme_option('logo_principale')) {
			$html .= "#login h1 a, .login h1 a { background-image: url('" . wp_get_attachment_image_src($logoOpz, 'full')[0] . "'); }";
		}

		if ($sfondoOpz = carbon_get_theme_option('immagine_sfondo_login')) {
			$html .= "body { background: url('" . $sfondoOpz . "')!important; }";
		}
		$html .= '</style>';

		$html .= '<link rel="preconnect" href="https://fonts.googleapis.com">';
		$html .= '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
		$html .= '<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200&display=swap" rel="stylesheet">';

		echo $html;
	}

	public function modify_post_thumbnail_html($html, $post_id, $post_thumbnail_id, $size, $attr)
	{
		$id = get_post_thumbnail_id(); // gets the id of the current post_thumbnail (in the loop)
		$src = wp_get_attachment_image_src($id, $size); // gets the image url specific to the passed in size (aka. custom image size)
		$alt = get_the_title($id); // gets the post thumbnail title

		if (isset($attr['class'])) {
			$class = $attr['class'];
			if (strpos($class, 'lazy') !== false) {
				$html = '<img src="" alt="" data-src="' . $src[0] . '" data-alt="' . $alt . '" class="' . $class . '" />';
			} else {
				$html = '<img src="' . $src[0] . '" alt="' . $alt . '" class="' . $class . '" />';
			}
		}

		return $html;
	}

	/**
	 * 
	 */
	
	public function cc_mime_types($mimes)
	{
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}

	/**
	 * Excerpt Length
	 */

	public function custom_excerpt_length($length)
	{
		return 10;
	}

	/**
	 * Excerpt Read More
	 */

	public function excerpt_readmore($more)
	{
		return '...';
	}

	/**
	 * Robot Blocked Notices
	 */

	public function robots_notice()
	{
		if (get_option('blog_public') == 0):
			echo '<div class="error notice"><p>Attenzione!!! L\'opzione "Visibilità ai motori di ricerca" è impostata su "Scoraggia i motori di ricerca ad effettuare l\'indicizzazione di questo sito". In questo modo google non indicizzerà il sito!!!</p></div>';
		endif;
	}

	/**
	 * REmove Wordpress Archives
	 */

	public function remove_wp_archives()
	{
		//If we are on tag or date or author archive
		if (is_tag() || is_date() || is_author()) {
			global $wp_query;
			$wp_query->set_404(); //set to 404 not found page
		}
	}

	/**
	 * HTACCESS
	 */

	public function AddHtaccessUpdate($rules)
	{
		$new_rules = "";

		//GZIP
		$new_rules .= "\n# BEGIN GZIP\n";
		$new_rules .= "<ifmodule mod_deflate.c>\n";
		$new_rules .= "AddOutputFilterByType DEFLATE text/text text/html text/plain text/xml text/css application/x-javascript application/javascript\n";
		$new_rules .= "</ifmodule>\n";
		$new_rules .= "# END GZIP\n";

		//Cache
		$new_rules .= "\n# BEGIN Cache File\n";
		$new_rules .= "<IfModule mod_mime.c>\n";
		$new_rules .= "AddType text/css .css\n";
		$new_rules .= "AddType text/x-component .htc\n";
		$new_rules .= "AddType application/x-javascript .js\n";
		$new_rules .= "AddType application/javascript .js2\n";
		$new_rules .= "AddType text/javascript .js3\n";
		$new_rules .= "AddType text/x-js .js4\n";
		$new_rules .= "AddType text/html .html .htm\n";
		$new_rules .= "AddType text/richtext .rtf .rtx\n";
		$new_rules .= "AddType image/svg+xml .svg .svgz\n";
		$new_rules .= "AddType text/plain .txt\n";
		$new_rules .= "AddType text/xsd .xsd\n";
		$new_rules .= "AddType text/xsl .xsl\n";
		$new_rules .= "AddType text/xml .xml\n";
		$new_rules .= "AddType video/asf .asf .asx .wax .wmv .wmx\n";
		$new_rules .= "AddType video/avi .avi\n";
		$new_rules .= "AddType image/bmp .bmp\n";
		$new_rules .= "AddType application/java .class\n";
		$new_rules .= "AddType video/divx .divx\n";
		$new_rules .= "AddType application/msword .doc .docx\n";
		$new_rules .= "AddType application/vnd.ms-fontobject .eot\n";
		$new_rules .= "AddType application/x-msdownload .exe\n";
		$new_rules .= "AddType image/gif .gif\n";
		$new_rules .= "AddType application/x-gzip .gz .gzip\n";
		$new_rules .= "AddType image/x-icon .ico\n";
		$new_rules .= "AddType image/jpeg .jpg .jpeg .jpe\n";
		$new_rules .= "AddType application/json .json\n";
		$new_rules .= "AddType application/vnd.ms-access .mdb\n";
		$new_rules .= "AddType audio/midi .mid .midi\n";
		$new_rules .= "AddType video/quicktime .mov .qt\n";
		$new_rules .= "AddType audio/mpeg .mp3 .m4a\n";
		$new_rules .= "AddType video/mp4 .mp4 .m4v\n";
		$new_rules .= "AddType video/mpeg .mpeg .mpg .mpe\n";
		$new_rules .= "AddType application/vnd.ms-project .mpp\n";
		$new_rules .= "AddType application/x-font-otf .otf\n";
		$new_rules .= "AddType application/vnd.ms-opentype .otf\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.database .odb\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.chart .odc\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.formula .odf\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.graphics .odg\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.presentation .odp\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.spreadsheet .ods\n";
		$new_rules .= "AddType application/vnd.oasis.opendocument.text .odt\n";
		$new_rules .= "AddType audio/ogg .ogg\n";
		$new_rules .= "AddType application/pdf .pdf\n";
		$new_rules .= "AddType image/png .png\n";
		$new_rules .= "AddType application/vnd.ms-powerpoint .pot .pps .ppt .pptx\n";
		$new_rules .= "AddType audio/x-realaudio .ra .ram\n";
		$new_rules .= "AddType application/x-shockwave-flash .swf\n";
		$new_rules .= "AddType application/x-tar .tar\n";
		$new_rules .= "AddType image/tiff .tif .tiff\n";
		$new_rules .= "AddType application/x-font-ttf .ttf .ttc\n";
		$new_rules .= "AddType application/vnd.ms-opentype .ttf .ttc\n";
		$new_rules .= "AddType audio/wav .wav\n";
		$new_rules .= "AddType audio/wma .wma\n";
		$new_rules .= "AddType application/vnd.ms-write .wri\n";
		$new_rules .= "AddType application/font-woff .woff\n";
		$new_rules .= "AddType application/vnd.ms-excel .xla .xls .xlsx .xlt .xlw\n";
		$new_rules .= "AddType application/zip .zip\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "<IfModule mod_expires.c>\n";
		$new_rules .= "ExpiresActive On\n";
		$new_rules .= "ExpiresByType text/css A31536000\n";
		$new_rules .= "ExpiresByType text/x-component A31536000\n";
		$new_rules .= "ExpiresByType application/x-javascript A31536000\n";
		$new_rules .= "ExpiresByType application/javascript A31536000\n";
		$new_rules .= "ExpiresByType text/javascript A31536000\n";
		$new_rules .= "ExpiresByType text/x-js A31536000\n";
		$new_rules .= "ExpiresByType text/html A3600\n";
		$new_rules .= "ExpiresByType text/richtext A3600\n";
		$new_rules .= "ExpiresByType image/svg+xml A3600\n";
		$new_rules .= "ExpiresByType text/plain A3600\n";
		$new_rules .= "ExpiresByType text/xsd A3600\n";
		$new_rules .= "ExpiresByType text/xsl A3600\n";
		$new_rules .= "ExpiresByType text/xml A3600\n";
		$new_rules .= "ExpiresByType video/asf A31536000\n";
		$new_rules .= "ExpiresByType video/avi A31536000\n";
		$new_rules .= "ExpiresByType image/bmp A31536000\n";
		$new_rules .= "ExpiresByType application/java A31536000\n";
		$new_rules .= "ExpiresByType video/divx A31536000\n";
		$new_rules .= "ExpiresByType application/msword A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-fontobject A31536000\n";
		$new_rules .= "ExpiresByType application/x-msdownload A31536000\n";
		$new_rules .= "ExpiresByType image/gif A31536000\n";
		$new_rules .= "ExpiresByType application/x-gzip A31536000\n";
		$new_rules .= "ExpiresByType image/x-icon A31536000\n";
		$new_rules .= "ExpiresByType image/jpeg A31536000\n";
		$new_rules .= "ExpiresByType application/json A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-access A31536000\n";
		$new_rules .= "ExpiresByType audio/midi A31536000\n";
		$new_rules .= "ExpiresByType video/quicktime A31536000\n";
		$new_rules .= "ExpiresByType audio/mpeg A31536000\n";
		$new_rules .= "ExpiresByType video/mp4 A31536000\n";
		$new_rules .= "ExpiresByType video/mpeg A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-project A31536000\n";
		$new_rules .= "ExpiresByType application/x-font-otf A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-opentype A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.database A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.chart A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.formula A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.graphics A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.presentation A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.spreadsheet A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.oasis.opendocument.text A31536000\n";
		$new_rules .= "ExpiresByType audio/ogg A31536000\n";
		$new_rules .= "ExpiresByType application/pdf A31536000\n";
		$new_rules .= "ExpiresByType image/png A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-powerpoint A31536000\n";
		$new_rules .= "ExpiresByType audio/x-realaudio A31536000\n";
		$new_rules .= "ExpiresByType image/svg+xml A31536000\n";
		$new_rules .= "ExpiresByType application/x-shockwave-flash A31536000\n";
		$new_rules .= "ExpiresByType application/x-tar A31536000\n";
		$new_rules .= "ExpiresByType image/tiff A31536000\n";
		$new_rules .= "ExpiresByType application/x-font-ttf A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-opentype A31536000\n";
		$new_rules .= "ExpiresByType audio/wav A31536000\n";
		$new_rules .= "ExpiresByType audio/wma A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-write A31536000\n";
		$new_rules .= "ExpiresByType application/font-woff A31536000\n";
		$new_rules .= "ExpiresByType application/vnd.ms-excel A31536000\n";
		$new_rules .= "ExpiresByType application/zip A31536000\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "<IfModule mod_deflate.c>\n";
		$new_rules .= "<IfModule mod_headers.c>\n";
		$new_rules .= "Header append Vary User-Agent env=!dont-vary\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "AddOutputFilterByType DEFLATE text/css text/x-component application/x-javascript application/javascript text/javascript text/x-js text/html text/richtext image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon application/json\n";
		$new_rules .= "<IfModule mod_mime.c>\n";
		$new_rules .= "AddOutputFilter DEFLATE js css htm html xml\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "<FilesMatch \"\.(css|htc|less|js|js2|js3|js4|CSS|HTC|LESS|JS|JS2|JS3|JS4)$\">\n";
		$new_rules .= "FileETag MTime Size\n";
		$new_rules .= "<IfModule mod_headers.c>\n";
		$new_rules .= "Header set Cache-Control \"max-age=31536000\"\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "</FilesMatch>\n";
		$new_rules .= "<FilesMatch \"\.(html|htm|rtf|rtx|svg|svgz|txt|xsd|xsl|xml|HTML|HTM|RTF|RTX|SVG|SVGZ|TXT|XSD|XSL|XML)$\">\n";
		$new_rules .= "FileETag MTime Size\n";
		$new_rules .= "<IfModule mod_headers.c>\n";
		$new_rules .= "Header set Pragma \"public\"\n";
		$new_rules .= "Header append Cache-Control \"public\"\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "</FilesMatch>\n";
		$new_rules .= "<FilesMatch \"\.(woff2|asf|asx|wax|wmv|wmx|avi|bmp|class|divx|doc|docx|eot|exe|gif|gz|gzip|ico|jpg|jpeg|jpe|json|mdb|mid|midi|mov|qt|mp3|m4a|mp4|m4v|mpeg|mpg|mpe|mpp|otf|odb|odc|odf|odg|odp|ods|odt|ogg|pdf|png|pot|pps|ppt|pptx|ra|ram|svg|svgz|swf|tar|tif|tiff|ttf|ttc|wav|wma|wri|woff|xla|xls|xlsx|xlt|xlw|zip|ASF|ASX|WAX|WMV|WMX|AVI|BMP|CLASS|DIVX|DOC|DOCX|EOT|EXE|GIF|GZ|GZIP|ICO|JPG|JPEG|JPE|JSON|MDB|MID|MIDI|MOV|QT|MP3|M4A|MP4|M4V|MPEG|MPG|MPE|MPP|OTF|ODB|ODC|ODF|ODG|ODP|ODS|ODT|OGG|PDF|PNG|POT|PPS|PPT|PPTX|RA|RAM|SVG|SVGZ|SWF|TAR|TIF|TIFF|TTF|TTC|WAV|WMA|WRI|WOFF|XLA|XLS|XLSX|XLT|XLW|ZIP)$\">\n";
		$new_rules .= "FileETag MTime Size\n";
		$new_rules .= "<IfModule mod_headers.c>\n";
		$new_rules .= "Header set Cache-Control \"max-age=31536000\"\n";
		$new_rules .= "</IfModule>\n";
		$new_rules .= "</FilesMatch>\n";
		$new_rules .= "# END Cache File\n";

		return $rules . $new_rules;
	}

	function ng_maintenance_mode()
	{
		if (!class_exists('ACF')) return true;
		if (wp_is_json_request()) return true;
		global $pagenow;

		$arrayIpWhitelist = explode(',', carbon_get_theme_option('ip_whitelist'));
		$httpResponse = carbon_get_theme_option('risposta_http');
		if (!in_array($this->get_the_user_ip(), $arrayIpWhitelist)) {
			if (carbon_get_theme_option('attiva_maintenance_mode') == 'yes' && $pagenow !== 'wp-login.php' && !current_user_can('manage_options') && !is_admin()) {

				if ($httpResponse == 503)
					header($_SERVER["SERVER_PROTOCOL"] . ' 503 Service Temporarily Unavailable', true, 503);
				if ($httpResponse == 200)
					header($_SERVER["SERVER_PROTOCOL"] . ' 200 OK', true, 200);

				header('Content-Type: text/html; charset=utf-8');
				$context         = Timber::context();
				$timber_post     = Timber::get_post(carbon_get_theme_option('pagina_maintenance_mode')[0]['id']);
				$context['post'] = $timber_post;
				$context = StarterSite::passVariables($context);

				Timber::render('maintenance.twig', $context, carbon_get_theme_option('attiva_cache_timber') ? 5000 : false);
				die();
			}
		}
	}

	function get_the_user_ip()
	{
		if (! empty($_SERVER['HTTP_CLIENT_IP'])) {
			//check ip from share internet
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			//to check ip is pass from proxy
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return apply_filters('wpb_get_ip', $ip);
	}

	function lw_variable_product_price($v_price, $v_product)
	{

		// Product Price
		$prod_prices = array($v_product->get_variation_price('min', true), $v_product->get_variation_price('max', true));
		$prod_price = $prod_prices[0] !== $prod_prices[1] ? sprintf(__('A partire da %1$s', 'woocommerce'), wc_price($prod_prices[0])) : wc_price($prod_prices[0]);

		// Regular Price
		$regular_prices = array($v_product->get_variation_regular_price('min', true), $v_product->get_variation_regular_price('max', true));
		sort($regular_prices);
		$regular_price = $regular_prices[0] !== $regular_prices[1] ? sprintf(__('A partire da %1$s', 'woocommerce'), wc_price($regular_prices[0])) : wc_price($regular_prices[0]);

		if ($prod_price !== $regular_price) {
			$prod_price = '<del>' . $regular_price . $v_product->get_price_suffix() . '</del> <ins>' . $prod_price . $v_product->get_price_suffix() . '</ins>';
		}
		return $prod_price;
	}
}
