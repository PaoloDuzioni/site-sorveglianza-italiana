<?php

class SidebarsInit
{

	public function __construct()
	{
		add_action('widgets_init', array($this, 'ideaweb_widgets_init'));
	}

	public function ideaweb_widgets_init()
	{

		$div_start 	= '<div id="%1$s" class="widget-sidebar">';
		$div_end  	= '</div>';
		$span_start = '<span class="titolo-widget-sidebar">';
		$span_end 	= '</span>';

		register_sidebar(array(
			'name' 			=> 'Sidebar Top SX',
			'id' 			=> 'sidebar_top_sx',
			'description' 	=> 'Area Widget TopBar SX',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Sidebar Top DX',
			'id' 			=> 'sidebar_top_dx',
			'description' 	=> 'Area Widget TopBar DX',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Sidebar Blog',
			'id' 			=> 'sidebar_blog',
			'description' 	=> 'Area Widget Blog',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start . '<span>',
			'after_title' 	=> $span_end . $span_end
		));

		register_sidebar(array(
			'name' 			=> 'Footer 1 (1/5)',
			'id' 			=> 'sidebar_footer_1',
			'description' 	=> 'Area Widget Footer 1',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Footer 2 (1/5)',
			'id' 			=> 'sidebar_footer_2',
			'description' 	=> 'Area Widget Footer 2',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Footer 3 (1/5)',
			'id' 			=> 'sidebar_footer_3',
			'description' 	=> 'Area Widget Footer 3',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Footer 4 (1/5)',
			'id' 			=> 'sidebar_footer_4',
			'description' 	=> 'Area Widget Footer 4',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Footer 5 (1/5)',
			'id' 			=> 'sidebar_footer_5',
			'description' 	=> 'Area Widget Footer 5',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Footer Copyright SX',
			'id' 			=> 'sidebar_footer_copyright_sx',
			'description' 	=> 'Area Widget Footer Copyright',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Footer Copyright DX',
			'id' 			=> 'sidebar_footer_copyright_dx',
			'description' 	=> 'Area Widget Footer Copyright',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));

		register_sidebar(array(
			'name' 			=> 'Sidebar Shop',
			'id' 			=> 'sidebar_shop',
			'description' 	=> 'Area Widget Shop',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start . '<span>',
			'after_title' 	=> $span_end . $span_end
		));

		register_sidebar(array(
			'name' 			=> 'Sidebar Menu',
			'id' 			=> 'sidebar_menu',
			'description' 	=> 'Area Widget Menu',
			'before_widget' => $div_start,
			'after_widget' 	=> $div_end,
			'before_title' 	=> $span_start,
			'after_title' 	=> $span_end,
		));
	}
}
