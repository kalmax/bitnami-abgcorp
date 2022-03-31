<?php
namespace Posts_Filter;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Posts_Filter_Widget extends Widget_Base {

  public static $slug = 'posts-filter';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-posts-filter-style', 
      plugins_url( 'assets/css/posts-filter.css', __FILE__ ), 
      array( 
          'from-carousel-slick', 'from-carousel-slick-theme' 
      ), 
      '1.0'
    );
    wp_enqueue_style('from-posts-filter-style');

    wp_register_script('from-posts-filter-js', plugins_url('assets/js/posts-filter.js', __FILE__), array('jquery'), '1.0', true);  
    wp_localize_script( 'from-posts-filter-js', 'scriptData', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ))); 
    wp_enqueue_script('from-posts-filter-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Posts Filter', self::$slug); }

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
      'from-posts-filter-title',
      [
        'label' => __( 'Filter Title', self::$slug ),
        'type' => Controls_Manager::TEXT,
        'default' => 'Filter Title'
      ]
    );

    $this->add_control(
      'from-posts-parent-category',
      [
        'label' => __( 'Parent Category', self::$slug ),
        'type' => Controls_Manager::SELECT,
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
          'title' => 'Title',
          'date' => 'Date'
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

    $this->add_responsive_control(
      'from-posts-limit',
      [
        'label' => __( 'Limit', self::$slug ),
        'type' => Controls_Manager::NUMBER,
        'devices' => [ 'desktop', 'tablet', 'mobile' ],
        'desktop_default' => '3',
        'tablet_default' => '2',
        'mobile_default' => '1'
      ]
    );
    
    $this->add_control(
      'show_category_filter',
      [
        'label' => esc_html__( 'Show Category Filter', self::$slug ),
        'type' => \Elementor\Controls_Manager::SWITCHER,
        'label_on' => esc_html__( 'Show', self::$slug ),
        'label_off' => esc_html__( 'Hide', self::$slug ),
        'return_value' => 'yes',
        'default' => 'no',
      ]
    );

    $this->add_control(
      'show_year_filter',
      [
        'label' => esc_html__( 'Show Year Filter', self::$slug ),
        'type' => \Elementor\Controls_Manager::SWITCHER,
        'label_on' => esc_html__( 'Show', self::$slug ),
        'label_off' => esc_html__( 'Hide', self::$slug ),
        'return_value' => 'yes',
        'default' => 'no',
      ]
    );

    $this->add_control(
      'show_month_filter',
      [
        'label' => esc_html__( 'Show Month Filter', self::$slug ),
        'type' => \Elementor\Controls_Manager::SWITCHER,
        'label_on' => esc_html__( 'Show', self::$slug ),
        'label_off' => esc_html__( 'Hide', self::$slug ),
        'return_value' => 'yes',
        'default' => 'no',
      ]
    );

    $this->end_controls_section();

  }

  protected function get_posts_years_array() {
      global $wpdb;
      $result = array();
      $years = $wpdb->get_results(
        $wpdb->prepare(
          "SELECT YEAR(post_date) FROM {$wpdb->posts} WHERE post_status = 'publish' GROUP BY YEAR(post_date) ASC"
        ),
        ARRAY_N
      );
      if ( is_array( $years ) && count( $years ) > 0 ) {
        foreach ( $years as $year ) {
          $result[] = $year[0];
        }
      }
      return $result;
  }

  protected function get_posts_months_array() {

      global $wpdb;

      $months_ref = array(
        1 => "January",
        2 => "February",
        3 => "March",
        4 => "April",
        5 => "May",
        6 => "June",
        7 => "July",
        8 => "August",
        9 => "September",
        10 => "October",
        11 => "November",
        12 => "December"
      );

      $result = array();
      $months = $wpdb->get_results(
        $wpdb->prepare(
          "SELECT MONTH( post_date ) AS month FROM {$wpdb->posts} WHERE post_status = 'publish' GROUP BY MONTH(post_date) ASC"
        ),
        ARRAY_N
      );
      if ( is_array( $months ) && count( $months ) > 0 ) {
        foreach ( $months as $month ) {
          $result[$month[0]] = $months_ref[$month[0]];
        }
      }
      return $result;
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $filter_title = $settings['from-posts-filter-title'];
    $category_id = $settings['from-posts-parent-category'] ? $settings['from-posts-parent-category'] : false;
    $orderBy = $settings['from-posts-order-by'];
    $order = $settings['from-posts-order'] ? $settings['from-posts-order'] : 3;
    $limit = $settings['from-posts-limit'];
    $show_category_filter = $settings['show_category_filter'];
    $show_year_filter = $settings['show_year_filter'];
    $show_month_filter = $settings['show_month_filter'];

    $args = array(
      'post_type' => 'post', 
      'post_status' => 'publish',
      'orderby' => $orderBy,
      'order' => $order,
      'posts_per_page'=> $limit
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

    $categories_options = [];

    $categories = get_categories( array(
      'parent' => $category_id,
      'orderby' => $orderBy,
      'order'   => $order,
      'hide_empty' => true
    ));

    $nonce = wp_create_nonce("from_post_filter_nonce");

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-posts-filter from-posts-filter-wrapper">
      <div class="from-posts-filter-container" data-limit="<?=$limit;?>">
        <div class="header">
          <div class="col col-1">
            <h3 class="title"> <?=$filter_title;?></h3>
          </div>
          <div class="col col-2">
            <?php if($show_category_filter === "yes"):?>
              <select id="from-posts-filter-select-category" data-nonce="<?=$nonce;?>">
                <option value=""> Category</option>
                <?php foreach ( $categories as $category ):?>
                  <option value="<?=$category->term_id;?>"><?=$category->name;?></option>
                <?php endforeach; ?>
              </select>
            <?php endif;?>
            <?php if($show_year_filter === "yes"):?>
            <select id="from-posts-filter-select-year" data-nonce="<?=$nonce;?>">
              <option value=""> Year </option>
              <?php foreach ( self::get_posts_years_array() as $year ):?>
               <option value="<?=$year;?>"><?=$year;?></option>
              <?php endforeach; ?>
            </select>
            <?php endif;?>
            <?php if($show_month_filter === "yes"):?>
            <select id="from-posts-filter-select-month" data-nonce="<?=$nonce;?>">
              <option value=""> Month </option>
              <?php foreach ( self::get_posts_months_array() as $month_key => $month ):?>
               <option value="<?=$month_key;?>"><?=$month;?></option>
              <?php endforeach; ?>
            </select>
            <?php endif;?>
          </div>
        </div>
        <div class="body">
          <?php if($posts):
            foreach ($posts as $post): ?>
              <?php 
                $post_image_url = get_the_post_thumbnail_url($post->ID, 'full');
              ?>
              <div class="from-posts-filter--item-wrapper">
                <a href="<?= get_permalink($post->ID);?>" class="from-posts-filter--image" style="background-image:url(<?php echo $post_image_url;?>);" target="_blank" ></a> 
                <div class="from-posts-filter--details">
                  <h3 class="from-posts-filter--title"><a href="<?= get_permalink($post->ID); ?>" target="_blank" ><?= $post->post_title; ?></a></h3>
                  <p class="from-posts-filter--description"><?= $post->post_excerpt; ?></p>
                  <a href="<?= get_permalink($post->ID); ?>" target="_blank" class="from-posts-filter--link btn-from btn-from-link">
                    <span style="text-transform:capitalize"> Find out more </span>
                    <span class="line"></span>
                  </a>
                </div>
              </div>
            <?php endforeach;?>
          <?php endif; ?>
        </div>
        
      </div>
    </div>

  <?php }

} 