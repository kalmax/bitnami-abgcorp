<?php
/**
 * Plugin Name: FROM Posts Filter
 * Description: A widget that accepts posts filter queries and display it in a specific layout
 * Plugin URI:  https://www.from.digital
 * Version:     1.0.0
 * Author:      Sylvester Molina
 * Author URI:  https://www.from.digital
 * Text Domain: posts-filter
 */
namespace Posts_Filter;

use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// The Widget_Base class is not available immediately after plugins are loaded, so
// we delay the class' use until Elementor widgets are registered
add_action( 'elementor/widgets/widgets_registered', function() {

  require_once('widget.php');

  $my_widget = new Posts_Filter_Widget();

  // Let Elementor know about our widget
  Plugin::instance()->widgets_manager->register_widget_type( $my_widget );

}); 

add_action('wp_ajax_from_posts_filter', __NAMESPACE__ . '\\from_posts_filter');
add_action('wp_ajax_nopriv_from_posts_filter', __NAMESPACE__ . '\\from_posts_filter');

function from_posts_filter(){

  if ( !wp_verify_nonce( $_POST['nonce'], "from_post_filter_nonce")) {
    exit("Prohibited");
  }   

  $category_id = $_POST['category_id'];
  $year = $_POST['year'];
  $month = $_POST['month'];
  $limit = $_POST['limit'];

  $args = array(
    'post_type' => 'post',
    'posts_per_page' => $limit,
    'date_query' => array(),
  );

  if($year){
    $args['date_query'][0]['year'] = $year;
  }

  if($month){
    $args['date_query'][0]['month'] = $month;
  }

  if($category_id) {
    $args['tax_query'] = array(
      array(
        'taxonomy' => 'category',
        'field'    => 'id',
        'terms'    => $category_id
      )
    );
  }

  $query = new \WP_Query($args);
  $results = [];

  if($query->have_posts()){

    $posts = (array) $query->posts;

    for ($i=0; $i < count($posts) ; $i++) { 
      $post_item = (array) $posts[$i];
      $post_item['featured_image_thumbnail'] = get_the_post_thumbnail_url( $post_item['ID'], 'thumbnail' );
      $post_item['page_url'] = get_permalink($post_item['ID']);
      $results[] = $post_item;
    }

  }

  echo json_encode($results);

  die();

}