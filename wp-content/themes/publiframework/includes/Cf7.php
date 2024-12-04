<?php

/**
 * Add Script to Footer
 */

add_action('wp_footer', 'cf7_wp_footer');
function cf7_wp_footer()
{
    if (carbon_get_theme_option('ev_attiva_ringraziamento')) {
        $frase = htmlentities(crb_get_i18n_theme_option('frase_ringraziamento_dopo_invio'));
        $frase = preg_replace("/\r|\n/", "", $frase);

        echo '<script type="text/javascript">
            document.addEventListener("wpcf7mailsent", function(event) {
                var formid = event.detail.unitTag;
                var html = \'<div class="invioOk">' . $frase . '</div>\';
                jQuery("#" + formid).find(".wpcf7-form").hide();
                jQuery("#" + formid).find(".screen-reader-response").hide();
                jQuery("#" + formid).append(html);
            }, false);
        </script>';
    }
}

// /**
//  * Add Custom Form Tags
//  */

// add_action( 'wpcf7_init', 'custom_add_form_tags' );
// function custom_add_form_tags()
// {
//     wpcf7_add_form_tag('catalogo', 'custom_cataloghi_form_tag_handler');
//     wpcf7_add_form_tag('privacy_page', 'cf7_privacy_page');
//     wpcf7_add_form_tag('cookie_page', 'cf7_cookie_page');
// }

// /**
//  * Form Tag Handler
//  * 
//  * @param string $tag
//  */

// function custom_cataloghi_form_tag_handler($tag)
// {
//     if (carbon_get_theme_option('file_catalogo')) {
//         $datalist = '';
//         $postId = carbon_get_theme_option('file_catalogo');
//         $datalist .= '<input type="hidden" name="catalogo" value="' . $postId . '" />';
//         return $datalist;
//     }
// }

// /**
//  * Privacy Page Handler
//  * 
//  * @param string $tag
//  */

// function cf7_privacy_page($tag)
// {
//     if (carbon_get_theme_option('pagina_privacy')) {
//         $pagina_privacy = carbon_get_theme_option('pagina_privacy')[0]['id'];
//         return get_the_permalink(apply_filters('wpml_object_id', $pagina_privacy, 'page'));
//     }
// }

// /**
//  * Cookie Page Handler
//  * 
//  * @param string $tag
//  */

// function cf7_cookie_page($tag)
// {
//     if (carbon_get_theme_option('pagina_cookie')) {
//         $pagina_privacy = carbon_get_theme_option('pagina_cookie')[0]['id'];
//         return get_the_permalink(apply_filters('wpml_object_id', $pagina_privacy, 'page'));
//     }
// }

// /**
//  * Handle Before Mail Sending
//  */

// add_filter("wpcf7_before_send_mail", function ($WPCF7_ContactForm) {

//     if (carbon_get_theme_option('ev_attiva_download')):

//         $wpcf7      = WPCF7_ContactForm::get_current();
//         $submission = WPCF7_Submission::get_instance();
//         if ($submission) $posted_data = $submission->get_posted_data();
//         $mail = $WPCF7_ContactForm->prop('mail');
//         $WPCF7_ContactForm->set_properties(array(
//             "mail" => $mail
//         ));
//         $result = "";
//         if (isset($posted_data['catalogo']) && carbon_get_theme_option('file_catalogo')) {
//             $ii = 0;
//             $url = get_the_permalink(apply_filters('wpml_object_id', carbon_get_theme_option('pagina_download')[0]['id'], 'page'));
//             $nonceUrl = add_query_arg(array(
//                 'catalogo' => $posted_data['catalogo'],
//             ), $url);
//             $message = crb_get_i18n_theme_option('frase_contenuto_email');
//             $message .= '<a href="' . $nonceUrl . '">Clicca QUI</a>';
//             $subject = crb_get_i18n_theme_option('subject_email');
//             wp_mail($posted_data['your-email'], $subject, $message, array('Content-Type: text/html; charset=UTF-8'));
//         }

//     endif;
//     return $WPCF7_ContactForm;
// });

// /**
//  * Handle Mail Sending
//  * 
//  * @param object $contact_form
//  */

// add_action('wpcf7_mail_sent', 'my_custom_mail_sent' );
// function my_custom_mail_sent($contact_form)
// {
//     $submission = WPCF7_Submission::get_instance();
//     $posted_data = $submission->get_posted_data();
//     $url_catalogo = wp_get_attachment_url(carbon_get_theme_option('file_catalogo'));
//     if (!$posted_data['checkbox-360']) wp_redirect($url_catalogo);
// }
