<?php
namespace From_Posts;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class From_Posts_Widget extends Widget_Base {

  public static $slug = 'from-posts';

  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-posts-style', 
      plugins_url( 'assets/css/posts.css', __FILE__ ), 
      array(), 
      '1.0'
    );
    wp_enqueue_style('from-posts-style');

    wp_register_script('from-posts-js', plugins_url('assets/js/posts.js', __FILE__), array('jquery'), '1.0', true);  
    wp_localize_script( 'from-posts-js', 'scriptData', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ))); 
    wp_enqueue_script('from-posts-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Posts', self::$slug); }

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

    $this->add_responsive_control(
      'from-posts-widget-columns',
      [
        'label' => __( 'Limit', self::$slug ),
        'type' => Controls_Manager::NUMBER
      ]
    );

    $this->add_control(
      'from-posts-widget-order-by',
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
    'from-posts-widget-order',
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
    $category_id = $settings['from-posts-category'];
    $postsPerPage = $settings['from-posts-widget-columns'];
    $orderBy = $settings['from-posts-widget-order-by'];
    $order = $settings['from-posts-widget-order'];
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

    <div class="from-posts from-posts-wrapper">
      <?php if($posts):?>
      <div class="from-posts-inner post-list">
        <?php foreach ($posts as $post): ?>
            <?php 
              $post_image_url = get_the_post_thumbnail_url($post->ID, 'full');
              $post_date_year = date( 'Y', strtotime($post->post_date));
              $post_date_month = date( 'F', strtotime($post->post_date));
              $post_date_day = $nf->format(date( 'd', strtotime($post->post_date) ));
              $post_date = $post_date_month . ' ' . $post_date_day . ', ' . $post_date_year;
            ?>
            <div class="from-posts--item">
              <a href="<?= get_permalink($post->ID);?>" class="from-posts--image" style="background-image:url(<?php echo $post_image_url;?>);" target="_blank" ></a> 
              <div class="from-posts--details">
                <h3 class="from-posts--title"><a href="<?= get_permalink($post->ID); ?>" target="_blank" ><?= $post->post_title; ?></a></h3>
                <?php if($show_date_field === "yes"):?>
                  <p class="from-posts--date"><?=$post_date;?> </p>
                <?php endif;?>
                <a href="<?= get_permalink($post->ID); ?>" target="_blank" class="from-posts--link btn-from btn-from-link">
                  <span> Find out more </span>
                  <span class="line"></span>
                </a>
              </div>
            </div>
        <?php endforeach;?>
      </div>
      <?php endif; ?>
      <div class="from-posts-load-more">
        <button class="btn-load-more" data-page="1"> Load More </button>
      </div>
    </div>

  <?php }

} 