<?php
/**
 * Plugin Name: FROM Jump To Menu
 * Description: A simple Elementor Widget that lets you create jump to menu for Elementor sections
 * Plugin URI:  https://www.from.digital
 * Version:     1.0.0
 * Author:      Sylvester Molina
 * Author URI:  https://www.from.digital
 * Text Domain: jump-to-menu
 */
namespace Jump_To_Menu;

use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// The Widget_Base class is not available immediately after plugins are loaded, so
// we delay the class' use until Elementor widgets are registered
add_action( 'elementor/widgets/widgets_registered', function() {

  require_once('widget.php');

  $my_widget = new Jump_To_Menu_Widget();

  // Let Elementor know about our widget
  Plugin::instance()->widgets_manager->register_widget_type( $my_widget );

}); 