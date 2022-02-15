<?php
namespace From_Back_Button;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Back_Button_Widget extends Widget_Base {

  public static $slug = 'from-back-button';

  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    wp_register_style( 'from-back-button-style', 
      plugins_url( 'assets/css/back-button.css', __FILE__ ), 
      array(), 
      '1.0'
    );

    wp_enqueue_style('from-back-button-style');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Back Button', self::$slug); }

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

    $this->end_controls_section();

  }

  protected function render() {

    global $post;

    $settings = $this->get_settings_for_display();
    $button_theme = $settings['button_theme'] ? $settings['button_theme'] : '';

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>
    <div class="wrapper">
      <?php if ( $post->post_parent ) { ?>
      <a href="<?php echo get_permalink( $post->post_parent ); ?>" class="btn-back-from <?=$button_theme;?>">
        <i class="fas fa-chevron-left"></i>
        <span> Back to <?php echo get_the_title( $post->post_parent ); ?> </span>
      </a>
      <?php } ?>
    </div>
  <?php }

} 