<?php
namespace Featured_Image;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Featured_Image_Widget extends Widget_Base {

  public static $slug = 'featured-image';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-featured-image-style', 
      plugins_url( 'assets/css/featured-image.css', __FILE__ ), 
      array(), 
      '1.0'
    );
    wp_enqueue_style('from-featured-image-style');

    wp_register_script('from-featured-image-js', plugins_url('assets/js/featured-image.js', __FILE__), array(), '1.0', true);  
    wp_enqueue_script('from-featured-image-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('Featured Image', self::$slug); }

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

    $this->end_controls_section();

  
  }

  protected function render() {

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>
    <div class="from-featured-image from-featured-image-wrapper">
      <?php 
        $post_thumbnail_url = get_the_post_thumbnail_url(get_the_ID());
      ?>
        <div class="from-featured-image--inner"
          style="background-image:url('<?php echo $post_thumbnail_url;?>')"
        ></div>
    </div>
  <?php }

} 