<?php
namespace From_Posts_Category;

use Elementor\Plugin;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class From_Posts_Category_Widget extends Widget_Base {

  public static $slug = 'from-posts-category';

  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-posts-category-style', 
      plugins_url( 'assets/css/posts-category.css', __FILE__ ), 
      array(), 
      '1.0'
    );
    wp_enqueue_style('from-posts-category-style');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Posts Category', self::$slug); }

  public function get_icon() { return 'eicon-wordpress'; }

  public function get_categories() { return [ 'general' ]; }

  protected function _register_controls() {


    $this->start_controls_section(
      'content_section',
      [
        'label' => __( 'Options', self::$slug ),
        'tab' => Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->end_controls_section();

  
  }

  protected function render() {

    $post_id = get_the_ID();
    $post_categories = [];

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } 

    if($post_id){
      
      $post_categories = wp_get_post_categories( $post_id );
    
    ?>

    <ul class="from-posts-category from-posts-category-wrapper">
      <?php if($post_categories):
        foreach ($post_categories as $post_category_id): ?>
          <?php 
          ?>
          <li class="from-posts--item">
           <?=get_cat_name($post_category_id);?>
          </li>
        <?php endforeach;
      endif; ?>
    </ul>

  <?php 

    }  else {
    ?>

    <?php 
    }
  
  }

} 