<?php
namespace Posts_Tabs;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Posts_Tabs_Widget extends Widget_Base {

  public static $slug = 'posts-tabs';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-posts-tabs-style', 
      plugins_url( 'assets/css/posts-tabs.css', __FILE__ ), 
      array( 
          'from-carousel-slick', 'from-carousel-slick-theme' 
      ), 
      '1.0'
    );
    wp_enqueue_style('from-posts-tabs-style');

   
    wp_register_script('from-posts-tabs-js', plugins_url('assets/js/posts-tabs.js', __FILE__), array( 'from-carousel-slick-js' ), '1.0', true);  
    wp_enqueue_script('from-posts-tabs-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('Posts Tabs', self::$slug); }

  public function get_icon() { return 'eicon-slider-push'; }

  public function get_categories() { return [ 'general' ]; }

  protected function _register_controls() {


    $this->start_controls_section(
      'content_section',
      [
        'label' => __( 'Options', self::$slug ),
        'tab' => Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_control(
      'from-posts-tabs-post-type',
      [
        'label' => esc_html__( 'Post Type', self::$slug ),
        'type' => \Elementor\Controls_Manager::TEXT,
        'default' => esc_html__( 'post', self::$slug ),
        'placeholder' => esc_html__( 'Type your post type here', self::$slug ),
      ]
    );

     $this->add_control(
      'from-posts-tabs-tags',
      [
        'label' => __( 'Tags', self::$slug ),
        'type' => Controls_Manager::TEXT
      ]
    );

    $this->add_control(
      'from-posts-tabs-order-by',
      [
        'label' => __( 'Order By', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'rand',
        'options' => [
          'name' => 'name',
          'title' => 'title',
          'date' => 'date',
          'rand' => 'rand'
        ]
      ]
    );

    $this->add_control(
    'from-posts-tabs-order',
      [
        'label' => __( 'Order', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'DESC',
        'options' => [
          'ASC' => 'ASC',
          'DESC' => 'DESC',
        ]
      ]
    );


    $this->end_controls_section();

  
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $postType = $settings['from-posts-tabs-post-type'];
    $postTags = $settings['from-posts-tabs-tags'];
    $orderBy = $settings['from-posts-tabs-order-by'];
    $order = $settings['from-posts-tabs-order'];

    
    $args = array(
      'post_type' => $postType, 
      'post_status' => array('private', 'publish'),
      'tag' => $postTags,
      'posts_per_page' => 3,
      'orderby' => $orderBy,
      'order' => $order
    );

    $postsQuery = new \WP_Query($args);
    $posts = $postsQuery->posts;

    // echo '<pre>';
    // var_dump($args);

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-posts-tabs from-posts-tabs-wrapper">

      <div class="from-posts-tabs-container from-posts-tabs-container-desktop">
        <div class="tab-links">
          <?php if($posts):?>
            <?php $tabId=0; ?>
            <?php foreach ($posts as $post): ?>
              <a href="" class="tab-link" id="posts-tabs-nav-<?=$tabId;?>" item="<?=$tabId;?>"><?= $post->post_title; ?></a>
              <?php $tabId++; ?>
            <?php endforeach;?>
          <?php endif;?>
        </div>
        <div class="tab-marker">
          <div class="marker"></div>
        </div>
        <div class="tab-contents">
          <?php if($posts):?>
            <?php $tabItemId=0; ?>
            <?php foreach ($posts as $post): ?>
              <div class="tab-contents-item" id="posts-tabs-content-<?= $tabItemId;?>">
                <div class="col col-image">
                  <div class="thumbnail" style="background-image:url(<?= get_the_post_thumbnail_url($post->ID); ?>)"></div>
                </div>
                <div class="col col-details">
                  <h3 class="title"> <?= $post->post_title;?> </h3>
                  <p class="excerpt"> <?= $post->post_excerpt;?> </p>
                </div>
              </div>
              <?php $tabItemId++;?>
            <?php endforeach;?>
          <?php endif; ?>
        </div>
      </div>
      
      <div class="from-posts-tabs-container-mobile">
        <div class="tab-contents-mobile">
          <?php if($posts):?>
            <?php foreach ($posts as $post): ?>
              <div class="tab-contents-mobile-item">
                <h3 class="title"> <?= $post->post_title;?> </h3>
                <div class="thumbnail" style="background-image:url(<?= get_the_post_thumbnail_url($post->ID); ?>)"></div>
                <p class="excerpt"> <?= $post->post_excerpt;?> </p>
              </div>
            <?php endforeach;?>
          <?php endif; ?>
        </div>
      </div>
    </div>

  <?php 
  }

} 