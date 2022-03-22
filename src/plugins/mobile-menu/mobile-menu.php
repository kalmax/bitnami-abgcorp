<?php
/**
 * Plugin Name: FROM Mobile  Menu
 * Description: A simple Elementor Widget that lets you display mobile menu based on WP Menu settings
 * Plugin URI:  https://www.from.digital
 * Version:     1.0.0
 * Author:      Sylvester Molina
 * Author URI:  https://www.from.digital
 * Text Domain: mobile-menu
 */
namespace Mobile_Menu;

use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// Define the url where Carbon Fields assets will be enqueued from
define( 'Carbon_Fields\URL', plugins_url() . '/carbon-fields/vendor/htmlburger/carbon-fields/' );

\Carbon_Fields\Carbon_Fields::boot();

// The Widget_Base class is not available immediately after plugins are loaded, so
// we delay the class' use until Elementor widgets are registered
add_action( 'elementor/widgets/widgets_registered', function() {

  require_once('widget.php');

  $my_widget = new Mobile_Menu_Widget();

  // Let Elementor know about our widget
  Plugin::instance()->widgets_manager->register_widget_type( $my_widget );

}); 