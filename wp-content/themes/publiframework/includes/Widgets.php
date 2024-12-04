<?php

class PortfolioWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'PortfolioWidget',
            'description' => 'My Widget is awesome',
        );
        parent::__construct('PortfolioWidget', 'Last Portfolio Widget', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        echo $before_title . $instance['title'] . $after_title;
        $postargs = array(
            'posts_per_page'   => 3,
            'post_type'        => 'portfolio'
        );
        $posts_array = get_posts($postargs);
        if ($posts_array) {
            echo '<ul class="lista_ultimi_progetti">';
            foreach ($posts_array as $post) {
                echo '<li>
                    <a href="' . get_the_permalink($post->ID) . '">' . get_the_title($post->ID) . '</a>
                </li>';
            }
            wp_reset_postdata();
            echo '</ul>';
        }
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>';
    }
}

class CategorieSelectWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'CategorieSelectWidget',
            'description' => 'My Widget is awesome',
        );
        parent::__construct('CategorieSelectWidget', 'Selettore categorie select', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;

        echo '<section>';
        echo '<select class="cs-select cs-skin-underline">';
        if (is_home()) echo '<option value="" disabled selected>Scegli una categoria</option>';
        $categorie = get_categories();
        foreach ($categorie as $cats) {
            if (is_category()) $currentCat = get_query_var('cat');
            echo '<option value="' . get_category_link($cats->term_id) . '" ';
            if ($currentCat == $cats->term_id) echo 'disabled selected';
            echo '>' . $cats->name . '</option>';
        }
        echo '</select></section>';
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>';
    }
}

class LogoWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'LogoWidget',
            'description' => 'Inserisce il logo cliente, caricato nel case history',
        );
        parent::__construct('LogoWidget', 'Logo Cliente', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        $id_img = carbon_get_post_meta(get_the_ID(), 'logo_azienda');
        echo wp_get_attachment_image($id_img, 'thumbnail', false, array('class' => 'mx-auto'));
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>';
    }
}

class WebsiteWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'WebsiteWidget',
            'description' => 'Inserisce il link al sito web',
        );
        parent::__construct('WebsiteWidget', 'Website Cliente', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        echo '<a href="' . carbon_get_post_meta(get_the_ID(), 'sitoweb_azienda') . '" class="btn btn-outline-primary btn-block" target="_blank" rel="nofollow">Vista sito internet</a>';
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>';
    }
}

class AutoreWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'AutoreWidget',
            'description' => 'Inserisce immagine autore e recensione',
        );
        parent::__construct('AutoreWidget', 'Autore Cliente', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        $format = get_post_format() ?: 'standard';
        if ($format == 'standard') {
            $authorid = get_post(get_the_ID())->post_author;
            $img = get_avatar($authorid, 120);
            $testo = get_the_author_meta('description', $authorid);
        } else {
            $id_img = carbon_get_post_meta(get_the_ID(), 'immagine_cliente');
            $img = wp_get_attachment_image($id_img, 'thumbnail', false);
            $testo = carbon_get_post_meta(get_the_ID(), 'testo_recensione');
        }
        echo '<div class="widget_autore">';
        echo $img;
        if ($format == 'standard') echo '<strong>' . get_the_author_meta('display_name', $authorid) . '</strong><br />';
        echo $testo;
        if ($format == 'aside') echo '<div class="mx-auto mt-1 rateYo" data-rateyo-rating="' . carbon_get_post_meta(get_the_ID(), 'stelline') . '"></div>';
        echo '</div>';
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>';
    }
}

class DownloadWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'DownloadWidget',
            'description' => 'Inserisce immagine e download',
        );
        parent::__construct('DownloadWidget', 'Download widget', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        echo '<div class="widget_download">';
        echo $before_title . $instance['title'] . $after_title;
        $id_img = carbon_get_post_meta(get_the_ID(), 'immagine_download');
        echo wp_get_attachment_image($id_img, 'thumb_download', false, array('class' => 'mx-auto'));
        echo '<a href="' . carbon_get_post_meta(get_the_ID(), 'file_pdf') . '" class="mt-2 btn btn-primary btn-block" target="_blank">Scarica Case study</a>';
        echo '</div>';
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>';
    }
}

class CtaWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'CtaWidget',
            'description' => 'Widget call to action',
        );
        parent::__construct('CtaWidget', 'Cta Widget', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        echo '<div class="widget_cta">';
        echo $before_title . $instance['title'] . $after_title;
        echo do_shortcode($instance['idform']);
        echo '</div>';
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        return $new_instance;
    }

    function form($instance)
    {
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        $idform = ! empty($instance['idform']) ? $instance['idform'] : esc_html__('Shortcode Form CF7', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
            Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
        </label></p>
        <p><label for="' . $this->get_field_id('idform') . '">
            Form: <input class="widefat" id="' . $this->get_field_id('idform') . '" name="' . $this->get_field_name('idform') . '" type="text" value="' . $idform . '" />
        </label></p>';
    }
}

class TassonomieWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'TassonomieWidget',
            'description' => 'Elenco Tassonomie',
        );
        parent::__construct('TassonomieWidget', 'Elenco tassonomie', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        echo $before_title . $instance['title'] . $after_title;
        $terms = get_terms(array(
            'taxonomy' => $instance['tassonomia'],
            'hide_empty' => true,
        ));
        echo '<ul class="list-unstyled mb-0">';
        foreach ($terms as $cats) {
            echo '<li><a href="' . get_term_link($cats->term_id, $instance['tassonomia']) . '">' . $cats->name . '</a></li>';
        }
        echo '</ul>';
        echo $after_widget;
    }

    function update($new_instance, $old_instance)
    {
        $instance = [];
        $instance['title'] = sanitize_text_field($new_instance['title']);
        $instance['tassonomia'] = sanitize_text_field($new_instance['tassonomia']);
        return $instance;
    }

    function form($instance)
    {
        $instance = wp_parse_args(
            (array) $instance,
            [
                'title' => '',
                'tassonomia' => '',
            ]
        );
        $title = ! empty($instance['title']) ? $instance['title'] : esc_html__('New title', 'iw-framework');
        echo '<p><label for="' . $this->get_field_id('title') . '">
                Titolo: <input class="widefat" id="' . $this->get_field_id('title') . '" name="' . $this->get_field_name('title') . '" type="text" value="' . $title . '" />
            </label></p>';
        echo '<p><label>Tassonomia:<select name="' . $this->get_field_name('tassonomia') . '"><option value="">Seleziona</option>';
        $tassonomie = get_taxonomies();
        foreach ($tassonomie as $tax) {
            $selected = (isset($instance['tassonomia']) && $instance['tassonomia'] == 'over') ? 'selected' : '';
            echo '<option value="' . $tax . '" ' . $selected . '>' . $tax . '</option>';
        }
        echo '</select></label></p>';
    }
}

class RemoveFiltersWidget extends WP_Widget
{

    public function __construct()
    {
        $widget_ops = array(
            'classname' => 'RemoveFiltersWidget',
            'description' => 'Widget Remove all WC Filters',
        );
        parent::__construct('RemoveFiltersWidget', 'Remove Filters Widget', $widget_ops);
    }

    public function widget($args, $instance)
    {
        extract($args);
        $filterreset = $_SERVER['REQUEST_URI'];
        if (strpos($filterreset, '?filter_') !== false | strpos($filterreset, '?min_price') !== false | strpos($filterreset, '?max_price') | strpos($filterreset, '?query_')) {
            echo $before_widget;
            $filterreset = strtok($filterreset, '?');
            echo '<div class="clear-filters-container"><a id="woo-clear-filters" href="' . $filterreset . '">Rimuovi tutti i filtri</a></div>';
            echo $after_widget;
        }
    }
}

/**
 * Register Widgets
 */

add_action('widgets_init', 'my_register_widgets');
function my_register_widgets()
{
    register_widget('PortfolioWidget');
    register_widget('CategorieSelectWidget');
    register_widget('LogoWidget');
    register_widget('WebsiteWidget');
    register_widget('AutoreWidget');
    register_widget('DownloadWidget');
    register_widget('CtaWidget');
    register_widget('TassonomieWidget');
    register_widget('RemoveFiltersWidget');
}
