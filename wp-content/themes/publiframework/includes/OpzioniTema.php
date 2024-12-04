<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

/**
 * Set Carbon field lang suffix
 */

function crb_get_i18n_suffix()
{
    $suffix = '';
    if (! defined('ICL_LANGUAGE_CODE')) {
        return $suffix;
    }
    $suffix = '_' . ICL_LANGUAGE_CODE;
    return $suffix;
}

/**
 * Get Carbon field lang suffix
 */

function crb_get_i18n_theme_option($option_name)
{
    $suffix = crb_get_i18n_suffix();
    return carbon_get_theme_option($option_name . $suffix);
}

function sf_plugins()
{
    $choices = array();
    if (! function_exists('get_plugins')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $plugins = get_plugins();
    foreach ($plugins as $k => $v) {
        $choices[$k] = $v['Name'];
    }
    return $choices;
}

/****************************************
 *            Opzioni Admin 
 ***************************************/

if (!is_admin() || is_user_ev_admin()) {
    $opz_admin = Container::make('theme_options', 'Opzioni Admin');
    //->where( 'current_user_role', 'IN', array( 'administrator' ) );

    /**
     * Opzioni Admin - Funzionalità
     */

    Container::make('theme_options', 'Funzionalità')
        ->set_page_parent($opz_admin)
        ->add_tab('CF7', array(
            Field::make('checkbox', 'ev_attiva_ringraziamento', 'Attiva Ringraziamento'),
            Field::make('checkbox', 'ev_attiva_download', 'Attiva Download')
        ))
        ->add_tab('Assistenza', array(
            Field::make('checkbox', 'ev_attiva_modulo_assistenza', __('Attiva modulo assistenza')),
        ));

    /**
     * Opzioni Admin - Manutenzione
     */

    Container::make('theme_options', 'Manutenzione')
        ->set_page_parent($opz_admin)
        ->add_tab('Aggiornamenti', array(
            Field::make('checkbox', 'disattiva_aggiornamenti_core_major_release'),
            Field::make('checkbox', 'disattiva_aggiornamenti_core_minor_release'),
            Field::make("multiselect", "disattiva_aggiornamenti_plugins")
                ->add_options(sf_plugins())
        ))
        ->add_tab('Plugin', array(
            Field::make('checkbox', 'nascondi_menu_acf')
        ));

    /**
     * Opzioni Admin - Sistema
     */

    Container::make('theme_options', 'Sistema')
        ->set_page_parent($opz_admin)
        ->add_tab('Licenza', array(
            Field::make('checkbox', 'attiva_licenza')
        ))
        ->add_tab('Branding', array(
            Field::make('select', 'attiva_credits')
                ->add_options(array(
                    'yes' => 'Si',
                    'no' => 'No',
                ))
                ->set_default_value('no'),
            Field::make('image', 'immagine_credits')
                ->set_conditional_logic(array(
                    array(
                        'field' => 'attiva_credits',
                        'value' => 'yes',
                        'compare' => '=',
                    )
                ))
                ->set_required(true),
            Field::make('text', 'testo_credits')
                ->set_conditional_logic(array(
                    array(
                        'field' => 'attiva_credits',
                        'value' => 'yes',
                        'compare' => '=',
                    )
                )),
            Field::make('text', 'link_credits')
                ->set_conditional_logic(array(
                    array(
                        'field' => 'attiva_credits',
                        'value' => 'yes',
                        'compare' => '=',
                    )
                ))
                ->set_required(true)

        ))
        ->add_tab('Custom post type', array(
            Field::make('checkbox', 'attiva_cpt_eventi'),
            Field::make('checkbox', 'attiva_cpt_case_history'),
            Field::make('checkbox', 'attiva_cpt_landing')
        ));

    /**
     * Opzioni Admin - Shortcode
     */

    Container::make('theme_options', 'Shortcode')
        ->set_page_parent($opz_admin)
        ->add_tab('Shortcode', array(
            Field::make('html', 'html_shortcode')
                ->set_html('
                <p><h3>[iconesocial]</h3> Stampa le icone social inserite nel relativo repeater nelle opzioni</p>
                <p><h3>[year]</h3> Stampa l\'anno corrente sempre aggiornato</p>
                <p><h3>[privacy_page]</h3> Stampa la url della pagina privacy impostata in Opzioni tema > Altro > Pagine di sistema</p>
                <p><h3>[cookie_page]</h3> Stampa la url della pagina cookie impostata in Opzioni tema > Altro > Pagine di sistema</p>
                
            ')
        ));
}

/****************************************
 *            Opzioni Tema 
 ***************************************/

$opz_tema = Container::make('theme_options', __('Opzioni Tema'))
    ->where('current_user_role', 'IN', array('administrator'));

/****************************************
 *               Generali 
 ***************************************/

$generali = Container::make('theme_options', 'Generali')->set_page_parent($opz_tema);

/**
 * Generali - Stile
 */

$generali->add_tab('Stile', array(
    Field::make('color', 'colore_tema_1', 'Colore tema 1'),
    Field::make('color', 'colore_tema_2', 'Colore tema 2'),
    Field::make('color', 'colore_tema_3', 'Colore tema 3'),
    Field::make('color', 'colore_tema_4', 'Colore tema 4'),
    Field::make('color', 'colore_tema_5', 'Colore tema 5'),
    Field::make('color', 'colore_tema_6', 'Colore tema 6')
));

/**
 * Generali - Identity
 */

$generali->add_tab('Identity', array(
    Field::make('image', 'logo_principale', 'Logo principale')->set_width(50),
    Field::make('image', 'logo_principale_retina', 'Logo principale retina')->set_width(50),
    Field::make('image', 'logo_secondario', 'Logo secondario')->set_width(50),
    Field::make('image', 'logo_secondario_retina', 'Logo secondario retina')->set_width(50),
    Field::make('separator', 'crb_separator3', __('Favicon')),
    Field::make('file', 'manifest_json', 'Manifest.json')->set_type(array('application/json'))->set_width(50),
    Field::make('file', 'favicon_ico', 'Favicon.ico')->set_type(array('image/vnd.microsoft.icon'))->set_width(50),
    Field::make('media_gallery', 'favicons', 'Favicons')->set_type(array('image'))->set_duplicates_allowed(false),
));

/****************************************
 *                 Menu 
 ***************************************/

$menus = Container::make('theme_options', 'Menu')->set_page_parent($opz_tema);

/**
 * Menu - Generali
 */

$menus->add_tab('Generali', array(
    Field::make('checkbox', 'form_di_ricerca', 'Form di ricerca?'),
    Field::make('select', 'cta_menu', 'CTA menu?')
        ->add_options(array(
            'yes' => 'Si',
            'no' => 'No',
        )),
    Field::make('association', 'link_bottone_cta', 'Link bottone CTA')
        ->set_conditional_logic(array(
            array(
                'field' => 'cta_menu',
                'value' => 'yes',
                'compare' => '=',
            )
        ))
        ->set_types(array(
            array(
                'type'      => 'post',
                'post_type' => 'page',
            )
        ))
        ->set_max(1),
    Field::make('text', 'testo_bottone_cta' . crb_get_i18n_suffix(), 'Testo bottone CTA')
        ->set_conditional_logic(array(
            'relation' => 'AND',
            array(
                'field' => 'cta_menu',
                'value' => 'yes',
                'compare' => '=',
            )
        )),

));

/****************************************
 *                Header 
 ***************************************/

$header = Container::make('theme_options', 'Header')->set_page_parent($opz_tema);

/**
 * Header - Generali
 */

$header->add_tab('Generali', array(
    Field::make('select', 'larghezza_navigazione_mobile', 'Larghezza navigazione mobile')
        ->add_options(array(
            'always' => 'Sempre Versione Espansa',
            'sm' => 'Espandi a sm',
            'md' => 'Espandi a md',
            'lg' => 'Espandi a lg',
            'xl' => 'Espandi a xl',
        )),
    Field::make('checkbox', 'racchiudi_nel_container_header', 'Racchiudi nel container'),
    Field::make('select', 'abilita_topbar', 'Abilita Topbar')
        ->add_options(array(
            'yes' => 'Si',
            'no' => 'No',
        )),
    Field::make('text', 'messaggio_topbar' . crb_get_i18n_suffix(), 'Messaggio Topbar')
        ->set_conditional_logic(array(
            array(
                'field' => 'abilita_topbar',
                'value' => 'yes',
                'compare' => '=',
            )
        ))
));

/****************************************
 *                Footer 
 ***************************************/

$footer = Container::make('theme_options', 'Footer')->set_page_parent($opz_tema);

/**
 * Footer - Generali
 */

$footer->add_tab('Generali', array(
    Field::make('select', 'abilita_scrolltop', 'Abilita scroll to top')
        ->add_options(array(
            'yes' => 'Si',
            'no' => 'No',
        )),
));

/****************************************
 *                 Tech 
 ***************************************/

$tech = Container::make('theme_options', 'Tech')->set_page_parent($opz_tema);

/**
 * Tech - CSS
 */

$tech->add_tab('Css', array(
    Field::make('textarea', 'critical_path_css', 'Critical path css'),
    Field::make('textarea', 'css_custom', 'CSS Custom')
));

/**
 * Tech - Cache
 */

$tech->add_tab('Cache', array(
    Field::make('checkbox', 'attiva_cache_timber', 'Attiva cache Timber')
));

/****************************************
 *                Altro 
 ***************************************/

$altro = Container::make('theme_options', 'Altro')->set_page_parent($opz_tema);

/**
 * Altro - Maintenance
 */

$altro->add_tab('Maintenance', array(
    Field::make('select', 'attiva_maintenance_mode', 'Attiva maintenance mode')
        ->add_options(array(
            'yes' => 'Si',
            'no' => 'No',
        ))
        ->set_default_value('no'),
    Field::make('select', 'risposta_http', 'Risposta Http')
        ->add_options(array(
            '200' => '200',
            '503' => '503',
        ))
        ->set_default_value('503')
        ->set_conditional_logic(array(
            array(
                'field' => 'attiva_maintenance_mode',
                'value' => 'yes',
                'compare' => '=',
            )
        )),
    Field::make('association', 'pagina_maintenance_mode', 'Pagina maintenance mode')
        ->set_conditional_logic(array(
            array(
                'field' => 'attiva_maintenance_mode',
                'value' => 'yes',
                'compare' => '=',
            )
        ))
        ->set_types(array(
            array(
                'type'      => 'post',
                'post_type' => 'sistema',
            )
        ))
        ->set_max(1),
    Field::make('textarea', 'ip_whitelist', 'IP Whitelist')->set_help_text('Indirizzi IP separati da virgola')
        ->set_conditional_logic(array(
            array(
                'field' => 'attiva_maintenance_mode',
                'value' => 'yes',
                'compare' => '=',
            )
        ))
));

/**
 * Altro - Pagine di sistema
 */

$altro->add_tab('Pagine di sistema', array(
    Field::make('association', 'pagina_404', 'Pagina 404')
        ->set_types(array(
            array(
                'type'      => 'post',
                'post_type' => 'sistema',
            )
        ))
        ->set_max(1),
    Field::make('association', 'pagina_privacy', 'Pagina Privacy')
        ->set_types(array(
            array(
                'type'      => 'post',
                'post_type' => 'page',
            )
        ))
        ->set_max(1),
    Field::make('association', 'pagina_cookie', 'Pagina cookie')
        ->set_types(array(
            array(
                'type'      => 'post',
                'post_type' => 'page',
            )
        ))
        ->set_max(1)
));

/**
 * Altro - Google Map
 */

$altro->add_tab('GMaps', array(
    Field::make('text', 'google_api_key', 'Google Api Key'),
    Field::make('image', 'immagine_marker', 'Immagine marker')
));

/**
 * Altro - Login
 */

$altro->add_tab('Login', array(
    Field::make('image', 'immagine_sfondo_login', 'Immagine sfondo Login')->set_value_type('url')
));

/**
 * Altro - Social Network
 */

$altro->add_tab('Social Networks', array(
    Field::make('select', 'attiva_social', 'Attiva social')
        ->add_options(array(
            'yes' => 'Si',
            'no' => 'No',
        ))
        ->set_default_value('no'),
    Field::make('complex', 'icone')
        ->add_fields(array(
            Field::make('select', 'social')
                ->add_options(array(
                    'icon-twitter' => 'Twitter',
                    'icon-linkedin' => 'Linkedin',
                    'icon-youtube' => 'Youtube',
                    'icon-instagram' => 'Instagram',
                    'icon-facebook' => 'Facebook'
                ))->set_width(50),
            Field::make('text', 'link')->set_width(50),
        ))
        ->set_conditional_logic(array(
            array(
                'field' => 'attiva_social',
                'value' => 'yes',
                'compare' => '=',
            )
        ))
));

/**
 * Contact Form
 */

if (get_option('_ev_attiva_ringraziamento') == 'yes' || get_option('_ev_attiva_download') == 'yes') {
    $c_form = Container::make('theme_options', 'Contact form')->set_page_parent($opz_tema);
}

if (get_option('_ev_attiva_ringraziamento') == 'yes') {
    $c_form->add_tab('Ringraziamento', array(
        Field::make('textarea', 'frase_ringraziamento_dopo_invio' . crb_get_i18n_suffix(), 'Frase ringraziamento dopo invio')
    ));
}

/**
 * Attiva Download
 */

if (get_option('_ev_attiva_download') == 'yes') {
    $c_form->add_tab('Mail cataloghi', array(
        Field::make('rich_text', 'frase_contenuto_email' . crb_get_i18n_suffix(), 'Frase contenuto email'),
        Field::make('file', 'file_catalogo', 'File catalogo')
            ->set_value_type('url'),
        Field::make('text', 'subject_email' . crb_get_i18n_suffix(), 'Subject email'),
        Field::make('association', 'pagina_download', 'Pagina download')
            ->set_types(array(
                array(
                    'type'      => 'post',
                    'post_type' => 'page',
                )
            ))
            ->set_max(1)
    ));
}

/**
 * Assistenza
 */

if (get_option('_ev_attiva_modulo_assistenza') == 'yes') {
    $assist = Container::make('theme_options', 'Assistenza')->set_page_parent($opz_tema);
    $assist->add_tab('Richiesta assistenza', array(
        Field::make('html', 'modulo_assistenza')
            ->set_html('<h1 class="text-center">To be done...</h1>')
    ));
}
