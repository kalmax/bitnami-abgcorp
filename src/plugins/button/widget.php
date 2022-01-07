<?php
namespace From_Button;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Button_Widget extends Widget_Base {

  public static $slug = 'from-button';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    wp_register_style( 'from-button-style', 
      plugins_url( 'assets/css/button.css', __FILE__ ), 
      array(), 
      '1.0'
    );

    wp_enqueue_style('from-button-style');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Button', self::$slug); }

  public function get_icon() { return 'eicon-button'; }

  public function get_categories() { return [ 'general' ]; }

  protected function _register_controls() {

    $this->start_controls_section(
      'content_section',
      [
        'label' => __( 'Button', self::$slug ),
        'tab' => Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_control(
      'button_text',
      [
        'label' => __( 'Button', self::$slug ),
        'type' => Controls_Manager::TEXT,
        'default' => __( 'Text', self::$slug ),
        'placeholder' => __( 'Text here', self::$slug ),
      ]
    );

    $this->add_control(
      'button_link',
      [
        'label' => __( 'Link', self::$slug ),
        'type' => Controls_Manager::TEXT,
        'default' => __( 'https://your-link', self::$slug ),
        'placeholder' => __( 'Link here', self::$slug ),
      ]
    );

    $this->add_control(
      'button_element',
      [
        'label' => __( 'Element', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'button',
        'options' => [
          'button' => 'Button',
          'link' => 'Link'
        ]
      ]
    );

    $this->add_control(
      'button_type',
      [
        'label' => __( 'Type', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'btn-primary',
        'options' => [
          'btn-primary' => 'Primary',
          'btn-secondary' => 'Secondary'
        ]
      ]
    );

    $this->add_control(
      'button_size',
      [
        'label' => __( 'Size', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'btn-lg',
        'options' => [
          'btn-lg' => 'Large',
          'btn-md' => 'Medium',
          'btn-sm' => 'Small'
        ]
      ]
    );

    $this->add_control(
      'button_theme',
      [
        'label' => __( 'Theme', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'opaque',
        'options' => [
          'opaque' => 'Opaque',
          'light' => 'Light'
        ]
      ]
    );

     $this->add_responsive_control(
      'button_layout',
      [
        'label' => __( 'Layout', self::$slug ),
        'type' => Controls_Manager::SELECT,
        'multiple' => false,
        'default' => 'auto',
        'options' => [
          'auto' => 'Auto',
          '100%' => 'Full Width'
        ],
        'devices' => [ 'desktop', 'tablet', 'mobile' ],
        'desktop_default' => 'auto',
        'tablet_default' => 'auto',
        'mobile_default' => 'auto',
        'selectors' => [
          '{{WRAPPER}} .btn-from' => 'width: {{SIZE}};',
        ],
      ]
    );

    $this->add_responsive_control(
      'text_align',
      [
        'label' => __( 'Alignment', self::$slug ),
        'type' => Controls_Manager::CHOOSE,
        'options' => [
          'left' => [
            'title' => __( 'Left', self::$slug ),
            'icon' => 'eicon-text-align-left',
          ],
          'center' => [
            'title' => __( 'Center', self::$slug ),
            'icon' => 'eicon-text-align-center',
          ],
          'right' => [
            'title' => __( 'Right', self::$slug ),
            'icon' => 'eicon-text-align-right',
          ],
        ],
        'devices' => [ 'desktop', 'tablet', 'mobile' ],
        'desktop_default' => 'left',
        'tablet_default' => 'center',
        'mobile_default' => 'center',
        'toggle' => true,
        'selectors' => [
          '{{WRAPPER}}' => 'text-align: {{SIZE}};',
        ],
      ]
    );


    $this->end_controls_section();

  
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $button_type = $settings['button_type'];
    $button_text = $settings['button_text'];
    $button_size = $settings['button_size'];
    $button_element = $settings['button_element'];
    $button_link = $settings['button_link'];
    $button_layout = $settings['button_layout'];
    $text_align = $settings['text_align'];
    $button_theme = $settings['button_theme'] ? $settings['button_theme'] : '';

    $btn_link_class = $button_element === "link" ? "btn-from-link" : '';
    $button_type = $button_element === "link" ? '' : $button_type;

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>
    <div class="wrapper">
      <a href="<?=$button_link;?>" class="btn-from <?=$button_type;?> <?=$button_size;?> <?=$btn_link_class;?> <?=$button_theme;?>">
        <span><?=$button_text;?></span>
        <span class="line"></span>
      </a>
    </div>
  <?php }

} 