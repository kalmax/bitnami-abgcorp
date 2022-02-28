<?php
namespace Posts_Carousel;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Posts_Carousel_Widget extends Widget_Base {

  public static $slug = 'posts-carousel';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-posts-carousel-style', 
      plugins_url( 'assets/css/posts-carousel.css', __FILE__ ), 
      array( 
          'from-carousel-slick', 'from-carousel-slick-theme' 
      ), 
      '1.0'
    );
    wp_enqueue_style('from-posts-carousel-style');

   
    wp_register_script('from-posts-carousel-js', plugins_url('assets/js/posts-carousel.js', __FILE__), array( 'from-carousel-slick-js' ), '1.0', true);  
    wp_enqueue_script('from-posts-carousel-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('Posts Carousel', self::$slug); }

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

    $this->add_responsive_control(
      'from-posts-columns',
      [
        'label' => __( 'Columns', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => '3',
        'options' => [
          '1' => '1',
          '2' => '2',
          '3' => '3',
          '4' => '4',
        ],
        'devices' => [ 'desktop', 'tablet', 'mobile' ],
        'desktop_default' => '3',
        'tablet_default' => '3',
        'mobile_default' => '1'
      ]
    );

    $this->add_control(
      'from-posts-order-by',
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
    'from-posts-order',
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
    $postsPerPage = $settings['from-posts-columns'];
    $postsPerPageTablet = isset($settings['from-posts-columns_tablet']) ? $settings['from-posts-columns_tablet'] : $postsPerPage;
    $postsPerPageMobile = isset($settings['from-posts-columns_mobile']) ? $settings['from-posts-columns_mobile'] : 1;
    $orderBy = $settings['from-posts-order-by'];
    $order = $settings['from-posts-order'];

    // echo '<pre>';
    // var_dump($settings);
    // exit();

    $args = array(
      'post_type' => 'post', 
      'post_status' => 'publish',
      'posts_per_page' => $postsPerPage,
      'orderby' => $orderBy,
      'order' => $order
    );

    $postsQuery = new \WP_Query($args);
    $posts = $postsQuery->posts;

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-posts-carousel from-posts-carousel-wrapper">
      <div 
        class="from-posts-carousel-container"
        data-columns="<?=$postsPerPage;?>"
        data-columnstablet="<?=$postsPerPageTablet;?>"
        data-columnsmobile="<?=$postsPerPageMobile;?>"
        >
        <?php if($posts):
          foreach ($posts as $post): ?>
            <?php 
              $post_image_url = get_the_post_thumbnail_url($post->ID, 'full');
            ?>
            <div class="from-posts-carousel--item-wrapper">
              <a href="<?= get_permalink($post->ID);?>" class="from-posts-carousel--image" style="background-image:url(<?php echo $post_image_url;?>);" target="_blank" ></a> 
              <div class="from-posts-carousel--details">
                <h3 class="from-posts-carousel--title"><a href="<?= get_permalink($post->ID); ?>" target="_blank" ><?= $post->post_title; ?></a></h3>
                <p class="from-posts-carousel--description"><?= $post->post_excerpt; ?></p>
                <a href="<?= get_permalink($post->ID); ?>" target="_blank" class="from-posts-carousel--link btn-from btn-from-link">
                  <span style="text-transform:capitalize"> Find out more </span>
                  <span class="line"></span>
                </a>
              </div>
            </div>
          <?php endforeach;
        endif; ?>
      </div>
    </div>

  <?php }

} 