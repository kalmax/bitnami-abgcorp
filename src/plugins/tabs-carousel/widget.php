<?php
namespace From_Tabs_Carousel;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Tabs_Carousel_Widget extends Widget_Base {

  public static $slug = 'from-tabs-carousel';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    wp_register_style( 'from-tabs-carousel-style', 
      plugins_url( 'assets/css/from-tabs-carousel.css', __FILE__ ), 
      array( 
          'from-carousel-slick', 'from-carousel-slick-theme' 
      ), 
      '1.0'
    );
    wp_enqueue_style('from-tabs-carousel-style');

   
    wp_register_script('from-tabs-carousel-js', plugins_url('assets/js/from-tabs-carousel.js', __FILE__), array( 'from-carousel-slick-js' ), '1.0', true);  
    wp_enqueue_script('from-tabs-carousel-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Tabs Carousel', self::$slug); }

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
          '4' => '4'
        ],
        'devices' => [ 'desktop', 'tablet', 'mobile' ],
        'desktop_default' => '3',
        'tablet_default' => '3',
        'mobile_default' => '1'
      ]
    );

    $repeater = new \Elementor\Repeater();

    $repeater->add_control(
      'title', [
        'label' => esc_html__( 'Title', self::$slug ),
        'type' => \Elementor\Controls_Manager::TEXT,
        'default' => esc_html__( 'Title' , self::$slug ),
        'label_block' => true,
      ]
    );

    $repeater->add_control(
      'image',
      [
        'label' => esc_html__( 'Choose Image', self::$slug ),
        'type' => \Elementor\Controls_Manager::MEDIA,
        'default' => [
          'url' => \Elementor\Utils::get_placeholder_image_src(),
        ],
      ]
    );


    $repeater->add_control(
      'content', [
        'label' => esc_html__( 'Content', self::$slug ),
        'type' => \Elementor\Controls_Manager::WYSIWYG,
        'default' => esc_html__( 'Content' , self::$slug ),
        'show_label' => false,
      ]
    );

    $this->add_control(
      'tabs',
      [
        'label' => esc_html__( 'Tabs', self::$slug ),
        'type' => \Elementor\Controls_Manager::REPEATER,
        'fields' => $repeater->get_controls(),
        'title_field' => '{{{ title }}}',
      ]
    );

    $this->end_controls_section();

  
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $slides = $settings['slides'];
    $slides_tablet = isset($settings['slides_tablet']) ? $settings['slides_tablet'] : $slides;
    $slides_mobile = isset($settings['slides_mobile']) ? $settings['slides_mobile'] : $slides_tablet;
    $tabs = $settings['tabs'];
    // echo '<pre>';
    // var_dump($settings);
    // exit();
    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>
    <div class="wrapper">
      <div class="from-tabs-carousel from-tabs-carousel-wrapper">
        <div class="from-tabs-carousel-container">
          <div 
            class="from-tabs-carousel-list"
            data-slides="<?=$slides;?>" 
            data-slidesTablet="<?=$slides_tablet;?>" 
            data-slidesMobile="<?=$slides_mobile;?>"
          >
            <?php if($tabs):?>
            <?php $tabLinkItemId=0;?>
            <?php foreach ($tabs as $tab): ?>
              <a href="#" class="from-tabs-carousel-list--item <?php echo $tabLinkItemId === 0 ? 'active' : '';?>">
                <?= '<img src="' . $tab['image']['url'] . '">';?>
              </a>
              <?php $tabLinkItemId++;?>
            <?php endforeach;?>
          <?php endif; ?>
          </div>
          <div class="from-tabs-carousel-contents">
            <?php if($tabs):?>
            <?php $tabItemId=0;?>
            <?php foreach ($tabs as $tab): ?>
              <div href="#" class="from-tabs-carousel-contents--item <?php echo $tabItemId === 0 ? 'active' : '';?>" id="from-tabs-carousel-content-<?= $tabItemId;?>">  
                <?=do_shortcode($tab['content']);?>
              </div>
              <?php $tabItemId++;?>
            <?php endforeach;?>
            <?php $tabItemId=count($tabs);?>
            <?php foreach ($tabs as $tab): ?>
              <div href="#" class="from-tabs-carousel-contents--item <?php echo $tabItemId === 0 ? 'active' : '';?>" id="from-tabs-carousel-content-<?= $tabItemId;?>">  
                <?=do_shortcode($tab['content']);?>
              </div>
              <?php $tabItemId++;?>
            <?php endforeach;?>
          <?php endif; ?>
          </div>

        </div>
      </div>
    </div>
  <?php }

} 