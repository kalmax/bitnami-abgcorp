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


    // get current list of categories
    $categories_options = [];

    $categories = get_categories( array(
      'orderby' => 'name',
      'order'   => 'ASC',
      'hide_empty' => false
    ));

    foreach ( $categories as $category ) {
      $categories_options[$category->term_id] = $category->name;
    }


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
        'label' => __( 'Items to Show', self::$slug ),
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
      'from-posts-category',
      [
        'label' => __( 'Category', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'rand',
        'options' => $categories_options
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


    $this->add_control(
      'show_date',
      [
        'label' => esc_html__( 'Show Date', self::$slug ),
        'type' => \Elementor\Controls_Manager::SWITCHER,
        'label_on' => esc_html__( 'Show', self::$slug ),
        'label_off' => esc_html__( 'Hide', self::$slug ),
        'return_value' => 'yes',
        'default' => 'no',
      ]
    );

    $this->end_controls_section();

  
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $category_id = $settings['from-posts-category'] ? $settings['from-posts-category'] : false;
    $postsPerPage = $settings['from-posts-columns'];
    $postsPerPageTablet = isset($settings['from-posts-columns_tablet']) ? $settings['from-posts-columns_tablet'] : $postsPerPage;
    $postsPerPageMobile = isset($settings['from-posts-columns_mobile']) ? $settings['from-posts-columns_mobile'] : 1;
    $orderBy = $settings['from-posts-order-by'];
    $order = $settings['from-posts-order'];
    $show_date_field = $settings['show_date'];

    $args = array(
      'post_type' => 'post', 
      'post_status' => 'publish',
      'posts_per_page' => $postsPerPage,
      'orderby' => $orderBy,
      'order' => $order
    );

    if($category_id) {
      $args['tax_query'] = array(
        array(
          'taxonomy' => 'category',
          'field'    => 'id',
          'terms'    => $category_id
        )
      );
    }

    $postsQuery = new \WP_Query($args);
    $posts = $postsQuery->posts;

    // number formatter
    $nf = new \NumberFormatter('en_US', \NumberFormatter::ORDINAL);

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
              $post_date_year = date( 'Y', strtotime($post->post_date));
              $post_date_month = date( 'F', strtotime($post->post_date));
              $post_date_day = $nf->format(date( 'd', strtotime($post->post_date) ));
              $post_date = $post_date_month . ' ' . $post_date_day . ', ' . $post_date_year;
            ?>
            <div class="from-posts-carousel--item-wrapper">
              <a href="<?= get_permalink($post->ID);?>" class="from-posts-carousel--image" style="background-image:url(<?php echo $post_image_url;?>);" target="_blank" ></a> 
              <div class="from-posts-carousel--details">
                <h3 class="from-posts-carousel--title"><a href="<?= get_permalink($post->ID); ?>" target="_blank" ><?= $post->post_title; ?></a></h3>
                <?php if($show_date_field === "yes"):?>
                  <p class="from-posts-carousel--date"><?=$post_date;?> </p>
                <?php endif;?>
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