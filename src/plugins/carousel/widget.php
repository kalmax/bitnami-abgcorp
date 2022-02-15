<?php
namespace From_Carousel;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Carousel_Widget extends Widget_Base {

  public static $slug = 'from-carousel';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    wp_register_style( 'from-carousel-slick', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css', '', '1.8.1');
    wp_register_style( 'from-carousel-slick-theme', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css', '', '1.8.1');
    wp_register_style( 'from-carousel-style', 
      plugins_url( 'assets/css/carousel.css', __FILE__ ), 
      array( 
          'from-carousel-slick', 'from-carousel-slick-theme' 
      ), 
      '1.0'
    );
    wp_enqueue_style('from-carousel-slick');
    wp_enqueue_style('from-carousel-slick-theme');
    wp_enqueue_style('from-carousel-style');

    wp_register_script('from-carousel-slick-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', array( 'jquery' ), '1.8.1', true);
    wp_enqueue_script('from-carousel-slick-js');

    wp_register_script('from-carousel-js', plugins_url('assets/js/carousel.js', __FILE__), array( 'jquery' ), '1.0', true);  
    wp_enqueue_script('from-carousel-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Carousel', self::$slug); }

  public function get_icon() { return 'eicon-image'; }

  public function get_categories() { return [ 'general' ]; }

  protected function _register_controls() {


    $this->start_controls_section(
      'content_section',
      [
        'label' => __( 'Options', self::$slug ),
        'tab' => Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_group_control(
      Group_Control_Background::get_type(),
      [
        'name' => 'background',
        'label' => __( 'Background', self::$slug ),
        'types' => [ 'classic', 'gradient', 'video' ],
        'selector' => '{{WRAPPER}} .wrapper',
      ]
    );

    $this->add_responsive_control(
      'slides',
      [
        'label' => __( 'Slides', self::$slug ),
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


    $this->add_responsive_control(
      'slides_to_scroll',
      [
        'label' => __( 'Slides to scroll', self::$slug ),
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
        'mobile_default' => '2'
      ]
    );


    $this->add_control(
      'gallery',
      [
        'label' => __( 'Add Images', self::$slug ),
        'type' => Controls_Manager::GALLERY,
        'default' => [],
      ]
    );

    $this->end_controls_section();

  
  }

  protected function render() {

    $settings = $this->get_settings_for_display();

    $gallery = $settings['gallery'];
    $background_color = $settings['background_color'];
    $slides = $settings['slides'];
    $slides_tablet = isset($settings['slides_tablet']) ? $settings['slides_tablet'] : $slides;
    $slides_mobile = isset($settings['slides_mobile']) ? $settings['slides_mobile'] : $slides_tablet;
    $slides_to_scroll = isset($settings['slides_to_scroll']) ? $settings['slides_to_scroll'] : 1;
    $slides_to_scroll_mobile = isset($settings['slides_to_scroll_mobile']) ? $settings['slides_to_scroll_mobile'] : $slides_to_scroll;

    // echo '<pre>';
    // var_dump($settings);
    // exit();
    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>
    <div class="wrapper">
      <div class="from-carousel from-carousel-wrapper">
        <div 
          class="from-carousel-container" 
          data-slides="<?=$slides;?>" 
          data-slidesMobile="<?=$slides_mobile;?>"
        >
          <?php if($gallery):
            foreach ($gallery as $image): ?>
              <div class="from-carousel--image">
                <?= '<img src="' . $image['url'] . '">';?>
              </div>
            <?php endforeach;
          endif; ?>
        </div>
      </div>
    </div>
  <?php }

} 