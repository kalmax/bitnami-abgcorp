<?php
namespace From_Tabs;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class From_Tabs_Widget extends Widget_Base {

  public static $slug = 'from-tabs';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-tabs-style', 
      plugins_url( 'assets/css/from-tabs.css', __FILE__ ), 
      array( 
          'from-carousel-slick', 'from-carousel-slick-theme' 
      ), 
      '1.0'
    );
    wp_enqueue_style('from-tabs-style');

   
    wp_register_script('from-tabs-js', plugins_url('assets/js/from-tabs.js', __FILE__), array( 'from-carousel-slick-js' ), '1.0', true);  
    wp_enqueue_script('from-tabs-js');

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
      'excerpt', [
        'label' => esc_html__( 'Excerpt', self::$slug ),
        'type' => \Elementor\Controls_Manager::WYSIWYG,
        'default' => esc_html__( 'Excerpt' , self::$slug ),
        'show_label' => false,
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

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-tabs from-tabs-wrapper">

      <div class="from-tabs-container from-tabs-container-desktop">
        <div class="tab-links">
          <?php if($settings["tabs"]):?>
            <?php $tabId=0; ?>
            <?php foreach ($settings["tabs"] as $tab): ?>
              <div class="tab-link" id="from-tabs-nav-<?=$tabId;?>" item="<?=$tabId;?>"><?= $tab['title']; ?></div>
              <?php $tabId++; ?>
            <?php endforeach;?>
          <?php endif;?>
        </div>
        <div class="tab-indicator">
          <div class="indicator"></div>
        </div>
        <div class="tab-contents">
          <?php if($settings['tabs']):?>
            <?php $tabItemId=0; ?>
            <?php foreach ($settings['tabs'] as $tab): ?>
              <div class="tab-contents-item" id="from-tabs-content-<?= $tabItemId;?>">
                <div class="col col-image">
                  <div class="thumbnail" style="background-image:url(<?= $tab['image']['url'];?>)"></div>
                </div>
                <div class="col col-details">
                  <h3 class="title"> <?= $tab['title'];?> </h3>
                  <div class="content"> <?= $tab['content'];?></div>
                </div>
              </div>
              <?php $tabItemId++;?>
            <?php endforeach;?>
          <?php endif; ?>
        </div>
      </div>
      
      <div class="from-tabs-container-mobile">
        <div class="tab-contents-mobile">
          <?php if($settings["tabs"]):?>
            <?php foreach ($settings["tabs"] as $tab): ?>
              <div class="tab-contents-mobile-item">
                <h3 class="title"> <?= $tab['title'];?> </h3>
                <div class="thumbnail" style="background-image:url(<?= $tab['image']['url']; ?>)"></div>
                <div class="excerpt"> <?= $tab['excerpt'];?> </div>
                <?php if($tab['content']) :?>
                  <div class="content collapsed"> <?= $tab['content'];?> </div>
                  <a href="#" class="read-more">Read More</a>
                <?php endif;?>
              </div>
            <?php endforeach;?>
          <?php endif; ?>
        </div>
      </div>

    </div>

  <?php 
  }

} 