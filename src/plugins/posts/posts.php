<?php
/**
 * Plugin Name: FROM Posts
 * Description: A simple Elementor Widget that creates a list of posts
 * Plugin URI:  https://www.from.digital
 * Version:     1.0.0
 * Author:      Sylvester Molina
 * Author URI:  https://www.from.digital
 * Text Domain: posts
 */
namespace From_Posts;

use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// The Widget_Base class is not available immediately after plugins are loaded, so
// we delay the class' use until Elementor widgets are registered
add_action( 'elementor/widgets/widgets_registered', function() {

  require_once('widget.php');

  $my_widget = new From_Posts_Widget();

  // Let Elementor know about our widget
  Plugin::instance()->widgets_manager->register_widget_type( $my_widget );

}); 