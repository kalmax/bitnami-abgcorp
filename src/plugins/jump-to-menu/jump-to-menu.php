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
use Carbon_Fields\Container;
use Carbon_Fields\Field;

use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


require_once(ABSPATH . '/wp-content/plugins/carbon-fields/vendor/autoload.php' );

// Define the url where Carbon Fields assets will be enqueued from
define( 'Carbon_Fields\URL', plugins_url() . '/carbon-fields/vendor/htmlburger/carbon-fields/' );

\Carbon_Fields\Carbon_Fields::boot();

// The Widget_Base class is not available immediately after plugins are loaded, so
// we delay the class' use until Elementor widgets are registered
add_action( 'elementor/widgets/widgets_registered', function() {

  require_once('widget.php');

  $my_widget = new Jump_To_Menu_Widget();

  // Let Elementor know about our widget
  Plugin::instance()->widgets_manager->register_widget_type( $my_widget );

}); 

/*
  Auto load carbon fields plugin
*/

/*
  Create carbon fields - fields
*/
add_action( 'carbon_fields_register_fields', function(){

   Container::make( 'post_meta', 'Jump to Sections' )
      ->where( 'post_type', '=', 'page' )
      ->add_fields( array(
          Field::make( 'complex', 'crb_jump_to_sections' , 'Sections' )->add_fields( array(
              Field::make( 'text', 'title' , 'Title' )->set_required( true ),
              Field::make( 'text', 'id', 'ID' )->set_required( true ),
          )),
      ));

});

