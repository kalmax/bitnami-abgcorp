<?php
namespace Jump_To_Menu;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Jump_To_Menu_Widget extends Widget_Base {

  public static $slug = 'jump-to-menu';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-jump-to-menu-style', 
      plugins_url( 'assets/css/from-jump-to-menu.css', __FILE__ ), 
      array(), 
      '1.0'
    );
    wp_enqueue_style('from-jump-to-menu-style');

    wp_register_script('from-jump-to-menu-js', plugins_url('assets/js/from-jump-to-menu.js', __FILE__), array( ), '1.0', true);  
    wp_enqueue_script('from-jump-to-menu-js');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Jump to Menu', self::$slug); }

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
        'default' => esc_html__( 'Label' , self::$slug ),
        'label_block' => true,
      ]
    );

    $repeater->add_control(
      'id', [
        'label' => esc_html__( 'ID', self::$slug ),
        'type' => \Elementor\Controls_Manager::TEXT,
        'default' => esc_html__( '' , self::$slug ),
        'label_block' => true,
      ]
    );

    $this->add_control(
      'items',
      [
        'label' => esc_html__( 'Items', self::$slug ),
        'type' => \Elementor\Controls_Manager::REPEATER,
        'fields' => $repeater->get_controls(),
        'title_field' => '{{{ title }}}',
      ]
    );

    $this->end_controls_section();

  
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $post_title = get_the_title(get_the_ID());

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-jump-to-menu from-jump-to-menu-container">
      <div class="from-jump-to-menu-inner">
        <div class="dropdown">
          <label> <?=$post_title;?> Overview </label>
          <a href="" class="caret" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-caret.svg';?>');"></a>
        </div>
        <div class="links-container collapsed">
          <div class="header">
            <div class="page-title"><?=$post_title;?> Overview</div>
            <a href="" class="close" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-close.svg';?>');"></a>
          </div>
          <div class="label-jump-to"> Jump to: </div>
          <ul class="links">
            <?php if($settings['items']):?>
              <?php foreach ($settings['items'] as $item): ?>
                <li class="from-jump-to-menu-item">
                  <a href="#" id="from-jump-to-<?=$item['id'];?>" title="<?= $item['title'];?>">
                    <label class="title"> <?= $item['title'];?> </label>
                  </a>
                </li>
              <?php endforeach;?>
            <?php endif; ?>
          </ul>
        </div>
      </div>
    </div>

  <?php }

} 