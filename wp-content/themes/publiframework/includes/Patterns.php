<?php

add_action('init', 'make_patterns');
function make_patterns()
{

	// // Register Pattern Category
	// register_block_pattern_category(
	// 	'evidenzio_patterns',
	// 	array( 'label' => 'Ev Patterns', 'my-plugin')
	// );

	// // Register Test Pattern
	// register_block_pattern(
	// 	'ev/test-pattern',
	// 	array(
	// 		'title'       => 'Test Pattern',
	// 		'description' => 'Test Pattern',
	// 		'categories' => ['publifarm_patterns'],
	// 		'content'     => '<!-- wp:evidenzio/columns {"backgroundColor":"colore-tema-1"} -->
	//         <section class="wp-block-evidenzio-columns has-colore-tema-1-background-color has-background"><div class="container"><div class="row"><!-- wp:evidenzio/column -->
	//         <div class="wp-block-evidenzio-column col-12 col-md-12 col-lg"></div>
	//         <!-- /wp:evidenzio/column --></div></div></section>
	//         <!-- /wp:evidenzio/columns -->',
	// 	)
	// );

}
