<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */


//require_once 'custom-widgets.php';


/**
 * Load child theme css and optional scripts
 *
 * @return void
 */
function hello_elementor_child_enqueue_scripts() {

	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/assets/css/theme.css',
		[
			'hello-elementor-theme-style',
		],
		'1.0.0'
	);

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
  
  wp_enqueue_script('hello-theme-child', get_stylesheet_directory_uri().'/assets/js/theme.js', '1.0.0', true);

}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 20 );