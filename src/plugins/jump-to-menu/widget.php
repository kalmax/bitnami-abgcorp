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

  protected function render() {

    $settings = $this->get_settings_for_display();
    $post_title = get_the_title(get_the_ID());

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <?php while ( have_posts() ) : the_post(); ?>
      <?php $sections = carbon_get_the_post_meta( 'crb_jump_to_sections' ); ?>


      <div class="from-jump-to-menu from-jump-to-menu-container">
        <div class="from-jump-to-menu-inner">
          <div class="dropdown">
            <label> <?=$post_title;?> Overview </label>
            <div class="controls">
              <a href="" class="caret" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-caret.svg';?>');"></a>
            </div>
          </div>
          <div class="links-container collapsed">
            <div class="header">
              <div class="page-title"><?=$post_title;?> Overview</div>
              <div class="controls">
                <a href="" class="close" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-close.svg';?>');"></a>
              </div>
            </div>
            <div class="label-jump-to"> Jump to: </div>
            <ul class="links">
              <?php if($sections):?>
                <?php foreach ($sections as $section): ?>
                  <li class="from-jump-to-menu-item">
                    <a href="#" id="from-jump-to-<?=$section['id'];?>" title="<?= $section['title'];?>">
                      <label class="title"> <?= $section['title'];?> </label>
                    </a>
                  </li>
                <?php endforeach;?>
              <?php endif; ?>
            </ul>
          </div>
        </div>
      </div>

    <?php endwhile; ?>


  <?php }

} 