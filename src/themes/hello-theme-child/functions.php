<?php

/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */


//require_once 'custom-widgets.php';


/**
 * Checks whether the env is local or not
 *
 * @return boolean
 */
function hello_elementor_child_is_local(){
	if ( 'http://localhost' === get_site_url() ) {
		$is_local = true;
	}

	return $is_local;

}

/**
 * Load child theme css and optional scripts
 *
 * @return void
 */


function hello_elementor_child_enqueue_scripts()
{
	$is_local = hello_elementor_child_is_local();

	if($is_local){

		wp_enqueue_style(
			'hello-elementor-child-style',
			get_stylesheet_directory_uri() . '/assets/css/theme.css',
			[
				'hello-elementor-theme-style',
			],
			'1.0.0'
		);

	} else {

		wp_enqueue_style(
			'hello-elementor-child-style',
			get_stylesheet_directory_uri() . '/assets/css/theme.min.css',
			[
				'hello-elementor-theme-style',
			],
			'1.0.0'
		);

	}


	wp_enqueue_style(
		'from-slider-slick',
		'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css',
		'1.8.1'
	);

	wp_enqueue_style(
		'from-slider-slick-theme',
		'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css',
		'1.8.1'
	);

	wp_enqueue_script('from-slider-slick-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', '1.8.1', true);
	wp_enqueue_script('from-gsap-tween-max', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', '2.1.3', true);
	wp_enqueue_script('from-scroll-magic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js', '2.0.7', true);
	wp_enqueue_script('from-gsap-animation', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js', '2.0.7', true);
	wp_enqueue_script('from-gsap-indicators', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js', '2.0.7', true);


	if($is_local){
		wp_enqueue_script('hello-theme-child', get_stylesheet_directory_uri() . '/assets/js/theme.js', '1.0.0', true);
	} else {
		wp_enqueue_script('hello-theme-child', get_stylesheet_directory_uri() . '/assets/js/theme.min.js', '1.0.0', true);		
	}
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 20);

// function my_query_by_post_types( $query, $cat ){
// 	$query->set( 'category_name', $cat);
// }

add_action('elementor/query/my_query_by_post_types', function ($query) {
	$query->set('category_name', 'news');
});

function search_filter($query) {
	if ( ! is_admin() && $query->is_main_query() ) {
		if ( $query->is_search ) {
			// Should categories be used to restrict search results?
			$parent_term_id = 125; // term id of parent term (Awards)
			$taxonomies = array( 'category' );
			$args = array( 'child_of'      => $parent_term_id	); 

			$all_categories = get_terms($taxonomies, $args);
			$categsIds = array(125);
			foreach($all_categories as $categ) {
				$categsIds[] = $categ->term_id;
			}
			
			$query->set( 'post_type', ['post', 'page'] );
			// $query->set( 'tag', 'press-release' );
			$query->set( 'category__not_in', $categsIds);
		}
	}
}
add_action( 'pre_get_posts', 'search_filter' );

//Custom Theme Settings
add_action('admin_menu', 'add_social_media_links_interface');

function add_social_media_links_interface() {
    add_options_page('Social Links', 'Social Links', '8', 'functions', 'edit_social_links');
}

function edit_social_links() {
?>
  <div class='wrap'>
  <h2> Social Media Links </h2>
  <form method="post" action="options.php">
  <?php wp_nonce_field('update-options') ?>
  <p><strong> Facebook </strong><br />
  <input type="text" name="facebook" size="45" value="<?php echo get_option('facebook'); ?>" /></p>
  <p><strong> Twitter </strong><br />
  <input type="text" name="twitter" size="45" value="<?php echo get_option('twitter'); ?>" /></p>
  <p><strong> Instagram </strong><br />
  <input type="text" name="instagram" size="45" value="<?php echo get_option('instagram'); ?>" /></p>
  <p><strong> LinkedIn </strong><br />
  <input type="text" name="linkedin" size="45" value="<?php echo get_option('linkedin'); ?>" /></p>
  <p><input type="submit" name="Submit" value="Update" /></p>
  <input type="hidden" name="action" value="update" />
  <input type="hidden" name="page_options" value="facebook,twitter,instagram,linkedin" />

  </form>
  </div>
<?php
}

function home_custom_body_class( array $classes ) {
	if ( is_front_page() ) {
		$classes[] = 'preload-home';
	}

	return $classes;
}	

add_filter( 'body_class', 'home_custom_body_class' );

// function my_query_by_post_types( $query ){
// 	$query->set( 'category_name', 'partnerships');
// };

// add_action('elementor/query/{$query_id}', 'my_query_by_post_types';

/*
Disabled previous title back button
function previoustitle_shortcode($atts)
{
	// $prev_post = $_GET['anterior'];
	// if (!empty($prev_post)) {
	// 	echo $prev_post;
	// }

	// else{
	// 	echo '';
	// }	

	echo get_adjacent_post( false, '', true, 'page' );

};

add_shortcode('show_previous_title', 'previoustitle_shortcode');
*/